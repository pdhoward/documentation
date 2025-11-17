
//import {AgentProfile} from "@/types/agent"


export const agentProfiles = [
  {
    name: "AnalyticsBot",
    downloads: 1760,
    price: 149.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=400&h=400&fit=crop",
    description:
      "I am an advanced AI analytics assistant with expertise in data analysis and visualization. I can help you understand your business metrics, generate reports, and provide actionable insights from your data.",
    skills: [
      "Real-time data analysis",
      "Custom report generation",
      "Sales trend prediction",
      "Market analysis",
      "Performance metrics tracking",
    ],
    reviews: [
      { author: "John Smith", content: "Incredible AI assistant! Helped me understand our quarterly sales data in minutes.", rating: 5 },
      { author: "Sarah Johnson", content: "The insights provided were invaluable for our business strategy.", rating: 4 },
    ],
    socialLinks: { github: "https://github.com", twitter: "https://twitter.com", linkedin: "https://linkedin.com", website: "https://example.com" },
    likes: 164,
    featured: false,
    // NEW
    available: false,
    demo: "video",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    },
  },
  {
    name: "WebDevGenius",
    downloads: 2340,
    price: 199.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
    description:
      "Your AI web development expert. I can help upgrade your website with modern features, optimize performance, and implement the latest web technologies.",
    skills: [
      "Website modernization",
      "Performance optimization",
      "Responsive design implementation",
      "SEO enhancement",
      "Accessibility improvements",
    ],
    reviews: [
      { author: "Mike Chen", content: "Transformed our outdated website into a modern masterpiece!", rating: 5 },
      { author: "Lisa Wong", content: "Incredible speed optimization results. Our site loads 3x faster now.", rating: 5 },
    ],
    socialLinks: { github: "https://github.com", twitter: "https://twitter.com", linkedin: "https://linkedin.com" },
    likes: 75,
    featured: false,
    // NEW
    available: false,
    demo: "live",
    connections: {
      liveLink: "https://demo.strategicmachines.ai/webdevgenius",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
    },
  },
  {
    name: "Concierge",
    downloads: 1890,
    price: 299.95,
    level: "Advanced",
    avatar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop",
    description:
      "Your personal AI concierge service assistant. I handle everything from restaurant reservations to travel planning, ensuring a premium experience for your clients.",
    skills: [
      "24/7 customer service",
      "Restaurant reservations",
      "Travel planning",
      "Event coordination",
      "Personal shopping assistance",
    ],
    reviews: [
      { author: "Robert James", content: "Outstanding service! Handled all our corporate event planning perfectly.", rating: 5 },
      { author: "Emma Thompson", content: "Makes complex travel arrangements seem effortless.", rating: 5 },
    ],
    socialLinks: { linkedin: "https://linkedin.com", website: "https://example.com" },
    likes: 331,
    featured: true,
    // NEW
    available: true,
    demo: "video",
    connections: {
      video: "https://res.cloudinary.com/stratmachine/video/upload/v1752260506/machine/20250711cypressdemo_q7plge.mp4",
      liveLink: "https://demo.strategicmachines.ai/concierge",
    },
  },
  {
    name: "InventoryMaster",
    downloads: 1450,
    price: 179.95,
    level: "Advanced",
    avatar: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=400&fit=crop",
    description:
      "Advanced AI inventory management assistant. I monitor stock levels, predict demand, and automate replenishment orders to optimize your supply chain.",
    skills: [
      "Real-time inventory tracking",
      "Demand forecasting",
      "Automated reordering",
      "Supplier management",
      "Stock optimization",
    ],
    reviews: [
      { author: "David Miller", content: "Reduced our stockouts by 85% in the first month!", rating: 5 },
      { author: "Patricia Garcia", content: "The demand forecasting feature is incredibly accurate.", rating: 4 },
    ],
    socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com" },
    likes: 300,
    featured: false,
    // NEW
    available: true,
    demo: "video",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    name: "ContentCraft",
    downloads: 2100,
    price: 129.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&h=400&fit=crop",
    description:
      "AI content creation specialist. I generate engaging blog posts, social media content, and marketing copy that resonates with your audience.",
    skills: [
      "Blog post generation",
      "Social media content creation",
      "SEO optimization",
      "Content strategy planning",
      "Brand voice maintenance",
    ],
    reviews: [
      { author: "Jennifer White", content: "The quality of content is consistently excellent.", rating: 5 },
      { author: "Tom Brown", content: "Helped us double our blog traffic in three months.", rating: 5 },
    ],
    socialLinks: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", website: "https://example.com" },
    likes: 278,
    featured: false,
    // NEW
    available: true,
    demo: "live",
    connections: {
      liveLink: "https://demo.strategicmachines.ai/contentcraft",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    name: "DIYGuide",
    downloads: 1670,
    price: 89.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop",
    description:
      "Your AI DIY project assistant. I provide step-by-step guidance for home improvement projects, crafts, and repairs with detailed instructions and safety tips.",
    skills: [
      "Project planning",
      "Material calculations",
      "Safety guidelines",
      "Tool recommendations",
      "Troubleshooting assistance",
    ],
    reviews: [
      { author: "Chris Anderson", content: "Saved me thousands on home repairs!", rating: 5 },
      { author: "Maria Rodriguez", content: "Clear instructions made complex projects manageable.", rating: 4 },
    ],
    socialLinks: { youtube: "https://youtube.com", website: "https://example.com" },
    likes: 192,
    featured: false,
    // NEW
    available: false,
    demo: "sales",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      liveLink: "https://demo.strategicmachines.ai/diyguide",
    },
  },
  {
    name: "HealthCoach",
    downloads: 2450,
    price: 159.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop",
    description:
      "AI health and wellness coach. I create personalized fitness plans, nutrition advice, and wellness strategies tailored to individual goals and needs.",
    skills: ["Workout planning", "Nutrition guidance", "Progress tracking", "Meal planning", "Wellness optimization"],
    reviews: [
      { author: "Sophie Turner", content: "The personalized workout plans are amazing!", rating: 5 },
      { author: "James Wilson", content: "Lost 20 pounds following the nutrition guidance.", rating: 5 },
    ],
    socialLinks: { instagram: "https://instagram.com", youtube: "https://youtube.com" },
    likes: 154,
    featured: false,
    // NEW
    available: true,
    demo: "video",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    name: "LegalAssist",
    downloads: 980,
    price: 399.95,
    level: "Enterprise",
    avatar: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop",
    description:
      "AI legal document assistant. I help draft and review basic legal documents, contracts, and agreements while providing general legal information.",
    skills: ["Document drafting", "Contract review", "Legal research", "Compliance checking", "Template customization"],
    reviews: [
      { author: "Michael Ross", content: "Invaluable for our startup's legal documentation needs.", rating: 5 },
      { author: "Rachel Green", content: "Saved us significant legal consultation costs.", rating: 4 },
    ],
    socialLinks: { linkedin: "https://linkedin.com", website: "https://example.com" },
    likes: 139,
    featured: false,
    // NEW
    available: true,
    demo: "sales",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      liveLink: "https://demo.strategicmachines.ai/legalassist",
    },
  },
  {
    name: "SocialMediaPro",
    downloads: 3120,
    price: 149.95,
    level: "Basic",
    avatar: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop",
    description:
      "AI social media management assistant. I help schedule posts, analyze engagement, and optimize your social media strategy across platforms.",
    skills: ["Content scheduling", "Engagement analysis", "Hashtag optimization", "Audience insights", "Campaign tracking"],
    reviews: [
      { author: "Alex Johnson", content: "Doubled our social media engagement in two months!", rating: 5 },
      { author: "Linda Martinez", content: "The analytics insights are incredibly valuable.", rating: 5 },
    ],
    socialLinks: { twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com" },
    likes: 482,
    featured: false,
    // NEW
    available: true,
    demo: "live",
    connections: {
      liveLink: "https://demo.strategicmachines.ai/socialmediapro",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    name: "CustomerService",
    downloads: 2890,
    price: 199.95,
    level: "Advanced",
    avatar: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=400&fit=crop",
    description:
      "24/7 AI customer service representative. I handle customer inquiries, support tickets, and feedback while maintaining a friendly and professional approach.",
    skills: ["24/7 support coverage", "Ticket management", "FAQ handling", "Complaint resolution", "Customer feedback analysis"],
    reviews: [
      { author: "William Chang", content: "Dramatically improved our customer response times.", rating: 5 },
      { author: "Emily Davis", content: "Our customers love the instant support.", rating: 4 },
    ],
    socialLinks: { twitter: "https://twitter.com", linkedin: "https://linkedin.com" },
    likes: 82,
    featured: false,
    // NEW
    available: true,
    demo: "video",
    connections: {
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
];
