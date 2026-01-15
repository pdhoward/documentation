---
title: "Voice Agent Product Architecture"
description: "System design for scalable, application-layer voice agents built on commoditized infrastructure"
---

## Design Principles

This product is designed as an **application-layer voice system**, not a platform or infrastructure provider.

Core principles:
- Voice-first, not voice-added
- Workflow-native, not chatbot-style
- Built for real operations, not demos
- Infrastructure-agnostic (LLMs, TTS, STT are swappable)
- Deterministic where it matters, generative where it helps

---

## High-Level Architecture
Inbound Call / Voice Stream
↓
Speech-to-Text (Realtime)
↓
Conversation Orchestrator
↓
Intent + State Engine
↓
Workflow Engine
↓
Integrations / Actions
↓
Response Generator
↓
Text-to-Speech (Realtime)
↓
Caller


---

## Core System Components

### 1. Telephony & Channel Layer

Responsibilities:
- Inbound/outbound phone calls
- Call routing and transfer
- SMS fallback
- Recording and call metadata

Notes:
- This layer is deliberately thin
- All business logic lives above it

---

### 2. Realtime Speech Layer

Responsibilities:
- Low-latency speech-to-text
- Streaming text-to-speech
- Interrupt handling (barge-in)
- Natural conversation pacing

Key requirement:
- Sub-300ms perceived latency for turn-taking

This is **pure infrastructure dependency** — no differentiation here.

---

### 3. Conversation Orchestrator (Critical IP)

This is the heart of the product.

Responsibilities:
- Maintains conversational state
- Tracks user intent across turns
- Handles corrections, restarts, and ambiguity
- Enforces guardrails and policy constraints

Key distinction:
- This is **not** a stateless chatbot
- It is a stateful, goal-driven dialogue engine

---

### 4. Intent & State Engine

Responsibilities:
- Classify high-level intent (schedule, cancel, request, status)
- Track slot completion (date, time, service, location, person)
- Handle partial information and clarifications

Design choice:
- Hybrid approach:
  - Deterministic state machine for workflow steps
  - LLM reasoning for intent interpretation and phrasing

---

### 5. Workflow Engine

Responsibilities:
- Execute business-specific workflows
- Enforce ordering and validation
- Branch logic based on availability, rules, or errors

Examples:
- Healthcare: insurance validation before booking
- Hotels: availability → upsell → confirmation
- Home services: lead qualification → dispatch → ETA

This is **where vertical differentiation lives**.

---

### 6. Integration Layer

Responsibilities:
- Read/write to external systems
- Normalize data across vendors
- Retry, fallback, and reconciliation logic

Common integrations:
- Calendars (Google, Outlook)
- PMS / CRS (hotels)
- EMR / scheduling (healthcare)
- Dispatch software (home services)
- CRM and billing

Design rule:
- Integrations are **idempotent and reversible**

---

### 7. Response Generation

Responsibilities:
- Generate natural, contextual responses
- Adapt tone per vertical
- Confirm critical details verbally

Important:
- Responses are constrained by system state
- The model never invents availability or pricing

---

### 8. Admin & Control Plane

Responsibilities:
- Workflow configuration
- Business rules
- Escalation thresholds
- Review and override

Audience:
- Non-technical operators
- Operations managers

---

### 9. Analytics & Learning Loop

Metrics captured:
- Call containment rate
- Conversion rate
- No-show reduction
- Average handle time
- Escalation frequency

Purpose:
- Improve workflows
- Prove ROI
- Support upsell and expansion

---

## Security & Compliance

- Role-based access
- Encrypted recordings
- Configurable data retention
- HIPAA-ready architecture for healthcare
- Audit logs for regulated environments

---

## What Is Defensible

Not defensible:
- LLM choice
- TTS voice quality
- Token efficiency

Defensible:
- Workflow depth
- Vertical-specific logic
- Distribution
- Embedded operational knowledge
- Trust earned through reliability

---

## Summary

This architecture is optimized for:
- High-volume, high-stakes voice workflows
- Clear ROI use cases
- Vertical expansion without rebuilding core systems

The product wins by being **boringly reliable where it matters** and **pleasantly human where it helps**.

