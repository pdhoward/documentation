## Actions and Refactors

- generate prompt tools instructions directly from http descriptors
- the visual components are explicitly referenced too many times, like in instructions.mdx,
visual stage, use visuals, tools.ts, registry.tsx ....simplify this structure -- one source of truth

- ask groq to generate user docs?

- will need an AI editor to create http tools for user

- app/docs - use AI to structure and write a set of user docs -- need editor mode for http tool descriptors
- need to work on the docs - maybe use shadcn for display?
- also need docs on exactly how this works - rate vs sessions ... whats being recorded on mongo vs upstash

- test app/validate

- explore addition of welcome (disclaimer for beta)- and maybe tools education (see garbage/machinetemplate/components)

- for Transcript component - created_at is being set to updated_at ,,, debug we need to keep the original create date

When you need to invoice, join in application code by emailHash.
// On session creation:
await db.collection("users").updateOne(
  { emailHash },
  { $setOnInsert: { emailHash, createdAt: new Date() }, $set: { email, tenantId, updatedAt: new Date() } },
  { upsert: true }
);

- figure out what to do with janitor.ts from xscripts .... suggested
{ "scripts": { "cron:janitor": "ts-node scripts/janitor.ts" } }
Set up a cron (GitHub Actions, Render cron, Vercel Cron, etc.) to call npm run cron:janitor every minute or two.

- Test Heartbeat --- also what calls the heartbeat every 60 sec?

- test >>>you should see usage_daily.dollars/tokens incrementing as you talk to the agent, and realtime_sessions.lastSeenAt marching forward every ~45s.
---------------

MultiTenant Actions

1. add flex option to select Tenant for the app (demo version of app)
2. Tenant ID & options is retrieved from website/tenant
3. Update Tenants for Cypress and ProductCo (reseed db)
4. Update Agents for ProductCo Agent (reseed db)
5. Build HTTP Descriptor (actions) for ProductCo >> direct mongo query/search
6. Build HTTP Descriptor for stats - how many options for example, or lowest price etc
7. Complete order form for product?
7.1 - Prompt Lib update
7.2 - Visuals?

8. Update Agents for EventAgent -- upcoming conference
9. Build HTTP Descriptor - info, speakers, etc lots of content -- need an
api end point with this content

9.1 - Also for the product database we need to sort out the images so that they are an array of strings rather than how currectly structured


11. monitor
https://github.com/abhixdd/UptimeKit/

---------------
Documentation
https://fumadocs.dev/

---------

1. Big-picture architecture you’re heading toward



A. Operator / Console UI
Your current “iPhone shell” page with ControlsBar, logs, transcripts, diagnostics, etc.
Used by you (and later, your customers) to debug, test, and configure agents.

B. Embedded Website Agent UI
Triggered by the floating widget button you just shipped.
Should be minimal, branded, focused on end users.
Talks to the same agent brain (OpenAI Live + tools), but with fewer controls / debug.
Behind both, you want a shared Agent Core, which:
Knows the tenantId
Loads the tenant’s tools, prompts, defaults
Connects to OpenAI Live / WebRTC
Streams transcripts and logs, tagged with tenantId and sessionId

So the roadmap is mostly: extract the Agent Core, then build special UIs on top.

------------
3. Multi-tenant / production-grade considerations

To make this commercially scalable, keep these in your plan:
All public widget traffic must use JWT, never raw tenantId.
Bootstrap returns widgetSessionToken.
Widget uses that token when:
Loading /widget
Hitting /api/voice/session or /api/realtime/...

Server verifies:

Signature (WIDGET_TOKEN_SECRET)
sub (tenantId) exists and is active
key is not revoked
Optional: rate limits per tenantId, per key.
Every DB write tagged with tenantId + channel.
Transcripts: tenantId, channel, sessionId.
Tool logs: same.

Usage: same.
Later you’ll build admin analytics with simple queries.
Tenant configuration as the single authority.
Tools allowed for widget vs console (e.g. agentSettings.allowedTools).

Voice defaults (voice name, language).
Safety behaviors (fallback, escalation).
Per-tenant rate limits.
Middleware for /api/voice/* using IP + tenantId to limit abuse.

Fail with a nice “agent is busy, please try again” message for widget users.

Versioning & migrations.
By keeping widget logic inside your platform (iframe), you can:
Deploy new UI,
Add controls,
Change agent instructions,
without customers changing anything on their sites.

4. Prompt selection
> convert the prompt array from promptlibrary to mong
> in lib/agent/managePrompts ... refactor this function to read from mongo -- or better to search mongo for the right prompt object and then ingest
export function selectPromptForTenant(
  tenantId: string,
  all: StructuredPrompt | StructuredPrompt[] | unknown
): { name?: string; base: StructuredPrompt } {
  const arr = Array.isArray(all)
    ? (all as StructuredPrompt[])
    : ([all as StructuredPrompt] as StructuredPrompt[]);

  const doc = arr.find(p => p?.agent?.tenantId === tenantId) ?? arr[0];
  if (!doc) throw new Error("No tenant prompt found");

  return { name: doc.agent?.name, base: doc };
}

IMPROVE THE DOCUMENTATION SITE ...
https://github.com/waynesutton/markdown-site
https://markdowncms.netlify.app/

https://www.convex.dev/


