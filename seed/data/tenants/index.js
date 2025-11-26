// seed/tenants.mock.ts


export const tenantProfiles = [
  {
    tenantId: "machine",
    name: "Strategic Machines",
    status: "active",
    identity: {
      legalName: "Strategic Machines, Inc",
      displayName: "Strategic Machines",
      domain: "strategicmachines.ai",
      industry: "ai",
      timeZone: "America/Chicago",
      locale: "en-US",
    },
    contacts: {
      primary: {
        name: "Patrick Howard",
        email: "strategicmachines@gmail.com",
        phone: "+1-915-500-5391",
        role: "Founder",
      },
      billing: {
        name: "Accounts Payable",
        email: "strategicmachines@gmail.com",
      },
      technical: {
        name: "Technical Support",
        email: "strategicmachines@gmail.com",
      },
    },
    billing: {
      provider: "stripe",
      customerId: "cus_acme_001",
      defaultPaymentMethodId: "pm_acme_visa_4242",
      currency: "USD",
      billingEmail: "strategicmachines@gmail.com",
      taxId: "US123456789",
      billingAddress: {
        line1: "361 Two Creeks LN",
        line2: "",
        city: "Austin",
        state: "TX",
        postalCode: "78737",
        country: "US",
      },
      plan: {
        planId: "voice-pro",
        name: "Voice Agent Pro",
        interval: "month",
        seatLimit: 10,
        agentLimit: 20,
        trialEndsAt: new Date("2025-12-31T00:00:00.000Z"),
      },
      cardSnapshot: {
        brand: "visa",
        last4: "4242",
        expMonth: 10,
        expYear: 2030,
      },
      status: "active",
      nextBillingDate: new Date("2025-12-01T00:00:00.000Z"),
    },
    config: {
      datastores: [
        {
          type: "mongo",
          connectionUri: "",
          databaseName: "",
          collectionName: "",
          searchDefaults: {
            maxResults: 20,
            minScore: 0.5,
          },
          auth: {
            userId: "",
            password: "",
          },
        },
      ],
      APIs: [
        {
          name: "product_search",
          description: "Search Acme product catalog",
          uri: "https://api.voice-platform.com/tenants/acme-123/products/search",
          key: "ENCRYPTED_API_KEY_ACME_PRODUCT_SEARCH",
        },
        {
          name: "brand_info",
          description: "Fetch Acme brand information",
          uri: "https://api.voice-platform.com/tenants/acme-123/brand-info",
          key: "ENCRYPTED_API_KEY_ACME_BRAND_INFO",
        },
      ],
      voiceAgent: {
        agentId: "674000000000000000000001", // example ObjectId as string
        defaultLanguage: "en-US",
        defaultVoice: "friendly_female",
        maxConversationMinutes: 30,
        fallbackBehavior: "handoff_to_human",
      },
    },
    agentSettings: {
      defaultAgentId: "product_matcher_v1",
      allowedTools: ["product_search", "brand_info"],
      maxParallelSessions: 25,
      persona: {
        tone: "friendly_expert",
        greeting: "Hi, I’m your Acme product guide. What are you looking for today?",
        closing: "Thanks for shopping with Acme!",
      },
    },
    limits: {
      maxAgents: 20,
      maxConcurrentCalls: 50,
      maxMonthlyMinutes: 10000,
      maxRequestsPerMinute: 120,
    },
    flags: {
      betaFeatures: true,
      allowExternalBrandInfo: true,
      allowExperimentalModels: false,
    },
    widgetKeys: [
      {
        id: "machine_site",
        key: "w_acme_main_7f1b0e9c64f54d1a",
        origin: "https://strategicmachines.ai",
        label: "Main marketing site",
        revoked: false
      }
    ],

    createdAt: new Date("2025-11-10T00:00:00.000Z"),
    updatedAt: new Date("2025-11-13T00:00:00.000Z"),
  },

  {
    tenantId: "cypress-resorts",
    name: "Cypress Resorts",
    status: "trial",
    identity: {
      legalName: "Cypress Resorts Inc",
      displayName: "Cypress Resorts",
      domain: "cypressresort.com",
      industry: "hospitality",
      timeZone: "America/Atlanta",
      locale: "en-US",
    },
    contacts: {
      primary: {
        name: "Tanner Cummings",
        email: "tanner@cypressresort.com",
        phone: "+1-540-383-8282",
        role: "Founder",
      },
      billing: {
        name: "Finance",
        email: "finance@cypressresort.com",
      },
      technical: {
        name: "CTO",
        email: "cto@cypressresort.com",
      },
    },
    billing: {
      provider: "Stripe",
      customerId: "cypress-resort",
      defaultPaymentMethodId: "cypress_master_1111",
      currency: "USD",
      billingEmail: "finance@cypressresort.com",
      billingAddress: {
        line1: "1773 Hwy 53 East",
        line2: "",
        city: "Jasper",
        state: "GA",
        postalCode: "30143",
        country: "USA",
      },
      plan: {
        planId: "voice-starter",
        name: "Voice Agent Starter",
        interval: "month",
        seatLimit: 3,
        agentLimit: 5,
        trialEndsAt: new Date("2026-01-15T00:00:00.000Z"),
      },
      cardSnapshot: {
        brand: "mastercard",
        last4: "1111",
        expMonth: 5,
        expYear: 2028,
      },
      status: "trialing",
      nextBillingDate: new Date("2026-01-16T00:00:00.000Z"),
    },
    config: {
      datastores: [        
      ],
      APIs: [       
      ],
      voiceAgent: {
        agentId: "674000000000000000000002",
        defaultLanguage: "en-US",
        defaultVoice: "cheerful_neutral",
        maxConversationMinutes: 20,
        fallbackBehavior: "apologize_and_end",
      },
    },
    agentSettings: {
       defaultAgentId: "shoe_matcher_v1",
        agentRepo: {
          provider: "github",
          baseRawUrl: "https://raw.githubusercontent.com/pdhoward/documentation/main/AGENT_CYPRESSRESORTS"
        },
      persona: {
        tone: "upbeat_helper",
        greeting:
          "Hey! Welcome to Cypress Resorts. How can I help upi",
        closing: "Thank you.",
      },
    },
    limits: {
      maxAgents: 5,
      maxConcurrentCalls: 15,
      maxMonthlyMinutes: 2000,
      maxRequestsPerMinute: 60,
    },
    flags: {
      betaFeatures: false,
      allowExternalBrandInfo: true,
      allowExperimentalModels: false,
    },
    widgetKeys: [
      {
        id: "cypress-resorts",
        key: "w_cypress_main_7f1b0e9c64f54d1a",
        origin: "https://www.cypressresort.com",
        label: "Main marketing site",
        revoked: false
      }
    ],

    createdAt: new Date("2025-11-11T00:00:00.000Z"),
    updatedAt: new Date("2025-11-13T00:00:00.000Z"),
  },
];
