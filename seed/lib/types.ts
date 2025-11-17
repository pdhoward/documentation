

// lib/types.ts
export interface ProcessArray {
  processname: string;
  subprocessname: string;
  isVerified: boolean;
}

export interface Agent {
  id: string;
  org: string;
  project: string;
  application: string;
  name: string;
  path: string;
  artifactType: string;
  description: string;
  documentType: string;
  label: string;
  createdOn: string;
  updatedOn: string | null;
  approvedOn: string | null;
  createdBy: string;
  updatedBy: string | null;
  approvedBy: string | null;
  isDeleted: boolean;
  isPinned: boolean;
  tags: string[];
  execsummary: string;
  functionalsummary: string;
  detailsteps: string;
  instructions: string;
  tools: (() => Agent | string)[];
  rationale?: string;
  processarray?: ProcessArray[];
  specialties: string[];
  domain?: string;
  schema?: {
    entity: string;
    elements: string[];
  }[];
  iconType: string; // this is assigned on server .. and icon selected in client
  gradient?: string;
}

export interface AgentResponse {
  agent: Agent;
  messages: string[];
}
