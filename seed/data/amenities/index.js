/*
   synthetic data file to demonstrate definition of various amenities
   that may be reserved by the voice agent
*/

export const amenities = [ 

  // ----- Spa treatments -----
  {
    unit_id: "spa-001",
    tenantId: "cypress-resorts",
    type: "spa_treatment",
    code: "DEEP_TISSUE",
    name: "Deep Tissue Massage",
    duration_min: 60,
    price: 160,
    currency: "USD",
    status: "active",
    description: "Focused muscle work for recovery and tension relief.",
    updatedAt: "2025-01-01T12:00:00Z",
    createdAt: "2024-12-01T10:00:00Z"
  },
  {
    unit_id: "spa-002",
    tenantId: "cypress-resorts",
    type: "spa_treatment",
    code: "SWEDISH",
    name: "Swedish Massage",
    duration_min: 60,
    price: 140,
    currency: "USD",
    status: "active",
    description: "Relaxation-forward massage with long, fluid strokes.",
    updatedAt: "2025-01-01T12:00:00Z",
    createdAt: "2024-12-01T10:00:00Z"
  },
  {
    unit_id: "spa-003",
    tenantId: "cypress-resorts",
    type: "spa_treatment",
    code: "COUPLES",
    name: "Couples Massage",
    duration_min: 60,
    price: 280,
    currency: "USD",
    status: "active",
    description: "Side-by-side Swedish massage—perfect for special occasions.",
    updatedAt: "2025-01-01T12:00:00Z",
    createdAt: "2024-12-01T10:00:00Z"
  },
 
  {
    unit_id: "media-menu",
    tenantId: "cypress-resorts",
    type: "media",
    key: "menu",
    mediaType: "image",
    src: "https://res.cloudinary.com/stratmachine/image/upload/v1766158730/cypress/private_chef_menu_q2dywk.png",
    title: "Chef’s Menu",
    description: "Sample menu from our private executive chef.",
    status: "active",
    updatedAt: "2025-01-01T12:00:00Z",
    createdAt: "2024-12-01T10:00:00Z"
  },
  {
    unit_id: "media-site-plan",
    tenantId: "cypress-resorts",
    type: "media",
    key: "site_plan",
    mediaType: "video",
    src: "https://res.cloudinary.com/stratmachine/video/upload/v1751653644/cypress/sitemap_buvsgw.mp4",
    title: "Site Plan",
    description: "Plan for a 25+ unit luxury woodland resort over the next few years.",
    status: "active",
    updatedAt: "2025-01-01T12:00:00Z",
    createdAt: "2024-12-01T10:00:00Z"
  },
 
];
