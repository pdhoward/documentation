// actions.ts
// HTTP tool descriptors with declarative UI instructions.
// Runtime behavior (from /api/tools/execute):
//  - Templating context is { args, response, status, secrets }.
//  - Strings in url/headers/body/ui are templated via `tpl()` (supports filters).
//  - Success = http.okField exists (truthy) in response OR HTTP 2xx when okField omitted.
//  - Then apply ui.onSuccess or ui.onError; payload is templated again with the same ctx.
//  - `pruneEmpty: true` strips "", null, {}, [] before sending.
//
// ✅ Authoring rules (critical):
//  1) Always reference caller params as {{args.your_field}} (not just {{your_field}}).
//  2) Coerce numbers/booleans in templates using filters, e.g. {{args.limit | number}}, {{args.include_rates | bool}}.
//  3) For currency, prefer {{args.currency | default('USD') | upper}}.
//  4) For nested JSON props, pass structured objects (not stringified), e.g. customer: "{{args.prefill | json}}".
//  5) Keep okField aligned with the API’s success shape (e.g., "ok" or "clientSecret").
//  6) If your API needs auth, use {{secrets.*}} in headers; the server will inject the secret.
export const actions = [
  /* ──────────────────────────────────────────────────────────────────────────
   * 1) Check availability → show room view (optionally with media)
   *    API: { ok: boolean, gallery?: string[] }
   * ────────────────────────────────────────────────────────────────────────── */
  {
    tenantId: "cypress-resorts",
    kind: "http_tool",
    name: "booking_check_availability",
    description: "Check if a unit is available between dates.",
    parameters: {
      type: "object",
      required: ["tenant_id", "unit_id", "check_in", "check_out"],
      properties: {
        tenant_id: { type: "string" },
        unit_id: { type: "string" },
        check_in: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        check_out: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" }
      },
      additionalProperties: false
    },
    http: {
      method: "GET",
      urlTemplate:
        "https://cypressbooking.vercel.app/api/booking/{{args.tenant_id}}/availability?unit_id={{args.unit_id}}&check_in={{args.check_in}}&check_out={{args.check_out}}",
      headers: {
        authorization: "Bearer {{secrets.booking_api_key}}"
      },
      okField: "ok",
      timeoutMs: 10000
    },
    ui: {
      onSuccess: {
        emit_say:
          "Good news!" +
          "Your villa is available for {{args.check_in}} → {{args.check_out}}."
      },
      onError: {
        emit_say:
          "That room isn’t available from {{args.check_in}} to {{args.check_out}}. " +
          "Would you like to try different dates or another villa?"
      }
    },
    enabled: true,
    priority: 10,
    version: 4
  },

  /* ──────────────────────────────────────────────────────────────────────────
   * 2) Get quote → open a lightweight quote summary
   *    API: { ok, nightly_rate, nights, total, currency, policy }
   * ────────────────────────────────────────────────────────────────────────── */
  {
    tenantId: "cypress-resorts",
    kind: "http_tool",
    name: "booking_get_quote",
    description: "Get nightly rate, nights, total, and policy for a unit/date window.",
    parameters: {
      type: "object",
      required: ["tenant_id", "unit_id", "check_in", "check_out"],
      properties: {
        tenant_id: { type: "string" },
        unit_id: { type: "string" },
        check_in: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        check_out: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" }
      },
      additionalProperties: false
    },
    http: {
      method: "GET",
      urlTemplate:
        "https://cypressbooking.vercel.app/api/booking/{{args.tenant_id}}/quote?unit_id={{args.unit_id}}&check_in={{args.check_in}}&check_out={{args.check_out}}",
      headers: {
        authorization: "Bearer {{secrets.booking_api_key}}"
      },
      okField: "ok",
      timeoutMs: 10000
    },
    ui: {
      onSuccess: {
        emit_show_component: {
          component_name: "quote_summary",
          title: "Quote for {{args.unit_id}}",          
          description: "Nightly: {{response.quote.nightly}} · Nights: {{response.quote.nights}} · Total: {{response.quote.total}} {{response.quote.currency}}.\nPolicy: Cancel up to {{response.quote.policy.cancelHours}}h · Fee {{response.quote.policy.cancelFee}}.",
          size: "md",
           props: {
            quote: {
                unit: "{{response.unit.name}}",
                check_in: "{{response.quote.window.check_in}}",
                check_out: "{{response.quote.window.check_out}}",
                nightly_rate: "{{response.quote.nightly}}",
                nights: "{{response.quote.nights}}",
                total: "{{response.quote.total}}",
                currency: "{{response.quote.currency}}",
                policy: "Cancel up to {{response.quote.policy.cancelHours}}h · Fee {{response.quote.policy.cancelFee}}"
              }     
            },
          meta: { replace: true }
        }
      },
      onError: {
        emit_say:
          "I couldn’t retrieve a quote for those dates. " +
          "Please adjust the dates or the villa, and I’ll try again."
      }
    },
    enabled: true,
    priority: 9,
    version: 4
  },
/* ──────────────────────────────────────────────────────────────────────────
 * 3) booking_checkout_init → 
 *     1 tool / 1 component: The tool only creates the HOLD and opens the component. 
 *    The component handles PaymentIntent, Stripe confirmation, and promotion to confirmed.
 *    Security: Card data stays in Stripe Elements. 
 *    The clientSecret is fetched by the component from your server (/payments/create-intent). 
 *    Voice agent notifications: the component uses window.vox?.say(...)  
 *    States (aligned with typical flows):
        - initializing → ready_for_payment → confirming_payment → confirming_reservation → confirmed
        - Error branches: payment_failed, expired_hold, error.
 * ────────────────────────────────────────────────────────────────────────── */
// actions/booking_checkout_init.ts
{
  tenantId: 'cypress-resorts',
  kind: 'http_tool',
  name: 'booking_checkout_init',
  description:
    'Initialize a reservation checkout: create a reservation and open the unified checkout component.',

  parameters: {
    type: 'object',
    required: ['tenant_id', 'unit_id', 'check_in', 'check_out', 'guest'],
    properties: {
      tenant_id: { type: 'string' },

      unit_id: {
        type: 'string',
        description: "Public unit key (e.g., 'unit-villa-2').",
      },

      check_in: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      },

      check_out: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      },

      guest: {
        type: 'object',
        required: ['first_name', 'last_name', 'email', 'phone'],
        properties: {
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },

          address: {
            type: 'object',
            properties: {
              line1: { type: 'string' },
              line2: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              postalCode: { type: 'string' },
              country: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: true,
      },
    },
    additionalProperties: false,
  },

  http: {
    method: 'POST',
    urlTemplate: 'https://cypressbooking.vercel.app/api/booking/{{args.tenant_id}}/reserve',

    headers: {
      authorization: 'Bearer {{secrets.booking_api_key}}',
      'content-type': 'application/json',
    },

    jsonBodyTemplate: {
      unit_id: '{{args.unit_id}}',
      check_in: '{{args.check_in}}',
      check_out: '{{args.check_out}}',
      pending_payment: true,

      guest: {
        first_name: '{{args.guest.first_name}}',
        last_name: '{{args.guest.last_name}}',
        email: '{{args.guest.email}}',
        phone: '{{args.guest.phone}}',

        address: {
          line1: '{{args.guest.address.line1}}',
          line2: '{{args.guest.address.line2}}',
          city: '{{args.guest.address.city}}',
          state: '{{args.guest.address.state}}',
          postalCode: '{{args.guest.address.postalCode}}',
          country: '{{args.guest.address.country}}',
        },
      },
    },

    okField: 'ok',
    timeoutMs: 12000,
    pruneEmpty: true,
  },

  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: 'reservation_checkout',
        title: 'Review & confirm your reservation',
        description: 'Please review your details and complete payment to confirm.',
        size: 'md',

        props: {
          tenant_id: '{{args.tenant_id}}',
          reservation_id: '{{response.reservation.id}}',
          unit_id: '{{response.reservation.unit.id}}',
          unit_name: '{{response.reservation.unit.name}}',

          check_in: '{{response.reservation.window.check_in}}',
          check_out: '{{response.reservation.window.check_out}}',

          nightly_rate: '{{response.reservation.commercial.nightly}}',
          currency: "{{response.reservation.commercial.currency | default('USD')}}",

          guest: {
            first_name: '{{args.guest.first_name}}',
            last_name: '{{args.guest.last_name}}',
            email: '{{args.guest.email}}',
            phone: '{{args.guest.phone}}',
          },

          policy_cancel_hours: '{{response.reservation.policy.cancelHours}}',
          policy_cancel_fee: '{{response.reservation.policy.cancelFee}}',
          policy_currency: "{{response.reservation.policy.currency | default('USD')}}",

          payment_intent_strategy: 'component_fetches',
        },

        meta: { replace: true },
      },
    },

    onError: {
      emit_say:
        "I couldn’t start the checkout with those details. Please confirm the guest information and dates, or choose a different villa, and I’ll try again.",
    },
  },

  enabled: true,
  priority: 8,
  version: 2,
},

  /* ──────────────────────────────────────────────────────────────────────────
   * 4) Data API for the collection "amenities"
   * ────────────────────────────────────────────────────────────────────────── */
  {
    tenantId: "cypress-resorts",
    kind: "http_tool",
    name: "amenities_gateway",
    description: "Browse catalog of amenities and activities that are available such as spas, private chefs, or site plan for hiking and more.",
    parameters: {
      type: "object",
      required: ["tenant_id"],
      properties: {
        tenant_id: { type: "string" },
        type: { type: "string" },
        q: { type: "string" },
        limit: { type: "number", minimum: 1, maximum: 500, default: 100 },
        searchable: { type: "boolean" }
      },
      additionalProperties: false
    },
    http: {
      method: "POST",
      urlTemplate: "https://cypressbooking.vercel.app/api/search/mongo",
      headers: { "content-type": "application/json" },
      jsonBodyTemplate: {
        op: "find",
        tenantId: "{{args.tenant_id}}",
        db: { collection: "things" },
        filter: {
          tenantId: "{{args.tenant_id}}",
          status: "active",
          type: "{{args.type}}",
          searchable: "{{args.searchable}}",
          $or: [
            { name: { $regex: "{{args.q}}", $options: "i" } },
            { title: { $regex: "{{args.q}}", $options: "i" } },
            { description: { $regex: "{{args.q}}", $options: "i" } },
            { tags: { $in: ["{{args.q}}"] } },
            { slug: { $regex: "{{args.q}}", $options: "i" } }
          ]
        },
        projection: { _id: 0 },
        sort: { updatedAt: -1 },
        limit: "{{args.limit}}"
      },
      timeoutMs: 8000,
      pruneEmpty: true
    },
    ui: {
      onSuccess: {
        emit_show_component: {
          component_name: "catalog_results",
          title: "Results",
          description: "Showing information, videos, or images on amentities and activities.",
          size: "lg",
          props: { items: "{{response}}" },
          meta: { replace: true }
        }
      },
      onError: {
        emit_say:
          "I couldn’t load those items just now. " +
          "Please adjust your search or try again in a moment."
      }
    },
    enabled: true,
    priority: 7,
    version: 4
  },

  /* ──────────────────────────────────────────────────────────────────────────
   * 5) List Rooms → return the tenant’s rooms (summaries)
   *    API: { ok: true, items: [...], count: N }
   * ────────────────────────────────────────────────────────────────────────── */
  {
    tenantId: 'cypress-resorts',
    kind: 'http_tool',
    name: 'booking_list_units',
    description: 'List rooms for a tenant (name, description, amenities, media…).',

    parameters: {
      type: 'object',
      required: ['tenant_id'],
      properties: {
        tenant_id: { type: 'string' },

        q: {
          type: 'string',
          description: 'Search across name/description/slug/tags',
        },

        limit: {
          type: 'number',
          minimum: 1,
          maximum: 100,
          default: 12,
        },

        include_rates: {
          type: 'boolean',
          description: 'If true, include rate and currency in results',
        },

        include_media: {
          type: 'boolean',
          description: 'If true, include media in results',
        },
      },
      additionalProperties: false,
    },

    http: {
      method: 'GET',
      urlTemplate:
        'https://cypressbooking.vercel.app/api/booking/{{args.tenant_id}}/rooms' +
        '?q={{args.q}}' +
        '&limit={{args.limit}}' +
        '&includeRates={{args.include_rates}}' +
        '&includeMedia={{args.include_media}}',

      headers: {
        authorization: 'Bearer {{secrets.booking_api_key}}',
      },

      okField: 'ok',
      timeoutMs: 8000,
      pruneEmpty: true,
    },

    ui: {
      onSuccess: {
        emit_show_component: {
          component_name: 'room',
          props: {
            items: '{{response.items}}',
            dates: {
              check_in: '{{args.check_in}}',
              check_out: '{{args.check_out}}',
            },
            highlight: '{{args.q}}',
          },
        },
      },

      onError: {
        emit_say:
          'I couldn’t load the room list right now. ' +
          'Please try again, or tell me what you’re looking for and I’ll refine the search.',
      },
    },

    enabled: true,
    priority: 11,
    version: 4,
  },
  // tools/productcoHttpTools.ts

{  
  tenantId: "productco",
  kind: "http_tool",
  name: "products_search",
  description:
    "Search the product catalog with filters such as query text, color, category, price range, and specifications.",
  parameters: {
    type: "object",
    required: ["tenantId"],
    properties: {
      tenantId: {
        type: "string",
        description: "Tenant identifier. For this tool, always use 'productco'.",
      },
      query: {
        type: "string",
        description:
          "Free-text search across product name, description, overview, brand, and specifications.",
      },
      color: {
        type: "string",
        description:
          "Color or color family to filter by, e.g. 'orange' or 'white'.",
      },
      brand: {
        type: "string",
        description: "Brand name to filter by, e.g. 'BEHR'.",
      },
      category: {
        type: "string",
        description: "Product category, e.g. 'Paint', 'Ladders', 'Hammers'.",
      },
      inStock: {
        type: "boolean",
        description: "If true, only return products that are in stock.",
      },
      minPrice: {
        type: "number",
        description: "Minimum price in USD to include.",
      },
      maxPrice: {
        type: "number",
        description: "Maximum price in USD to include.",
      },
      minRating: {
        type: "number",
        minimum: 0,
        maximum: 5,
        description: "Minimum average rating (0–5).",
      },
      specs: {
        type: "object",
        description:
          "Optional specifications to match inside the serialized 'specifications' field. Keys are spec names (e.g. 'Sheen'), values are strings.",
        additionalProperties: { type: "string" },
      },
      sort_field: {
        type: "string",
        enum: ["price", "avg_rating", "crawled_at", "name"],
        description: "Field to sort by.",
      },
      sort_direction: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Sort direction.",
      },
      page: {
        type: "integer",
        minimum: 1,
        default: 1,
      },
      pageSize: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 20,
      },
      summaryOnly: {
        type: "boolean",
        description:
          "If true, the API may return a summarized view (e.g. counts and price ranges) instead of the full list.",
      },
    },
    additionalProperties: false,
  },
  http: {
    method: "POST",
    urlTemplate:
      "https://product-engine.vercel.app/api/products/search",
    headers: {
      "Content-Type": "application/json",
    },
   jsonBodyTemplate: {
      tenantId: "{{args.tenantId}}",
      query: "{{args.query}}",
      color: "{{args.color}}",
      brand: "{{args.brand}}",
      category: "{{args.category}}",
      inStock: "{{args.inStock | bool}}",
      minPrice: "{{args.minPrice | number}}",
      maxPrice: "{{args.maxPrice | number}}",
      minRating: "{{args.minRating | number}}",
      specs: "{{args.specs}}",
      sort_field: "{{args.sort_field}}",
      sort_direction: "{{args.sort_direction}}",
      page: "{{args.page | number}}",
      pageSize: "{{args.pageSize | number}}",
      summaryOnly: "{{args.summaryOnly | bool}}"
    },
    okField: "ok",
    timeoutMs: 10000,
    pruneEmpty: true,
  },
  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: "product_list",
        props: {
          items: "{{response.results}}",
          total: "{{response.total | number}}",
          page: "{{response.page | number}}",
          pageSize: "{{response.pageSize | number}}",
          query: "{{args.query}}",
          filters: {
            color: "{{args.color}}",
            brand: "{{args.brand}}",
            category: "{{args.category}}",
            minPrice: "{{args.minPrice | number}}",
            maxPrice: "{{args.maxPrice | number}}",
            minRating: "{{args.minRating | number}}",
            inStock: "{{args.inStock | bool}}",
          },
        },
      },
    },
    onError: {
      emit_say:
        "I couldn’t find any products that match your request. You can try a different color, brand, category, or price range.",
    },
  },
  enabled: true,
  priority: 10,
  version: 1,
},
{
 
  tenantId: "productco",
  kind: "http_tool",
  name: "products_stats",
  description:
    "Compute statistics over products, such as counts and price ranges for categories like ladders, hammers, or paints.",
  parameters: {
    type: "object",
    required: ["tenantId"],
    properties: {
      tenantId: {
        type: "string",
        description: "Tenant identifier. For this tool, always use 'productco'.",
      },
      search: {
        type: "string",
        description:
          "Keyword to match in name, description, or overview, e.g. 'hammer', 'ladder'.",
      },
      category: {
        type: "string",
        description:
          "Category to match inside breadcrumbs, e.g. 'Ladders', 'Paint'.",
      },
      brand: {
        type: "string",
        description: "Brand name filter, e.g. 'BEHR', 'DeWalt'.",
      },
      specKey: {
        type: "string",
        description:
          "Name of a specification field to match inside the 'specifications' string, e.g. 'Sheen'.",
      },
      specValue: {
        type: "string",
        description:
          "Value to match for the given specKey, e.g. 'Satin'.",
      },
      groupBy: {
        type: "string",
        enum: ["none", "brand", "category", "color"],
        default: "none",
        description:
          "How to group results: none, by brand, by category (breadcrumbs), or by color.",
      },
    },
    additionalProperties: false,
  },
  http: {
    method: "POST",
    urlTemplate:
      "https://product-engine.vercel.app/api/products/stats",
    headers: {
      "Content-Type": "application/json",
    },
    jsonBodyTemplate: {
      tenantId: "{{args.tenantId}}",
      search: "{{args.search}}",
      category: "{{args.category}}",
      brand: "{{args.brand}}",
      specKey: "{{args.specKey}}",
      specValue: "{{args.specValue}}",
      groupBy: "{{args.groupBy}}"
    },
    okField: "ok",
    timeoutMs: 10000,
    pruneEmpty: true,
  },
  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: "product_stats",
        props: {
          results: "{{response.results}}",
          search: "{{args.search}}",
          category: "{{args.category}}",
          brand: "{{args.brand}}",
          groupBy: "{{args.groupBy}}",
        },
      },
    },
    onError: {
      emit_say:
        "I couldn’t load product statistics right now. Please try again, or narrow your question to a specific category or tool type.",
    },
  },
  enabled: true,
  priority: 9,
  version: 1,
},

{ 
  tenantId: "productco",
  kind: "http_tool",
  name: "tradeshows_coming_soon",
  description:
    "List upcoming tradeshows hosted by the product company, including names, locations, and dates.",
  parameters: {
    type: "object",
    required: [],
    properties: {},
    additionalProperties: false,
  },
  http: {
    method: "GET",
    urlTemplate:
      "https://product-engine.vercel.app/api/tradeshows/coming-soon",
    headers: {},
    okField: "ok",
    timeoutMs: 8000,
    pruneEmpty: true,
  },
  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: "tradeshow_list",
        props: {
          events: "{{response.events}}",
        },
      },
    },
    onError: {
      emit_say:
        "I couldn’t load the list of upcoming tradeshows. Please try again in a moment.",
    },
  },
  enabled: true,
  priority: 8,
  version: 1,
},
{ 
  tenantId: "productco",
  kind: "http_tool",
  name: "tradeshows_section",
  description:
    "Retrieve a specific information section (overview, booths, parking, tickets, hours, purchase) for a given tradeshow.",
  parameters: {
    type: "object",
    required: ["id", "section"],
    properties: {
      id: {
        type: "string",
        description:
          "Tradeshow identifier, e.g. 'spring-pro-paint-2026'.",
      },
      section: {
        type: "string",
        enum: ["overview", "booths", "parking", "tickets", "hours", "purchase"],
        description:
          "Which section of the tradeshow information to retrieve.",
      },
    },
    additionalProperties: false,
  },
  http: {
    method: "GET",
    urlTemplate:
      "https://product-engine.vercel.app/api/tradeshows/{{args.id}}/{{args.section}}",
    headers: {},
    okField: "ok",
    timeoutMs: 8000,
    pruneEmpty: true,
  },
  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: "tradeshow_section",
        props: {
          showId: "{{response.id}}",
          name: "{{response.name}}",
          section: "{{response.section}}",
          content: "{{response.content}}",
        },
      },
    },
    onError: {
      emit_say:
        "I couldn’t load that part of the tradeshow information. Try asking about the overview, booths, parking, tickets, hours, or how to purchase tickets.",
    },
  },
  enabled: true,
  priority: 8,
  version: 1,
},
{
  kind: "http_tool",
  tenantId: "machine",
  name: "list_machine_agents",
  description:
    "List all Strategic Machines voice agents, including pricing, skills, availability, and demo links.",
  parameters: {
    type: "object",
    required: ["tenant_id"],
    properties: {
      tenant_id: {
        type: "string",
        description:
          "tenant identifier for logging or future routing.",
      },
    },
    additionalProperties: false,
  },
  http: {
    method: "GET",
    urlTemplate: "https://product-engine.vercel.app/api/agents/list",
    headers: {
      "content-type": "application/json",
    },
    timeoutMs: 8000,
    pruneEmpty: false,
  },
  ui: {
    onSuccess: {
      emit_show_component: {
        component_name: "catalog_results",
        title: "Available Strategic Machines Agents",
        description: "Browse agents, their skills, pricing, and demos.",
        size: "lg",
        props: {
          items: "{{response}}",
        },
        meta: {
          replace: true,
        },
      },
    },
    onError: {
      emit_say:
        "I couldn’t load the agent gallery just now. Please try again in a moment.",
    },
  },
  enabled: true,
  priority: 5,
  version: 2,
},
{ 
  tenantId: "cypress-resorts",
  kind: "http_tool",
  name: "chef_search_recipes",
  description: "Search for elegant, healthy recipes based on query.",
  parameters: {
    type: "object",
    required: ["tenant_id","query"],
    properties: {
      tenant_id: { type: "string" },
      query: { type: "string" },
      cuisine: { type: "string" },
      diet: { type: "string" },
      intolerances: { type: "string" }
    },
    additionalProperties: false
  },
  http: {
    method: "GET",
    urlTemplate:
      "https://api.spoonacular.com/recipes/complexSearch?apiKey={{secrets.spoonacular_api_key}}&query={{args.query}}&cuisine={{args.cuisine}}&diet={{args.diet}}&intolerances={{args.intolerances}}&number=3&addRecipeInformation=true",
    headers: {},
    okField: "results",
    timeoutMs: 10000
  },
  ui: {
    onSuccess: {
      emit_say: "Here are some elegant recipe suggestions based on your preferences."
    },
    onError: {
      emit_say: "Couldn't find suitable recipes. Let's try different options?"
    }
  },
  enabled: true,
  priority: 10,
  version: 1
},
{ 
  tenantId: "cypress-resorts",
  kind: "http_tool",
  name: "chef_suggest_wine",
  description: "Suggest wine pairings for a food, with prices.",
  parameters: {
    type: "object",
    required: ["tenant_id", "food"],
    properties: {
      tenant_id: { type: "string" },
      food: {type: "string" },
      maxPrice: { type: "number" }
    },
    additionalProperties: false
  },
  http: {
    method: "GET",
    urlTemplate:
      "https://api.spoonacular.com/food/wine/pairing?apiKey={{secrets.spoonacular_api_key}}&food={{args.food}}",
    headers: {},
    okField: "pairings",
    timeoutMs: 10000
  },
  ui: {
    onSuccess: {
      emit_say: "Excellent wine suggestions to complement your meal."
    },
    onError: {
      emit_say: "No wine pairings found. Perhaps another dish?"
    }
  },
  enabled: true,
  priority: 10,
  version: 1
},
{ 
  tenantId: "cypress-resorts",
  kind: "http_tool",
  name: "chef_suggest_music",
  description: "Suggest music tracks based on genre or mood.",
  parameters: {
    type: "object",
    required: ["tenant_id", "genre"],
    properties: {
      tenant_id: { type: "string" },
      genre: { type: "string" },
      mood: { type: "string" }
    },
    additionalProperties: false
  },
  http: {
    method: "GET",
    urlTemplate:
      "https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag={{args.genre}}&api_key={{secrets.lastfm_api_key}}&format=json&limit=5",
    headers: {},
    okField: "tracks",
    timeoutMs: 10000
  },
  ui: {
    onSuccess: {
      emit_say: "Some musical ambiance to enhance your dining experience."
    },
    onError: {
      emit_say: "Couldn't find music suggestions. Try a different genre?"
    }
  },
  enabled: true,
  priority: 10,
  version: 1
}

];
