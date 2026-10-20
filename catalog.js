// Public catalogue: the three customer types, their services and pricing.
// Prices are sample values (INR) - edit them to match your real rates.

export const userTypes = [
  {
    id: "client",
    title: "Client / Home Owner",
    summary:
      "Share your ideas for your house. Our team prepares the design, 3D visuals and the approval layout plan for you.",
    services: [
      { id: "design", name: "Design", description: "Concept and interior/exterior design from your ideas." },
      { id: "3d", name: "3D Visualisation", description: "Realistic 3D views of every room and the exterior." },
      { id: "approval-layout", name: "Approval Layout Plan", description: "Plan prepared for local authority approval." },
    ],
  },
  {
    id: "builder",
    title: "Builder / Developer",
    summary:
      "Share the project brief. We deliver design, 3D visualisation, approval plans and marketing material for your project.",
    services: [
      { id: "design", name: "Design", description: "Unit and project design for residential or commercial builds." },
      { id: "3d", name: "3D Visualisation", description: "Photoreal 3D renders for sales and approvals." },
      { id: "approval-layout", name: "Approval Layout Plan", description: "Authority-ready layout plans." },
      { id: "brochure", name: "Brochure", description: "Print and digital project brochure." },
      { id: "3d-video", name: "3D Video", description: "Walkthrough and fly-through video." },
    ],
  },
  {
    id: "architect",
    title: "Architect / Designer",
    summary:
      "Outsource drafting and visualisation. Share your concept and our team produces plans, designs and presentation material.",
    services: [
      { id: "plan", name: "Plan", description: "Detailed floor plans and working drawings." },
      { id: "design", name: "Design", description: "Design development from your concept." },
      { id: "brochure", name: "Brochure", description: "Portfolio and project brochure." },
      { id: "3d-video", name: "3D Video", description: "Presentation walkthrough video." },
    ],
  },
];

export const pricing = [
  {
    id: "basic",
    name: "Basic",
    price: 4999,
    unit: "per project",
    audience: "Home owners",
    features: ["Concept design", "2 revisions", "Basic 3D views (3 images)", "Email support"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 14999,
    unit: "per project",
    audience: "Home owners & architects",
    highlight: true,
    features: [
      "Full design set",
      "5 revisions",
      "3D views for every room",
      "Approval layout plan",
      "Chat support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 39999,
    unit: "per project",
    audience: "Builders & developers",
    features: [
      "Everything in Standard",
      "Unlimited revisions (30 days)",
      "Brochure design",
      "3D walkthrough video",
      "Dedicated project manager",
    ],
  },
];

export const projectStatuses = ["submitted", "in-review", "in-design", "revision", "approved", "delivered"];
