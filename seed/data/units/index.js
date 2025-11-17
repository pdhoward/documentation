

export const units = [
{
  _id: "68adc6cee5bbfe073e1dcc08",
  name: "Ridge Villa",
  unitNumber: "1",
  type: "villa",
  description:
    "This Villa sits in the heart of our natural surrounds, providing a magnificent view of our rushing stream of water",
  rate: 685, // master is canonical
  currency: "USD",

  config: {
    squareFeet: 825,
    view: "stream",
    beds: [{ size: "king", count: 1 }],
    bedrooms: 1, // from 2nd doc
    bathrooms: 1, // from 2nd doc
    shower: true,
    bathtub: true,
    hotTub: true,
    sauna: true,
    ada: false,
  },

  calendars: [
    {
      calendarId: "68a7795d4354ebaa8a52c34d",
      name: "Cypress Resorts",
      version: 1,
      effectiveDate: "2025-08-26",
    },
  ],

  active: true,
  createdAt: new Date(1756219086563),
  updatedAt: new Date(1758821745544),
  __v: 0,
  unit_id: "unit-villa-1",
  tenantId: "cypress-resorts",

  // ---------- Enriched system-of-record fields ----------
  slug: "ridge-villa",

  occupancy: {
    sleeps: 2, // from 2nd doc
    maxAdults: 2,
    maxChildren: 0,
    extraBedAvailable: false,
    cribAvailable: false,
  },

  amenities: {
    raw: ["hot_tub", "sauna", "outdoor_shower", "chef_kitchen", "fire_pit", "wifi"],
    wellness: ["hot tub", "sauna"],
    bath: ["outdoor shower", "bathtub", "shower"],
    kitchenette: ["chef-grade kitchen"],
    outdoor: ["fire pit"],
    tech: ["wifi"],
    view: ["stream"],
    room: [],
    services: [],
    accessibility: [],
  },

  location: {
    displayAddress: "",
    unitPositionNotes: "Ridge line, near stream",
    floorLevel: null,
    city: "Jasper",
    state: "GA",
    coordinates: { lat: 34.467, lng: -84.429 },
    wayfinding: [],
  },

  images: [
    { url: "https://res.cloudinary.com/stratmachine/video/upload/v1751653643/cypress/unit1_gurm14.mp4", role: "gallery", alt: "Ridge Villa living room", caption: "", order: 1 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169632/cypress/hottub_exhrcb.jpg", role: "gallery", alt: "Private hot tub", caption: "", order: 2 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169650/cypress/kitchen_pjizbz.jpg", role: "gallery", alt: "Modern kitchen", caption: "", order: 3 },
  ],

  policies: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
    smoking: "prohibited",
    pets: { allowed: false, notes: "" },
    cancellation: { windowHours: null, penaltyType: null, penaltyValue: null },
    securityDeposit: { required: false, amount: null, currency: "USD" },
    minStayNights: null,
  },

  tech: {
    wifi: { available: true, bandwidthMbps: null },
    tv: { available: true, sizeInches: null, channels: [], casting: true },
    audio: { bluetoothSpeaker: false },
    smartHome: { voiceAssistant: false, smartThermostat: false },
  },

  safety: {
    smokeDetector: true,
    carbonMonoxideDetector: true,
    fireExtinguisher: true,
    firstAidKit: true,
    emergencyInfo: "",
  },

  housekeeping: {
    cleaningFrequency: "daily",
    linensChange: "everyOtherDay",
    towelsChange: "daily",
    turnDownService: false,
  },

  feesAndTaxes: {
    resortFee: { amount: null, currency: "USD", per: "night" },
    cleaningFee: { amount: null, currency: "USD", per: "stay" },
    taxes: [],
  },

  ratePlans: [],

  labels: ["villa", "luxury", "stream-view"],
  tags: [],

  seo: {
    slug: "ridge-villa",
    title: "Ridge Villa | Cypress Resorts",
    metaDescription:
      "825 sq ft luxury villa with stream views, private hot tub, sauna, and chef-grade kitchen.",
  },

  metadata: {
    schemaVersion: "1.0.0",
    source: "master+merge",
    sourceNotes: {     
    },
  },
},
// Falls Villa — System of Record
{
  _id: "68acbc5dfb77d7ff89f4adc6",
  name: "Falls Villa",
  unitNumber: "2",
  type: "villa",
  description:
    "Villa #2 sits on top of our grand waterfall, a perfect getaway for someone looking to bask in the heart of nature",
  rate: 1200, // master is canonical
  currency: "USD",

  config: {
    squareFeet: 900,
    view: "forest",
    beds: [{ size: "king", count: 1 }],
    bedrooms: 2, // from 2nd doc
    bathrooms: 2, // from 2nd doc
    shower: true,
    bathtub: true,
    hotTub: true,
    sauna: true,
    ada: true,
  },

  calendars: [
    {
      calendarId: "68a7795d4354ebaa8a52c34d",
      name: "Cypress Resorts",
      version: 1,
      effectiveDate: "2025-10-01",
    },
  ],

  active: true,
  createdAt: new Date(1756150877250),
  updatedAt: new Date(1758821578576),
  __v: 0,
  unit_id: "unit-villa-2",
  tenantId: "cypress-resorts",

  // ---------- Enriched system-of-record fields ----------
  slug: "falls-villa",

  occupancy: {
    sleeps: 4,       // from 2nd doc
    maxAdults: 4,
    maxChildren: 0,
    extraBedAvailable: false,
    cribAvailable: false,
  },

  amenities: {
    raw: ["hot_tub", "sauna", "panoramic_windows", "deck", "wifi"],
    wellness: ["hot tub", "sauna"],
    bath: ["bathtub", "shower"],
    kitchenette: [],
    outdoor: ["deck"],
    tech: ["wifi"],
    view: ["forest"],
    room: ["panoramic windows"],
    services: [],
    accessibility: ["ADA"], // reflects config.ada
  },

  location: {
    displayAddress: "",
    unitPositionNotes: "Steps from signature waterfall",
    floorLevel: null,
    city: "Jasper",
    state: "GA",
    coordinates: { lat: 34.468, lng: -84.431 },
    wayfinding: ["near waterfall overlook"],
  },

  images: [
    { url: "https://res.cloudinary.com/stratmachine/video/upload/v1751649061/cypress/cypresswaterfall_my6x79.mp4", role: "gallery", alt: "Falls Villa deck near waterfall", caption: "", order: 1 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169650/cypress/masterbedroom_b7ehpw.jpg", role: "gallery", alt: "Master suite", caption: "", order: 2 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169651/cypress/waterfall_xja7ub.jpg", role: "gallery", alt: "Waterfall overlook", caption: "", order: 3 },
  ],

  policies: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
    smoking: "prohibited",
    pets: { allowed: false, notes: "" },
    cancellation: { windowHours: null, penaltyType: null, penaltyValue: null },
    securityDeposit: { required: false, amount: null, currency: "USD" },
    minStayNights: null,
  },

  tech: {
    wifi: { available: true, bandwidthMbps: null },
    tv: { available: true, sizeInches: null, channels: [], casting: true },
    audio: { bluetoothSpeaker: false },
    smartHome: { voiceAssistant: false, smartThermostat: false },
  },

  safety: {
    smokeDetector: true,
    carbonMonoxideDetector: true,
    fireExtinguisher: true,
    firstAidKit: true,
    emergencyInfo: "",
  },

  housekeeping: {
    cleaningFrequency: "daily",
    linensChange: "everyOtherDay",
    towelsChange: "daily",
    turnDownService: false,
  },

  feesAndTaxes: {
    resortFee: { amount: null, currency: "USD", per: "night" },
    cleaningFee: { amount: null, currency: "USD", per: "stay" },
    taxes: [],
  },

  ratePlans: [],

  labels: ["villa", "luxury", "forest-view", "waterfall"],
  tags: [],

  seo: {
    slug: "falls-villa",
    title: "Falls Villa | Cypress Resorts",
    metaDescription:
      "900 sq ft premium villa by the signature waterfall with panoramic windows, large deck, private hot tub, and sauna.",
  },

  metadata: {
    schemaVersion: "1.0.0",
    source: "master+merge",
    sourceNotes: {},
  },
},
// Grove Villa — System of Record
{
  _id: "68cd972b7d629e320214172a",
  name: "Grove Villa",
  unitNumber: "A1",
  type: "villa",
  description: "Beautiful Villa which resides in our natural grove",
  rate: 395, // master is canonical
  currency: "USD",

  config: {
    // master has no squareFeet or view; we keep config shape minimal here
    beds: [], // keep as provided by master
    bedrooms: 1, // from 2nd doc
    bathrooms: 1, // from 2nd doc
    shower: true,
    bathtub: false,
    hotTub: false,
    sauna: false,
    ada: false,
  },

  calendars: [
    {
      calendarId: "68cd972b7d629e3202141727",
      name: "TestCalendar-1758304037185",
      version: 1,
      effectiveDate: "2025-01-01",
    },
  ],

  active: true,
  createdAt: new Date(1758304043599),
  updatedAt: new Date(1758821713570),
  __v: 0,
  unit_id: "unit-villa-3",
  tenantId: "cypress-resorts",

  // ---------- Enriched system-of-record fields ----------
  slug: "grove-villa",

  occupancy: {
    sleeps: 2,       // from 2nd doc
    maxAdults: 2,
    maxChildren: 0,
    extraBedAvailable: false,
    cribAvailable: false,
  },

  amenities: {
    raw: ["outdoor_shower", "fire_pit", "chef_kitchen", "wifi"],
    wellness: [], // no hot tub/sauna in master
    bath: ["outdoor shower", "shower"], // reflect master shower + secondary outdoor
    kitchenette: ["chef-grade kitchen"],
    outdoor: ["fire pit"],
    tech: ["wifi"],
    view: [], // master has no 'view' for this unit
    room: [],
    services: [],
    accessibility: [], // master ada=false
  },

  location: {
    displayAddress: "",
    unitPositionNotes: "Secluded grove setting",
    floorLevel: null,
    city: "Jasper",
    state: "GA",
    coordinates: { lat: 34.466, lng: -84.428 },
    wayfinding: [],
  },

  images: [
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169650/cypress/villapic_sohhbj.jpg", role: "gallery", alt: "Grove Villa exterior", caption: "", order: 1 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759170503/cypress/outdoorshower_pt4q3n.jpg", role: "gallery", alt: "Outdoor rain shower", caption: "", order: 2 },
    { url: "https://res.cloudinary.com/stratmachine/image/upload/v1759169650/cypress/masterbedroom_b7ehpw.jpg", role: "gallery", alt: "Cozy bedroom", caption: "", order: 3 },
  ],

  policies: {
    checkInTime: "15:00",
    checkOutTime: "11:00",
    smoking: "prohibited",
    pets: { allowed: false, notes: "" },
    cancellation: { windowHours: null, penaltyType: null, penaltyValue: null },
    securityDeposit: { required: false, amount: null, currency: "USD" },
    minStayNights: null,
  },

  tech: {
    wifi: { available: true, bandwidthMbps: null },
    tv: { available: true, sizeInches: null, channels: [], casting: true },
    audio: { bluetoothSpeaker: false },
    smartHome: { voiceAssistant: false, smartThermostat: false },
  },

  safety: {
    smokeDetector: true,
    carbonMonoxideDetector: true,
    fireExtinguisher: true,
    firstAidKit: true,
    emergencyInfo: "",
  },

  housekeeping: {
    cleaningFrequency: "daily",
    linensChange: "everyOtherDay",
    towelsChange: "daily",
    turnDownService: false,
  },

  feesAndTaxes: {
    resortFee: { amount: null, currency: "USD", per: "night" },
    cleaningFee: { amount: null, currency: "USD", per: "stay" },
    taxes: [],
  },

  ratePlans: [],

  labels: ["villa", "luxury", "grove"],
  tags: [],

  seo: {
    slug: "grove-villa",
    title: "Grove Villa | Cypress Resorts",
    metaDescription:
      "Secluded woodland villa with outdoor rain shower and cozy bedroom — perfect for a private retreat.",
  },

  metadata: {
    schemaVersion: "1.0.0",
    source: "master+merge",
    sourceNotes: {},
  },
}
]