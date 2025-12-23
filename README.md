## Strategic Machines

Basic app architecture for the Voice Agents platform

### Features Include
* Data driven AI architecture, where a set of tool descriptors retrieved from the db are used to direct the model for local or remote api calls
* Elegant interactions with the the LIVE Voice Agent, fully instructed through JSON Prompts on the scope, purpose and outcomes of a session
* Speciality tools for retrieving and querying website content, or celebrating a result, or finding and opening a web site
* Visual tool which provides the voice agent with capabilities to render forms, videos, images and documents based on the user request. These forms include a credit card payments for processing Stripe payments, and recording card data in a PCI DSS compliant manner (Payment Card Industry Data Security Standard) 

See the components/visuals/registry.tsx for the setup of a new component that can be rendered by the tool show_component 

* Tenant Custom tools providing the use case specific tools and functions required by the tenant for activating and enabling their Voice Agent. The Actions collection on Mongo (http descriptors) holds the http tool descriptors, which defines the api calls to the tenant's applications, such as a Booking Engine application (in the case of a tenant Hotel property), buying product (in case of a products company), scheduling appointments (in case of a professional services firm) or providing infomration about events. 

HTTP tool descriptors have declarative UI instructions.
Runtime behavior (from /api/tools/execute):
- Templating context is { args, response, status, secrets }.
- Strings in url/headers/body/ui are templated via `tpl()` (supports filters).
- Success = http.okField exists (truthy) in response OR HTTP 2xx when okField omitted.
- Then apply ui.onSuccess or ui.onError; payload is templated again with the same ctx.
- `pruneEmpty: true` strips "", null, {}, [] before sending.

✅ Authoring rules (critical):
1) Always reference caller params as {{args.your_field}} (not just {{your_field}}).
2) Coerce numbers/booleans in templates using filters, e.g. {{args.limit | number}}, {{args.include_rates | bool}}.
3) For currency, prefer {{args.currency | default('USD') | upper}}.
4) For nested JSON props, pass structured objects (not stringified), e.g. customer: "{{args.prefill | json}}".
5) Keep okField aligned with the API’s success shape (e.g., "ok" or "clientSecret").
6) If your API needs auth, use {{secrets.*}} in headers; the server will inject the secret.

#### Why this will “just work”

Numbers are numbers (| number) when they hit your APIs or UI props—no more "79000" surprises.

Objects are objects (| json)—no more "[object Object]".

Currency is normalized (| default('USD') | upper) everywhere.

Consistent {{args.*}} makes it obvious what’s coming from the model/tool call versus the API {{response.*}}.

The platform also can handle remote api calls to mongodb (retrieve Things collections via mongo gateway), and local nextjs api calls using the hooks/useTools set of tools - but this will be depracated in favor of api applications.

### Seeding Test Data
* Test data recorded and loaded from the agents/machines project
* Machine Seeds include the test data for HTTP descriptors (actions), Things (various objects), and Units (Villas available in the Cypress app. Note the Villas are retrieved through the booking_engine api, and are synced with the calendar and reservations collections for demo purposes.)

### Design Notes

Whats being demonstrated is that with a collection of https descriptors, and 2 gateways (one for mongo and the other for remote api calls), a complete data-driven AI Agent process can be constructed. 

The workflow involved ingesting the HTTP descriptors which are disaggregated and integrated with the Prompt as a set of tools. The descriptors provides required information for successfuly calling the api, as well as the expected range of reposonses. The Prompt provides the instructions on workflow, guardrails, and expected outcomes

The intent is to create a secure multitenant platform for companies to consume Voice and Text Agents providing an elegant and sophisticated range of interactions for products, reservations, sales, orders, appointments, and other common consumer activity, where the Web by itself is not sufficient by itself in engagement or resolution.

A 'human in the loop' capability will also be added

### A One Time Password (OTP) protection was added to track usage and limit rates

Note that google as a transporter requires a 16 character app password

Sign into gmail account and got to
https://myaccount.google.com/apppasswords

### RESEARCH
https://www.val.town/x/jubertioai/hello-realtime

425-800-0073

* example of agent orchestration
https://github.com/midday-ai/ai-sdk-tools/tree/main/apps/example

* using resend for email
https://github.com/resend/resend-nextjs-useactionstate-example
https://useworkflow.dev/

* essential utilities for using vercel ai sdk
https://github.com/midday-ai/ai-sdk-tools

* open source LLM registry for Vercel AI Gateway
https://github.com/FranciscoMoretti/ai-registry/
https://airegistry.app/

* CARTESIA
https://docs.cartesia.ai/get-started/overview

* ShadCN
https://ui.shadcn.com/docs/directory
https://billingsdk.com/

* resizable node
https://tiptap.dev/docs/editor/api/resizable-nodeviews

* URL PATTERN API
https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API

--------------------

1. Use a dedicated subdomain for the Voice Agent SaaS
Recommended:
👉 voice.strategicmachines.ai

This becomes:

Your hosted console
https://voice.strategicmachines.ai/

Your admin portal
https://voice.strategicmachines.ai/admin/*

Your public APIs used by widgets and clients
https://voice.strategicmachines.ai/api/*

This keeps the SaaS product separated from:

your marketing site (strategicmachines.ai)

your blog (blog.strategicmachines.ai)

any future properties (docs, status pages, etc.)

Why this is best practice:

✔ Clear boundary between product vs. marketing
✔ Enables independent scaling / security controls
✔ Lets you deploy the SaaS on Vercel or any infra
✔ Lets you use wildcard subdomains later (optional)
✔ Prevents your main domain from ever leaking internal SaaS cookies
product structure

3. Your tenant widgets should communicate with:
👉 https://voice.strategicmachines.ai/api/public/widget/bootstrap
👉 https://voice.strategicmachines.ai/api/voice/session
👉 https://voice.strategicmachines.ai/api/tools/execute

And the embed script should load from:

👉 https://voice.strategicmachines.ai/widget.js

or

👉 https://cdn.strategicmachines.ai/voice/widget.js (future CDN)

5. Correct domain structure for your whole ecosystem
Purpose	Domain/Subdomain	Notes
Marketing site	https://strategicmachines.ai	Public, SEO, your homepage
Blog	https://blog.strategicmachines.ai	Already exists, perfect
Voice Agent SaaS Platform	https://voice.strategicmachines.ai	Console, APIs, widget loader
Static assets / CDN (future)	https://cdn.strategicmachines.ai	JS bundles, images, voice player components
Status page (future)	https://status.strategicmachines.ai	Uptime, incidents

This structure is clean, scalable, and used by top SaaS companies.


### Security actions
1. Rate limiting that actually works. Don't just limit by IP address. Limit by user ID too. Why? One user can abuse your API from multiple devices. One IP can have multiple legitimate users. Combine both for real protection.

2. Input validation beyond format checking.Don't just check if email looks like an email. Check if the age makes business sense (13-120). Check if the role is actually allowed. Validate data against your business rules, not just data types.

3. Secure session management 30-minute session timeout (not 24 hours) HttpOnly cookies (JavaScript can't steal them). HTTPS only in production.
SameSite strict to prevent CSRF. Most breaches happen through stolen sessions.

4. API versioning for security. Keep old insecure endpoints alive while you migrate users. Add deprecation warnings to old versions. Force migration with incentives, not breaking changes. Sudden API changes = angry customers + security holes.

5.  Log security events, not just errors.Failed login attempts.
Unusual API usage patterns. Slow database queries. Multiple requests from same IP. Logs = your early warning system.

6.  Error handling that protects you. Production errors should be generic: "Internal server error." Development errors can be detailed. Never expose stack traces to users. Always log the real error internally.
Error messages leak sensitive information.

### Onboarding workflow
https://shadcnuikit.com/dashboard/pages/onboarding-flow

### AI SDK and LIVE
https://vercel.com/blog/ai-sdk-5

https://platform.openai.com/docs/guides/realtime

https://openai.github.io/openai-agents-js/guides/voice-agents/

### Validate UI Messages
https://ai-sdk.dev/docs/reference/ai-sdk-core/validate-ui-messages

 validates UI messages against schemas for metadata, data parts, and tools. It ensures type safety and data integrity for your message arrays before processing or rendering.

 ### AGENTS.md
 https://agents.md/

 ### system wide env
 https://dotenvx.com/docs/

 ### concept
 https://github.com/shadcn-ui/alpine-registry

 ### realtime blocks
https://openai-realtime-blocks.vercel.app/components/classic
https://openai-realtime-blocks.vercel.app/components/floaty
https://openai-realtime-blocks.vercel.app/components/siri

### voice app research
https://github.com/cameronking4/openai-realtime-api-nextjs
https://github.com/cameronking4/openai-realtime-blocks

### Analytics
https://openpanel.dev/

### TOOLS REGISTRY
https://ai-tools-registry.vercel.app/
https://github.com/xn1cklas/ai-tools-registry

### Tool Construction and Evaluation
https://www.anthropic.com/engineering/writing-tools-for-agents

### Prompt Optimization
https://github.com/current-ai-llc/dsts

### explore catchall segments for rapidly loading new chats
https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

app/[[...chatId]]/page.tsx

export default async function Overview(props: Props){
    const {chatId} = await props.params

    // extract first chat id
    const currentChatId = chatId?.at(0)
    const headersList = await headers()
    const geo = geolocation({ headers: headersList})

    // run a query against the db finding all messages for that chatId

    return (
      <HydrateClient>
        <Widgets />
        <ChatProvider id={currentChatId}, geo={geo}, messages={chat?.messages}>
            <ChatInterface />
        </ChatProvider>
      </HydrateClient>
    )
}

### Vercel Agent - code reviews
https://vercel.com/docs/agent/overview

### AI Accelerator
https://overclockaccelerator.com/

### Design Firm
https://tribedesignworks.com/

### CTX ZIP
https://github.com/karthikscale3/ctx-zip

### Knowledge Graphs - open source
https://github.com/topoteretes/cognee
https://www.cognee.ai/  ... memory engine 

### Agent Payments
https://github.com/projnanda/nanda-payments

### Bot Detection
https://vercel.com/botid

### Nextjs Auth Guide from Clerk
https://clerk.com/blog/how-to-add-authentication-to-a-nextjs-application

### Nextjs and Stripe
https://vercel.com/marketplace/stripe
https://github.com/stripe/ai


### Docs - includes integrating AI
https://leerob.com/docs

### JSON REPAIR
import {generateObject} from 'ai'
import {jsonrepair} from 'ai'

const {object} = await generateObject({
  model,
  schema,
  prompt,
  experimental_repairText: async ({text, error}) => {
    return jsonrepair(text)
  }
})

### Static IPs on Vercel - Security
https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity

### Less Expensive REALTIME Model
https://platform.openai.com/docs/models/gpt-realtime-mini

### SHADCN-UI
https://github.com/shadcn-ui/ui

### Eleven Labs audio components
https://ui.elevenlabs.io/

### Native chatgpt app
https://vercel.com/blog/running-next-js-inside-chatgpt-a-deep-dive-into-native-app-integration

### MONGO NEXTJS TEMPLATE
https://github.com/mongodb-developer/nextjs-news-template-mongodb

### UnCommon Components
https://skiper-ui.com/

### Microsoft Call Center
Send a phone call from AI agent, in an API call. Or, directly call the bot from the configured phone number!
https://github.com/microsoft/call-center-ai

### FILE SQL (another tool descriptor?)
https://github.com/nao1215/filesql

==================platform architecture ======
/(web)/page.tsx - main demo dashboard for cypress resorts -- whoing the power of a voice agent interacting with a user to find, select, and reserve a unit for some date

/widget/page.tsx - commercial route for clients to render a voice agent on their website and perform magic

Every Business Needs a Voice

======

so we use a dual auth process in guarding the most expensive route which is
api/session .... either the user is logged in using the (web) route for 
the demo. Or the /widget route is being by a customer of our tenant

Inside of middleware and api/session we enforce
Rate-limits per IP for everyone (console + widget).
Rate-limits per user only when emailFromJwtCookie finds an email.
For widget flows → no tenant_session cookie, so email is null.

That means no per-user limiter is applied for widget visitors (only IP). We conduct per-identity concurrency inside /api/session, and you can later add a per-tenant limiter if needed.

So nothing breaks:

(Web) sessions: IP + user limit at the edge, plus concurrency & quota in /api/session.

Widget sessions: IP limit at the edge, plus concurrency (per tenant) in /api/session.

=====================

### AI GATEWAY
https://github.com/Portkey-AI/gateway
https://portkey.ai/features/ai-gateway

### SHADCN Calendar
https://github.com/ln-dev7/square-ui
https://square.lndev.me/
https://square-ui-calendar.vercel.app/

### vercel for platforms
https://vercel.com/changelog/introducing-platform-elements

As part of the new Vercel for Platforms product, you can now use a set of prebuilt UI blocks and actions to add functionality directly to your application.

An all-new library of production-ready shadcn/ui components and actions help you launch (and upgrade) quickly.

https://vercel.com/platforms/docs/platform-elements/blocks/report-abuse

### compeitition in voice
https://www.osmosian.tech/

### NOTEBOOKLLM
https://notebooklm.google/

vibe voice tts
https://huggingface.co/spaces/anycoderapps/VibeVoice-Realtime-0.5B

### ERD SCHEMA EDITOR
https://erd-editor.io/
https://github.com/dineug/erd-editor/

### Visualize documents - knowledge graphs
https://github.com/ChristopherLyon/graphrag-workbench/
https://graphrag-workbench-web.vercel.app/

### Shadcn dashboard and templates
https://github.com/ln-dev7/square-ui/tree/master/templates
https://square-ui-dashboard-2.vercel.app/

### GEMINI
https://github.com/google-gemini/live-api-web-console

### verify accts and numbers
https://apexverify.com/

### Lucide animated icons
https://lucide-animated.com/

### share .nev files with devs
https://dotenvx.com/
https://1password.com/blog/1password-environments-env-files-public-beta


```js
// AI SDK 6: Agent with OpenAI websearch tool

const openaiWebSearchAgent = new ToolLoopAgent({
  model: openai("gpt-5"),
  tools: {
    webSearch: openai.tools.webSearch({
      searchContextSize: "low",
      userLocation: {
        type: "approximate",
        city: "San Francisco",
        region: "California",
        country: "US",
      },
    }),
  },
});

```

### create study materials
https://github.com/CaviraOSS/PageLM/

### configuring your agent
https://agents.md/
https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering


### investigate
polyai - including channel partners
