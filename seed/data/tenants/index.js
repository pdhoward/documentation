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
    social: {
        facebook: "",
        instagram: "",
        youtube: "",
        x: "https://x.com/chaoticbots"
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
    agentSettings:[ {
      agentId: "agent_sales_v1",
      label: "Machine Agent",
      agentRepo: {
        provider: "github",
        baseRawUrl: "https://raw.githubusercontent.com/pdhoward/documentation/main/AGENT_MACHINE.md"
      },      
    }],
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
    name: "Cypress Resort",
    status: "trial",
    identity: {
      legalName: "Cypress Resort, Inc",
      displayName: "Cypress Resort",
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
    social: {
        facebook: "https://www.facebook.com/cypressresort",
        instagram: "https://www.instagram.com/cypressresort/",
        youtube: "",
        x: ""
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
    agentSettings: [
      {
       agentId: "privatechef",
       label: "Private Chef",
       agentRepo: {
          provider: "github",
          baseRawUrl: "https://raw.githubusercontent.com/pdhoward/documentation/refs/heads/main/AGENT_CYPRESSRESORTS_CHEF.md"
        },
      },
      {
        agentId: "conciergev2",
        label: "Cypress Concierge V2",
        agentRepo: {
            provider: "github",
            baseRawUrl: "https://raw.githubusercontent.com/pdhoward/documentation/main/AGENT_CYPRESSRESORT_CONCIERGE.md"
          },
      }
    ],
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
        origin: "https://cypressresort.vercel.app",
        label: "Main marketing site",
        revoked: false
      }
    ],
     apiKeys: [
      {
        id: "cypress-resorts",
        key: "e8040afa3e6548ee7d46aa41f7d9ab3b",
        origin: "https://ws.audioscrobbler.com",
        label: "Last FM music site",
        revoked: false,
        createdAt: new Date("2025-11-11T00:00:00.000Z")
      },
      {
        id: "cypress-resorts",
        key: "226d775e25014be98ba18cd249adffed",
        origin: "https://api.spoonacular.com",
        label: "Food site for meal prep",
        revoked: false,
        createdAt: new Date("2025-11-11T00:00:00.000Z")
      },
      {
        id: "cypress-resorts",
        key: "y40xxiFsqQXMI5l7cX54zucRS5xTlPgz",
        origin: "https://cypressbooking.vercel.app",
        label: "Strategic Machines Booking Engine - Test Site",
        revoked: false,
        createdAt: new Date("2025-11-11T00:00:00.000Z")
      }
    ],

    createdAt: new Date("2025-11-11T00:00:00.000Z"),
    updatedAt: new Date("2025-11-13T00:00:00.000Z"),
  },
   {
    tenantId: "productco",
    name: "DIY Warehouse",
    status: "active",
    identity: {
      legalName: "DIY Warehouse, Inc",
      displayName: "DIY Warehouse",
      domain: "https://product-engine.vercel.app/",
      industry: "home goods",
      timeZone: "America/New York",
      locale: "en-US",
    },
    contacts: {
      primary: {
        name: "David K",
        email: "david@gmail.com",
        phone: "+1-212-200-2000",
        role: "Merchant",
      },
      billing: {
        name: "Accounts Payable",
        email: "payables@gmail.com",
      },
      technical: {
        name: "Technical Support",
        email: "support@gmail.com",
      },
    },
    social: {
        facebook: "",
        instagram: "",
        youtube: "",
        x: "https://x.com/chaoticbots"
      },
    billing: {
      provider: "stripe",
      customerId: "cus_acme_001",
      defaultPaymentMethodId: "pm_acme_visa_4242",
      currency: "USD",
      billingEmail: "strategicmachines@gmail.com",
      taxId: "US123456789",
      billingAddress: {
        line1: "1000 Merchant Blvd",
        line2: "",
        city: "Atlanta",
        state: "GA",
        postalCode: "30303",
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
    agentSettings:[ {
      agentId: "productsales",
      label: "Product Sales",
      agentRepo: {
        provider: "github",
        baseRawUrl: "https://raw.githubusercontent.com/pdhoward/documentation/main/AGENT_DIYWAREHOUSE_PRODUCTSALES.md"
      },      
    }],
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
        id: "product_site",
        key: "w_diy_main_7f1b0e9c64f54d1a",
        origin: "https://product-engine.vercel.app/",
        label: "Main marketing site",
        revoked: false
      }
    ],
     apiKeys: [
      {
        id: "productco",
        key: "y40xxiFsqQXMI5l7cX54zucRS5xTlPgz",
        origin: "https://product-engine.vercel.app/",
        label: "DIY Warehouse Web Site - Test Site",
        revoked: false,
        createdAt: new Date("2025-11-11T00:00:00.000Z")
      }
    ],
    createdAt: new Date("2025-12-28T00:00:00.000Z"),
    updatedAt: new Date("2025-12-29T00:00:00.000Z"),
  },
];
