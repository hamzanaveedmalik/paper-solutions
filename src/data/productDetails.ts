export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  image: string;
  images: string[];
}

export interface ProductDetail {
  slug: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  variants?: ProductVariant[];
  features: string[];
  specs: {
    dimensions: string;
    weight: string;
    material: string;
    lining: string;
    hardware: string;
  };
  pricing: {
    range: string;
    price: string;
    note: string;
  }[];
}

export const productDetails: ProductDetail[] = [
  {
    slug: "wallets",
    name: "Premium Leather Wallet",
    description: "Handcrafted wallet with timeless style and practical storage.",
    image: "/products/Wallet/Bifold/bi 1_detail.webp",
    images: [
      "/products/Wallet/Bifold/bi 1_thumb.webp",
      "/products/Wallet/Bifold/bi 1_detail.webp",
      "/products/Wallet/Bifold/bi 1_hero.webp"
    ],
    variants: [
      // Bifold Wallets
      {
        id: "bifold-1",
        name: "Bifold 1",
        color: "Color 1", // Please provide actual color name
        image: "/products/Wallet/Bifold/bi 1_detail.webp",
        images: [
          "/products/Wallet/Bifold/bi 1_thumb.webp",
          "/products/Wallet/Bifold/bi 1_detail.webp",
          "/products/Wallet/Bifold/bi 1_hero.webp"
        ]
      },
      {
        id: "bifold-2",
        name: "Bifold 2",
        color: "Color 2", // Please provide actual color name
        image: "/products/Wallet/Bifold/bi 2_detail.webp",
        images: [
          "/products/Wallet/Bifold/bi 2_thumb.webp",
          "/products/Wallet/Bifold/bi 2_detail.webp",
          "/products/Wallet/Bifold/bi 2_hero.webp"
        ]
      },
      {
        id: "bifold-3",
        name: "Bifold 3",
        color: "Color 3", // Please provide actual color name
        image: "/products/Wallet/Bifold/bi 3_detail.webp",
        images: [
          "/products/Wallet/Bifold/bi 3_thumb.webp",
          "/products/Wallet/Bifold/bi 3_detail.webp",
          "/products/Wallet/Bifold/bi 3_hero.webp"
        ]
      },
      {
        id: "bifold-4",
        name: "Bifold 4",
        color: "Color 4", // Please provide actual color name
        image: "/products/Wallet/Bifold/bi 4_detail.webp",
        images: [
          "/products/Wallet/Bifold/bi 4_thumb.webp",
          "/products/Wallet/Bifold/bi 4_detail.webp",
          "/products/Wallet/Bifold/bi 4_hero.webp"
        ]
      },
      {
        id: "bifold-5",
        name: "Bifold 5",
        color: "Color 5", // Please provide actual color name
        image: "/products/Wallet/Bifold/bi 5_detail.webp",
        images: [
          "/products/Wallet/Bifold/bi 5_thumb.webp",
          "/products/Wallet/Bifold/bi 5_detail.webp",
          "/products/Wallet/Bifold/bi 5_hero.webp"
        ]
      }
    ],
    features: [
      "Premium leather construction",
      "Multiple card slots",
      "RFID blocking available",
      "Custom branding options"
    ],
    specs: {
      dimensions: "4.5\" x 3.5\"",
      weight: "0.2 lb",
      material: "Full-Grain Leather",
      lining: "Cotton",
      hardware: "Antique Brass"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "card-holders",
    name: "Slim Leather Card Holder",
    description: "Sleek storage solution for essential cards.",
    image: "/products/Wallet/Passport/pass 1_detail.webp",
    images: [
      "/products/Wallet/Passport/pass 1_thumb.webp",
      "/products/Wallet/Passport/pass 1_detail.webp",
      "/products/Wallet/Passport/pass 1_hero.webp"
    ],
    variants: [
      // Passport Wallets (Card Holders)
      {
        id: "passport-1",
        name: "Passport 1",
        color: "Color 1", // Please provide actual color name
        image: "/products/Wallet/Passport/pass 1_detail.webp",
        images: [
          "/products/Wallet/Passport/pass 1_thumb.webp",
          "/products/Wallet/Passport/pass 1_detail.webp",
          "/products/Wallet/Passport/pass 1_hero.webp"
        ]
      },
      {
        id: "passport-2",
        name: "Passport 2",
        color: "Color 2", // Please provide actual color name
        image: "/products/Wallet/Passport/pass 2_detail.webp",
        images: [
          "/products/Wallet/Passport/pass 2_thumb.webp",
          "/products/Wallet/Passport/pass 2_detail.webp",
          "/products/Wallet/Passport/pass 2_hero.webp"
        ]
      },
      {
        id: "passport-3",
        name: "Passport 3",
        color: "Color 3", // Please provide actual color name
        image: "/products/Wallet/Passport/pass 3_detail.webp",
        images: [
          "/products/Wallet/Passport/pass 3_thumb.webp",
          "/products/Wallet/Passport/pass 3_detail.webp",
          "/products/Wallet/Passport/pass 3_hero.webp"
        ]
      },
      {
        id: "passport-4",
        name: "Passport 4",
        color: "Color 4", // Please provide actual color name
        image: "/products/Wallet/Passport/pass 4_detail.webp",
        images: [
          "/products/Wallet/Passport/pass 4_thumb.webp",
          "/products/Wallet/Passport/pass 4_detail.webp",
          "/products/Wallet/Passport/pass 4_hero.webp"
        ]
      },
      {
        id: "passport-5",
        name: "Passport 5",
        color: "Color 5", // Please provide actual color name
        image: "/products/Wallet/Passport/pass 5_detail.webp",
        images: [
          "/products/Wallet/Passport/pass 5_thumb.webp",
          "/products/Wallet/Passport/pass 5_detail.webp",
          "/products/Wallet/Passport/pass 5_hero.webp"
        ]
      }
    ],
    features: [
      "Slim profile",
      "Quick-access pocket",
      "Holds 4-6 cards",
      "Debossing options"
    ],
    specs: {
      dimensions: "4\" x 3\"",
      weight: "0.15 lb",
      material: "Full-Grain Leather",
      lining: "Microfiber",
      hardware: "None"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "totes-bags",
    name: "Metropolitan Tote",
    description: "Versatile tote with reinforced handles and interior organization.",
    image: "/products/Bag/Tote/handbag 1_detail.webp",
    images: [
      "/products/Bag/Tote/handbag 1_thumb.webp",
      "/products/Bag/Tote/handbag 1_detail.webp",
      "/products/Bag/Tote/handbag 1_hero.webp"
    ],
    variants: [
      // Tote Bags (Handbags)
      {
        id: "tote-1",
        name: "Tote 1",
        color: "Color 1", // Please provide actual color name
        image: "/products/Bag/Tote/handbag 1_detail.webp",
        images: [
          "/products/Bag/Tote/handbag 1_thumb.webp",
          "/products/Bag/Tote/handbag 1_detail.webp",
          "/products/Bag/Tote/handbag 1_hero.webp"
        ]
      },
      {
        id: "tote-2",
        name: "Tote 2",
        color: "Color 2", // Please provide actual color name
        image: "/products/Bag/Tote/handbag 2_detail.webp",
        images: [
          "/products/Bag/Tote/handbag 2_thumb.webp",
          "/products/Bag/Tote/handbag 2_detail.webp",
          "/products/Bag/Tote/handbag 2_hero.webp"
        ]
      },
      {
        id: "tote-3",
        name: "Tote 3",
        color: "Color 3", // Please provide actual color name
        image: "/products/Bag/Tote/handbag 3_detail.webp",
        images: [
          "/products/Bag/Tote/handbag 3_thumb.webp",
          "/products/Bag/Tote/handbag 3_detail.webp",
          "/products/Bag/Tote/handbag 3_hero.webp"
        ]
      },
      {
        id: "tote-4",
        name: "Tote 4",
        color: "Color 4", // Please provide actual color name
        image: "/products/Bag/Tote/handbag 4_detail.webp",
        images: [
          "/products/Bag/Tote/handbag 4_thumb.webp",
          "/products/Bag/Tote/handbag 4_detail.webp",
          "/products/Bag/Tote/handbag 4_hero.webp"
        ]
      },
      {
        id: "tote-5",
        name: "Tote 5",
        color: "Color 5", // Please provide actual color name
        image: "/products/Bag/Tote/handbag 5_detail.webp",
        images: [
          "/products/Bag/Tote/handbag 5_thumb.webp",
          "/products/Bag/Tote/handbag 5_detail.webp",
          "/products/Bag/Tote/handbag 5_hero.webp"
        ]
      }
    ],
    features: [
      "Premium leather construction",
      "Interior organization pockets",
      "Large capacity",
      "Magnetic closure"
    ],
    specs: {
      dimensions: "15\" W x 12\" H x 6\" D",
      weight: "3.1 lb",
      material: "Full-Grain Leather",
      lining: "Cotton Canvas",
      hardware: "Antique Brass"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "backpacks",
    name: "Urban Backpack",
    description: "Modern backpack for professionals on the move.",
    image: "/products/Bag/backpack/backpack 1_detail.webp",
    images: [
      "/products/Bag/backpack/backpack 1_thumb.webp",
      "/products/Bag/backpack/backpack 1_detail.webp",
      "/products/Bag/backpack/backpack 1_hero.webp"
    ],
    variants: [
      {
        id: "backpack-1",
        name: "Backpack 1",
        color: "Brown",
        image: "/products/Bag/backpack/backpack 1_detail.webp",
        images: [
          "/products/Bag/backpack/backpack 1_thumb.webp",
          "/products/Bag/backpack/backpack 1_detail.webp",
          "/products/Bag/backpack/backpack 1_hero.webp"
        ]
      },
      {
        id: "backpack-2",
        name: "Backpack 2",
        color: "Dark Brown",
        image: "/products/Bag/backpack/backpack 2_detail.webp",
        images: [
          "/products/Bag/backpack/backpack 2_thumb.webp",
          "/products/Bag/backpack/backpack 2_detail.webp",
          "/products/Bag/backpack/backpack 2_hero.webp"
        ]
      },
      {
        id: "backpack-3",
        name: "Backpack 3",
        color: "Tan Orange",
        image: "/products/Bag/backpack/backpack 3_detail.webp",
        images: [
          "/products/Bag/backpack/backpack 3_thumb.webp",
          "/products/Bag/backpack/backpack 3_detail.webp",
          "/products/Bag/backpack/backpack 3_hero.webp"
        ]
      },
      {
        id: "backpack-4",
        name: "Backpack 4",
        color: "Olive Green",
        image: "/products/Bag/backpack/backpack 4_detail.webp",
        images: [
          "/products/Bag/backpack/backpack 4_thumb.webp",
          "/products/Bag/backpack/backpack 4_detail.webp",
          "/products/Bag/backpack/backpack 4_hero.webp"
        ]
      },
      {
        id: "backpack-5",
        name: "Backpack 5",
        color: "Plum",
        image: "/products/Bag/backpack/bacpack 5_detail.webp",
        images: [
          "/products/Bag/backpack/bacpack 5_thumb.webp",
          "/products/Bag/backpack/bacpack 5_detail.webp",
          "/products/Bag/backpack/bacpack 5_hero.webp"
        ]
      }
    ],
    features: [
      "Padded laptop compartment",
      "Water-resistant leather",
      "Ergonomic design",
      "Custom hardware options"
    ],
    specs: {
      dimensions: "17\" H x 12\" W x 5\" D",
      weight: "2.5 lb",
      material: "Full-Grain Leather",
      lining: "Polyester",
      hardware: "Gunmetal"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "belts",
    name: "Heritage Leather Belt",
    description: "Classic belt with premium buckle and durable construction.",
    image: "/products/Belt/Formal/formal 1_detail.webp",
    images: [
      "/products/Belt/Formal/formal 1_thumb.webp",
      "/products/Belt/Formal/formal 1_detail.webp",
      "/products/Belt/Formal/formal 1_hero.webp"
    ],
    variants: [
      // Formal Belts
      {
        id: "formal-1",
        name: "Formal 1",
        color: "Color 1", // Please provide actual color name
        image: "/products/Belt/Formal/formal 1_detail.webp",
        images: [
          "/products/Belt/Formal/formal 1_thumb.webp",
          "/products/Belt/Formal/formal 1_detail.webp",
          "/products/Belt/Formal/formal 1_hero.webp"
        ]
      },
      {
        id: "formal-2",
        name: "Formal 2",
        color: "Color 2", // Please provide actual color name
        image: "/products/Belt/Formal/formal 2_detail.webp",
        images: [
          "/products/Belt/Formal/formal 2_thumb.webp",
          "/products/Belt/Formal/formal 2_detail.webp",
          "/products/Belt/Formal/formal 2_hero.webp"
        ]
      },
      {
        id: "formal-3",
        name: "Formal 3",
        color: "Color 3", // Please provide actual color name
        image: "/products/Belt/Formal/formal 3_detail.webp",
        images: [
          "/products/Belt/Formal/formal 3_thumb.webp",
          "/products/Belt/Formal/formal 3_detail.webp",
          "/products/Belt/Formal/formal 3_hero.webp"
        ]
      },
      {
        id: "formal-4",
        name: "Formal 4",
        color: "Color 4", // Please provide actual color name
        image: "/products/Belt/Formal/formal 4_detail.webp",
        images: [
          "/products/Belt/Formal/formal 4_thumb.webp",
          "/products/Belt/Formal/formal 4_detail.webp",
          "/products/Belt/Formal/formal 4_hero.webp"
        ]
      },
      {
        id: "formal-5",
        name: "Formal 5",
        color: "Color 5", // Please provide actual color name
        image: "/products/Belt/Formal/formal 5_detail.webp",
        images: [
          "/products/Belt/Formal/formal 5_thumb.webp",
          "/products/Belt/Formal/formal 5_detail.webp",
          "/products/Belt/Formal/formal 5_hero.webp"
        ]
      },
      // Braided Belts
      {
        id: "braided-1",
        name: "Braided 1",
        color: "Color 1", // Please provide actual color name
        image: "/products/Belt/Braided/braid 1_detail.webp",
        images: [
          "/products/Belt/Braided/braid 1_thumb.webp",
          "/products/Belt/Braided/braid 1_detail.webp",
          "/products/Belt/Braided/braid 1_hero.webp"
        ]
      },
      {
        id: "braided-2",
        name: "Braided 2",
        color: "Color 2", // Please provide actual color name
        image: "/products/Belt/Braided/braid 2_detail.webp",
        images: [
          "/products/Belt/Braided/braid 2_thumb.webp",
          "/products/Belt/Braided/braid 2_detail.webp",
          "/products/Belt/Braided/braid 2_hero.webp"
        ]
      },
      {
        id: "braided-3",
        name: "Braided 3",
        color: "Color 3", // Please provide actual color name
        image: "/products/Belt/Braided/braid 3_detail.webp",
        images: [
          "/products/Belt/Braided/braid 3_thumb.webp",
          "/products/Belt/Braided/braid 3_detail.webp",
          "/products/Belt/Braided/braid 3_hero.webp"
        ]
      },
      {
        id: "braided-4",
        name: "Braided 4",
        color: "Color 4", // Please provide actual color name
        image: "/products/Belt/Braided/braid 4_detail.webp",
        images: [
          "/products/Belt/Braided/braid 4_thumb.webp",
          "/products/Belt/Braided/braid 4_detail.webp",
          "/products/Belt/Braided/braid 4_hero.webp"
        ]
      },
      {
        id: "braided-5",
        name: "Braided 5",
        color: "Color 5", // Please provide actual color name
        image: "/products/Belt/Braided/braid 5_detail.webp",
        images: [
          "/products/Belt/Braided/braid 5_thumb.webp",
          "/products/Belt/Braided/braid 5_detail.webp",
          "/products/Belt/Braided/braid 5_hero.webp"
        ]
      }
    ],
    features: [
      "Italian leather",
      "Quality buckle",
      "Size customization",
      "Edge finishing"
    ],
    specs: {
      dimensions: "1.5\" width",
      weight: "0.5 lb",
      material: "Full-Grain Leather",
      lining: "Unlined",
      hardware: "Solid Brass"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "accessories",
    name: "Leather Keychain",
    description: "Elegant accessory to keep keys organized.",
    image: "/products/Acessories/Keychain/keychain 1_detail.webp",
    images: [
      "/products/Acessories/Keychain/keychain 1_thumb.webp",
      "/products/Acessories/Keychain/keychain 1_detail.webp",
      "/products/Acessories/Keychain/keychain 1_hero.webp",
      "/products/Acessories/Keychain/keychain 2_detail.webp",
      "/products/Acessories/Keychain/keychain 3_detail.webp"
    ],
    features: [
      "Gift-worthy design",
      "Corporate branding",
      "Variety of styles",
      "Durable hardware"
    ],
    specs: {
      dimensions: "1\" x 4\"",
      weight: "0.1 lb",
      material: "Full-Grain Leather",
      lining: "Unlined",
      hardware: "Zinc Alloy"
    },
    pricing: [
      { range: "100-249 units", price: "$120", note: "Base price" },
      { range: "250-499 units", price: "$105", note: "13% off" },
      { range: "500-999 units", price: "$95", note: "21% off" },
      { range: "1000+ units", price: "$85", note: "29% off" }
    ]
  },
  {
    slug: "office-lifestyle",
    name: "Executive Portfolio",
    description: "Professional portfolio for meetings and presentations.",
    image: "/products/Bag/Laptop/laptop 1_detail.webp",
    images: [
      "/products/Bag/Laptop/laptop 1_thumb.webp",
      "/products/Bag/Laptop/laptop 1_detail.webp",
      "/products/Bag/Laptop/laptop 1_hero.webp",
      "/products/Bag/Laptop/laptop 2_detail.webp",
      "/products/Bag/Laptop/laptop 3_detail.webp"
    ],
    features: [
      "Document storage",
      "Business card slots",
      "Custom embossing",
      "Professional appearance"
    ],
    specs: {
      dimensions: "12\" x 9\" x 1.5\"",
      weight: "1.2 lb",
      material: "Full-Grain Leather",
      lining: "Suede",
      hardware: "Antique Brass"
    },
    pricing: [
      { range: "100-249 units", price: "$180", note: "Base price" },
      { range: "250-499 units", price: "$160", note: "11% off" },
      { range: "500-999 units", price: "$145", note: "19% off" },
      { range: "1000+ units", price: "$130", note: "28% off" }
    ]
  },
  {
    slug: "keychains",
    name: "Premium Keychain Set",
    description: "Set of elegant keychains with various designs.",
    image: "/products/Acessories/Keychain/keychain 1_detail.webp",
    images: [
      "/products/Acessories/Keychain/keychain 1_thumb.webp",
      "/products/Acessories/Keychain/keychain 1_detail.webp",
      "/products/Acessories/Keychain/keychain 1_hero.webp",
      "/products/Acessories/Keychain/keychain 2_detail.webp",
      "/products/Acessories/Keychain/keychain 3_detail.webp"
    ],
    features: [
      "Multiple designs",
      "Corporate branding",
      "Gift packaging",
      "Durable construction"
    ],
    specs: {
      dimensions: "2\" x 1.5\"",
      weight: "0.2 lb",
      material: "Full-Grain Leather",
      lining: "Unlined",
      hardware: "Stainless Steel"
    },
    pricing: [
      { range: "100-249 units", price: "$45", note: "Base price" },
      { range: "250-499 units", price: "$40", note: "11% off" },
      { range: "500-999 units", price: "$35", note: "22% off" },
      { range: "1000+ units", price: "$30", note: "33% off" }
    ]
  },
  {
    slug: "travel-essentials",
    name: "Travel Organizer",
    description: "Comprehensive travel organizer for all your essentials.",
    image: "/products/Bag/Duffel/duffel 1_detail.webp",
    images: [
      "/products/Bag/Duffel/duffel 1_thumb.webp",
      "/products/Bag/Duffel/duffel 1_detail.webp",
      "/products/Bag/Duffel/duffel 1_hero.webp",
      "/products/Bag/Duffel/duffel 2_detail.webp",
      "/products/Bag/Duffel/duffel 3_detail.webp"
    ],
    features: [
      "Multiple compartments",
      "TSA-friendly design",
      "Passport holder",
      "Cable management"
    ],
    specs: {
      dimensions: "10\" x 7\" x 2\"",
      weight: "1.8 lb",
      material: "Full-Grain Leather",
      lining: "Nylon",
      hardware: "Zinc Alloy"
    },
    pricing: [
      { range: "100-249 units", price: "$150", note: "Base price" },
      { range: "250-499 units", price: "$135", note: "10% off" },
      { range: "500-999 units", price: "$120", note: "20% off" },
      { range: "1000+ units", price: "$105", note: "30% off" }
    ]
  },
  {
    slug: "pet-accessories",
    name: "Pet Collar & Leash Set",
    description: "Premium leather accessories for your beloved pets.",
    image: "/products/Acessories/Keychain/keychain 1_detail.webp",
    images: [
      "/products/Acessories/Keychain/keychain 1_thumb.webp",
      "/products/Acessories/Keychain/keychain 1_detail.webp",
      "/products/Acessories/Keychain/keychain 1_hero.webp",
      "/products/Acessories/Keychain/keychain 2_detail.webp",
      "/products/Acessories/Keychain/keychain 3_detail.webp"
    ],
    features: [
      "Adjustable sizing",
      "Comfortable padding",
      "Durable hardware",
      "Custom engraving"
    ],
    specs: {
      dimensions: "Collar: 12-20\", Leash: 4ft",
      weight: "0.8 lb",
      material: "Full-Grain Leather",
      lining: "Soft Lining",
      hardware: "Stainless Steel"
    },
    pricing: [
      { range: "100-249 units", price: "$85", note: "Base price" },
      { range: "250-499 units", price: "$75", note: "12% off" },
      { range: "500-999 units", price: "$65", note: "24% off" },
      { range: "1000+ units", price: "$55", note: "35% off" }
    ]
  },
  {
    slug: "fashion-accessories",
    name: "Designer Handbag",
    description: "Elegant handbag perfect for fashion-forward individuals.",
    image: "/products/Bag/Crossbody/crossbody 1_detail.webp",
    images: [
      "/products/Bag/Crossbody/crossbody 1_thumb.webp",
      "/products/Bag/Crossbody/crossbody 1_detail.webp",
      "/products/Bag/Crossbody/crossbody 1_hero.webp"
    ],
    variants: [
      // Crossbody Bags
      {
        id: "crossbody-1",
        name: "Crossbody 1",
        color: "Brown",
        image: "/products/Bag/Crossbody/crossbody 1_detail.webp",
        images: [
          "/products/Bag/Crossbody/crossbody 1_thumb.webp",
          "/products/Bag/Crossbody/crossbody 1_detail.webp",
          "/products/Bag/Crossbody/crossbody 1_hero.webp"
        ]
      },
      {
        id: "crossbody-2",
        name: "Crossbody 2",
        color: "Olive Green",
        image: "/products/Bag/Crossbody/crossbody 2_detail.webp",
        images: [
          "/products/Bag/Crossbody/crossbody 2_thumb.webp",
          "/products/Bag/Crossbody/crossbody 2_detail.webp",
          "/products/Bag/Crossbody/crossbody 2_hero.webp"
        ]
      },
      {
        id: "crossbody-3",
        name: "Crossbody 3",
        color: "Tan Orange",
        image: "/products/Bag/Crossbody/crossbody 3_detail.webp",
        images: [
          "/products/Bag/Crossbody/crossbody 3_thumb.webp",
          "/products/Bag/Crossbody/crossbody 3_detail.webp",
          "/products/Bag/Crossbody/crossbody 3_hero.webp"
        ]
      },
      {
        id: "crossbody-4",
        name: "Crossbody 4",
        color: "Black",
        image: "/products/Bag/Crossbody/crossbody 4_detail.webp",
        images: [
          "/products/Bag/Crossbody/crossbody 4_thumb.webp",
          "/products/Bag/Crossbody/crossbody 4_detail.webp",
          "/products/Bag/Crossbody/crossbody 4_hero.webp"
        ]
      },
      {
        id: "crossbody-5",
        name: "Crossbody 5",
        color: "Dark Brown",
        image: "/products/Bag/Crossbody/crcrossbody 5_detail.webp",
        images: [
          "/products/Bag/Crossbody/crcrossbody 5_thumb.webp",
          "/products/Bag/Crossbody/crcrossbody 5_detail.webp",
          "/products/Bag/Crossbody/crcrossbody 5_hero.webp"
        ]
      }
    ],
    features: [
      "Trendy design",
      "Interior organization",
      "Adjustable strap",
      "Multiple color options"
    ],
    specs: {
      dimensions: "10\" x 8\" x 4\"",
      weight: "1.5 lb",
      material: "Full-Grain Leather",
      lining: "Silk",
      hardware: "Gold Plated"
    },
    pricing: [
      { range: "100-249 units", price: "$200", note: "Base price" },
      { range: "250-499 units", price: "$180", note: "10% off" },
      { range: "500-999 units", price: "$160", note: "20% off" },
      { range: "1000+ units", price: "$140", note: "30% off" }
    ]
  },
  {
    slug: "jackets",
    name: "Leather Jacket",
    description: "Classic leather jacket with modern styling.",
    image: "/products/Acessories/Jackets/jacket 1_detail.webp",
    images: [
      "/products/Acessories/Jackets/jacket 1_thumb.webp",
      "/products/Acessories/Jackets/jacket 1_detail.webp",
      "/products/Acessories/Jackets/jacket 1_hero.webp",
      "/products/Acessories/Jackets/jacket 2_detail.webp",
      "/products/Acessories/Jackets/jacket 3_detail.webp"
    ],
    features: [
      "Premium leather",
      "Classic design",
      "Multiple sizes",
      "Custom fit options"
    ],
    specs: {
      dimensions: "Various sizes available",
      weight: "3.5 lb",
      material: "Full-Grain Leather",
      lining: "Cotton",
      hardware: "Antique Brass Zippers"
    },
    pricing: [
      { range: "100-249 units", price: "$350", note: "Base price" },
      { range: "250-499 units", price: "$315", note: "10% off" },
      { range: "500-999 units", price: "$280", note: "20% off" },
      { range: "1000+ units", price: "$245", note: "30% off" }
    ]
  },
  {
    slug: "gloves",
    name: "Leather Driving Gloves",
    description: "Premium leather gloves for driving and everyday use.",
    image: "/products/Acessories/Gloves/gloves 1_detail.webp",
    images: [
      "/products/Acessories/Gloves/gloves 1_thumb.webp",
      "/products/Acessories/Gloves/gloves 1_detail.webp",
      "/products/Acessories/Gloves/gloves 1_hero.webp",
      "/products/Acessories/Gloves/gloves 2_detail.webp",
      "/products/Acessories/Gloves/gloves 3_detail.webp"
    ],
    features: [
      "Touchscreen compatible",
      "Breathable design",
      "Precise fit",
      "Grip enhancement"
    ],
    specs: {
      dimensions: "Sizes S-XL",
      weight: "0.3 lb",
      material: "Full-Grain Leather",
      lining: "Silk",
      hardware: "None"
    },
    pricing: [
      { range: "100-249 units", price: "$95", note: "Base price" },
      { range: "250-499 units", price: "$85", note: "11% off" },
      { range: "500-999 units", price: "$75", note: "21% off" },
      { range: "1000+ units", price: "$65", note: "32% off" }
    ]
  },
  {
    slug: "bracelets",
    name: "Leather Bracelet Collection",
    description: "Stylish leather bracelets for men and women.",
    image: "/products/Acessories/Keychain/keychain 1_detail.webp",
    images: [
      "/products/Acessories/Keychain/keychain 1_thumb.webp",
      "/products/Acessories/Keychain/keychain 1_detail.webp",
      "/products/Acessories/Keychain/keychain 1_hero.webp",
      "/products/Acessories/Keychain/keychain 2_detail.webp",
      "/products/Acessories/Keychain/keychain 3_detail.webp"
    ],
    features: [
      "Adjustable sizing",
      "Multiple styles",
      "Gift packaging",
      "Custom engraving"
    ],
    specs: {
      dimensions: "7-8\" circumference",
      weight: "0.1 lb",
      material: "Full-Grain Leather",
      lining: "Unlined",
      hardware: "Stainless Steel"
    },
    pricing: [
      { range: "100-249 units", price: "$35", note: "Base price" },
      { range: "250-499 units", price: "$30", note: "14% off" },
      { range: "500-999 units", price: "$25", note: "29% off" },
      { range: "1000+ units", price: "$20", note: "43% off" }
    ]
  }
];

export const getProductDetail = (slug: string) =>
  productDetails.find((p) => p.slug === slug);
