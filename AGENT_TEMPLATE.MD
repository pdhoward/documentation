
### TEMPLATE (scaffold for customers)

```md
---
schema: agent-prompt@1
agent:
  tenantId: YOUR_TENANT_ID
  agentId: YOUR_AGENT_ID
  name: YOUR_AGENT_NAME
  tone:
  start: >
  fetch_current_date: >
audience:
  who: ""
  knowledge_level: low
  languages: ["en"]
brand:
  tone: ""
  terminology:
    USD: dollars
meta:
  version: 1
  lastUpdatedBy: ""
  notes: ""
tools:
  - source: registry
    tenantId: YOUR_TENANT_ID
    names: []
  - source: core
    names: []
---

# Goal

(One sentence. Single primary job.)

# Conversation Start

(Exact greeting rules, if any.)

# Time & Date Rules

(Only if relevant. Otherwise delete.)

# Style Rules

- (Do)
- (Do not)

# Core Policies

## Data Grounding

- (What must be tool-sourced vs. what can be answered directly)

## Safety / Compliance

- (Boundaries, refusal patterns, privacy rules)

# Tool Selection Rules

- (When to call what)

# Dialog Flow

- (Happy path steps)

# Capabilities

- If a tool is not listed here, do not call it

- For each tool descriptor, specify when it is called, the arguments it is called with, and actions take on success or on error.

- This section ranks as most important in controlling the behavior of the Agent and the expected outcomes

# Response Templates

```json schema=response_templates
{}
```

# Examples
```json
[{}]
```