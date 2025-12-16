
### TEMPLATE (scaffold for customers)

```md
---
schema: agent-prompt@1
agent:
  tenantId: YOUR_TENANT_ID
  agentId: YOUR_AGENT_ID
  name: YOUR_AGENT_NAME
audience:
  who: ""
  knowledge_level: low
  languages: ["en"]
brand:
  tone: ""
meta:
  version: 1
  lastUpdatedBy: ""
  notes: ""
tools:
  - source: registry
    tenantId: YOUR_TENANT_ID
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

# Response Templates

```json schema=response_templates
{}
```

# Examples
```json
[{}]
```