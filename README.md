## Strategic Machines Voice Machine

### Every Business Needs a Voice<sup>SM</sup>


The commercial-grade voice machine platform serving companies worldwide

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

Marketing site	

https://strategicmachines.ai	

Public, SEO, your homepage

Blog	

https://blog.strategicmachines.ai	

Voice Agent SaaS Platform	

https://voice.strategicmachines.ai	

Console, APIs, widget loader

Static assets / CDN (future)	

https://cdn.strategicmachines.ai	

JS bundles, images, voice player components

Status page (future)	

https://status.strategicmachines.ai	

Uptime, incidents

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

### competition in voice
https://www.osmosian.tech/

create voices

https://app.resemble.ai/

api

https://models.hathora.dev/model/resemble-ai-chatterbox-turbo

#### deploy servers and admin pane
https://github.com/citizenfx/txAdmin

https://txadmin.gg/

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

### share .env files with devs
https://dotenvx.com/

https://1password.com/blog/1password-environments-env-files-public-beta

https://www.doppler.com/


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

### agent free apis
https://github.com/Free-APIs/Free-APIs.github.io/

### agent prompts -- accelerate development
sales:
https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-sales

marketing:
https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-marketing

product
https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-product

customer success
https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-customer-success

finance
https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-customer-success

### cloudflare
https://workers.cloudflare.com/

### dashboard - shadcn - TEMPLATES $69
https://github.com/ln-dev7/square-ui

https://square.lndev.me/https://supermemory.ai/docs/introduction

### explore
https://supermemory.ai/docs/introduction

### learn
https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/

stanford modern software dev
https://github.com/mihail911/modern-software-dev-assignments

### calendar
https://www.getopenyear.com/

### web check
https://web-check.xyz/

### Claude
https://www.producttalk.org/how-to-use-claude-code-features/

https://x.com/rileybrown

https://x.com/dabit3/status/2009131298250428923?s=58

https://x.com/ttorres/status/2008965366198743143

Claude Code (Anthropic's agentic coding tool) and related integrations. I've prioritized beginner-friendly ones with practical examples, based on recent resources:
* Claude Code Tutorial #1 - Introduction & Setup (YouTube, Aug 2025): A hands-on intro covering installation and basic usage as a co-pilot for coding. Great for switching from ChatGPT.
* Mastering Claude Code in 30 Minutes (YouTube, May 2025): Condenses key lessons into a quick overview, including comparisons to other AI assistants and tips for 2025 workflows.
* Claude Code Beginner's Tutorial: Build a Movie App in 15 Minutes (creatoreconomy.so, Sep 2025): Step-by-step guide to installing Claude Code in your terminal and Cursor, cloning a repo, understanding codebases, and running an app.
* Quickstart - Claude Code Docs (code.claude.com/docs/en/quickstart): Official Anthropic guide to get AI-powered coding assistance running in minutes, with examples for refactors and testing.
* Anthropic Academy: Claude API Development Guide (anthropic.com/learn/build-with-claude): Detailed docs with code examples, best practices, and integration guides for using Claude in development.
* How I Use Claude Code (+ My Best Tips) (builder.io/blog/claude-code, Jul 2025): Practical advice on VS Code integration, workflows for refactors, and maximizing output for projects like yours.
* Claude Code: A Highly Agentic Coding Assistant (deeplearning.ai short course): Explores how Claude Code enhances development, ideal for learning refactors, new code, and testing.
* Claude Code in Action (anthropic.skilljar.com): Covers using Claude Code for file reading, development tasks, and agentic workflows.
* Claude Code for Beginners - Build Your First App in 20 Minutes (YouTube, recent): Installation, setup, and a simple app build to verify connectivity.

### Claude creating demo video

i used claude (opus 4.5) with the 
@Remotion
 skill + the 
@elevenlabsio
 API (via MCP) to generate the following product demo video all within claude code.

i started inside the codebase for presscut and used this prompt:

𝙲𝚛𝚎𝚊𝚝𝚎 𝚊 𝚍𝚎𝚖𝚘 𝚟𝚒𝚍𝚎𝚘 𝚘𝚏 𝚝𝚑𝚎 𝙿𝚛𝚎𝚜𝚜𝚌𝚞𝚝 𝚊𝚙𝚙/p𝚛𝚘𝚍𝚞𝚌𝚝 𝚞𝚜𝚒𝚗𝚐 𝚛𝚎𝚖𝚘𝚝𝚒𝚘𝚗. 𝚄𝚜𝚎 𝚛𝚎𝚊𝚌𝚝 𝚌𝚘𝚖𝚙𝚘𝚗𝚎𝚗𝚎𝚗𝚝𝚜 𝚝𝚘 𝚛𝚎𝚙𝚕𝚒𝚌𝚊𝚝𝚎 𝚄𝙸 𝚎𝚕𝚎𝚖𝚎𝚗𝚝𝚜 𝚊𝚗𝚍 𝚛𝚎𝚙𝚕𝚒𝚌𝚊𝚝𝚎 𝚝𝚑𝚎 𝚄𝙸 𝚘𝚏 𝚝𝚑𝚎 𝚊𝚙𝚙 𝚊𝚜 𝚌𝚕𝚘𝚜𝚎𝚕𝚢 𝚊𝚜 𝚙𝚘𝚜𝚜𝚒𝚋𝚕𝚎.  𝚃𝚑𝚎 𝚊𝚙𝚙 𝚑𝚊𝚜 𝚊 𝙻𝙾𝚃 𝚘𝚏 𝚏𝚎𝚊𝚝𝚞𝚛𝚎𝚜/𝚏𝚞𝚗𝚌𝚝𝚒𝚘𝚗𝚊𝚕𝚒𝚝𝚢, 𝚜𝚘 𝚝𝚊𝚔𝚎 𝚐𝚞𝚒𝚍𝚊𝚗𝚌𝚎 𝚏𝚛𝚘𝚖 𝚝𝚑𝚎 𝚖𝚊𝚛𝚔𝚎𝚝𝚒𝚗𝚐 𝚑𝚘𝚖𝚎 𝚙𝚊𝚐𝚎/𝚒𝚗𝚍𝚎𝚡 𝚏𝚘𝚛 𝚠𝚑𝚊𝚝 𝚝𝚘 𝚑𝚒𝚐𝚑𝚕𝚒𝚐𝚑𝚝, 𝚠𝚑𝚒𝚕𝚎 𝚔𝚎𝚎𝚙𝚒𝚗𝚐 𝚕𝚊𝚗𝚐𝚞𝚊𝚐𝚎 𝚜𝚒𝚖𝚙𝚕𝚎 𝚊𝚗𝚍 𝚝𝚘-𝚝𝚑𝚎-𝚙𝚘𝚒𝚗𝚝.  𝚁𝚎𝚊𝚕𝚕𝚢 𝚐𝚛𝚒𝚕𝚕 𝚖𝚎 𝚠𝚒𝚝𝚑 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗𝚜 𝚝𝚘 𝚗𝚊𝚒𝚕 𝚍𝚘𝚠𝚗 𝚎𝚡𝚊𝚌𝚝𝚕𝚢 𝚑𝚘𝚠 𝚝𝚑𝚎 𝚏𝚒𝚗𝚊𝚕 𝚟𝚒𝚍𝚎𝚘 𝚜𝚑𝚘𝚞𝚕𝚍 𝚕𝚘𝚘𝚔/𝚏𝚎𝚎𝚕 𝚊𝚗𝚍 𝚠𝚑𝚊𝚝 𝚌𝚘𝚗𝚝𝚎𝚗𝚝 𝚜𝚑𝚘𝚞𝚕𝚍 𝚋𝚎 𝚝𝚑𝚎𝚛𝚎.  𝚃𝚑𝚎 𝚞𝚕𝚝𝚒𝚖𝚊𝚝𝚎 𝚐𝚘𝚊𝚕 𝚘𝚏 𝚝𝚑𝚒𝚜 𝚒𝚜 𝚝𝚘 𝚛𝚎𝚙𝚕𝚒𝚌𝚊𝚝𝚎 𝚠𝚑𝚊𝚝 𝚖𝚎, 𝚝𝚑𝚎 𝚏𝚘𝚞𝚗𝚍𝚎𝚛, 𝚠𝚘𝚞𝚕𝚍 𝚋𝚎 𝚜𝚑𝚘𝚠𝚒𝚗𝚐/𝚍𝚘𝚒𝚗𝚐 𝚠𝚒𝚝𝚑 𝚊 𝚙𝚛𝚘𝚍𝚞𝚌𝚝 𝚍𝚎𝚖𝚘 𝚠𝚒𝚝𝚑 𝚊 𝚌𝚞𝚜𝚝𝚘𝚖𝚎𝚛.

it generated a plan for the timing, scenes, text and graphics. i didn't have to add any new art assets. it simply used what i already was using throughout the app including react components.used elevenlabs to generate the background music ("indie tech aesthetic"). again, it knew exactly how long the video was and generated the appropriate length for it.

and finally, i also used elevenlabs to generate little sound effects (clicks, typing, success).

 didn't have the max plan, it'd have been about $700 worth of opus 4.5 tokens. then I used around 12,000 credits on elevenlabs generating (and regenerating) all the voiceovers, music and sound effects.



### Claude Setup
* get the Anthropic API Key console.anthropic.com
* install CLI
npm install -g @anthropic-ai/claude-code
* Run claude in your terminal—it will prompt you to enter your Anthropic API key. Paste it and confirm.

### Claude VS Code Integration (for seamless workflow):
* Open VS Code.
* In the terminal inside VS Code (View > Terminal), run claude. It will prompt to install the Claude Code extension automatically.
* Alternatively, search for "Claude Code" in VS Code Extensions marketplace (publisher: Anthropic) and install it manually.
* Extension features: Inline diffs, @-mentions for files/tools, plan reviews, keyboard shortcuts (e.g., Ctrl+Enter to apply changes).
* No Chrome plugins needed for core setup, but for browser-based workflows, consider the Claude.ai web app (no extension required).

### Initialize Claude Code
* In the editor's terminal, navigate to the project root: cd /path/to/your/project.
* Run claude to start a session. It will index your codebase (scans files for context).
* For scale, create a CLAUDE.md file in the root with project overview, architecture, and custom tools/instructions (e.g., "Use Python for Voice Agent refactors").
* Claude Code will request access to edit files, run commands, etc. Approve via prompts (e.g., for git commits or testing).
* Test connectivity: Ask Claude to "summarize the codebase" to verify it reads your files.

### Claude Begin Work
* For refactors/new code - In the Claude sidebar/terminal, describe tasks like "Refactor the main voice processing module for better scalability" or "Add a new feature to handle user authentication on the website."
* For testing: Instruct "Write unit tests for the new code and run them."
* Iterate: Review diffs, apply changes, commit via git.
* For multiple projects: Switch folders and restart claude sessions as needed. Use GitHub Actions integration (via Claude Code docs) for automated CI/CD.

### Claude Skills example
https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md

Now in VS Code stable: Agent Skills, the open standard created by 
@AnthropicAI
.

### web scraping
https://www.omkar.cloud/botasaurus/

### time tracking and billing for freelancers
https://github.com/solidtime-io/solidtime

https://www.solidtime.io/

### agentic shopping
https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/nrf-2026/

also review announcements of OpenAI with Stripe

### recent
curate your tech stack and get notified whenever there’s a change in the changelog.
https://www.recent.dev/

## claude code react best practices
https://code.claude.com/docs/en/vs-code

https://vercel.com/blog/introducing-react-best-practices

https://github.com/vercel-labs/agent-skills

https://agentskills.io/home

https://www.aitmpl.com/skills

https://skills.sh/

- download
https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code

- remotion with skills
https://gist.github.com/quuu/1340763972de84d704344970c82b7254

### vibevoice
https://github.com/microsoft/VibeVoice

### json render
https://json-render.dev/

### blackbox agents
https://agent.blackbox.ai/api

### animejs
https://github.com/juliangarnier/anime

https://animejs.com/documentation/layout/

https://codepen.io/collection/yykPaw

https://codepen.io/juliangarnier/pen/dPXWQyv

### agent elements
https://ai-sdk.dev/docs/introduction

https://ai-sdk.dev/elements/components/agent

### SEO
https://github.com/coreyhaines31/marketingskills

https://github.com/AppsYogi-com/gsc-mcp-server

https://github.com/googleanalytics/google-analytics-mcp

### charts new mermaid
https://agents.craft.do/mermaid
https://github.com/lukilabs/beautiful-mermaid
