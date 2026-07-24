import { BmcBlock, BusinessFinancials, PartnerAssignment, RecipeIngredient, CustomDrink } from '../types';

export const INITIAL_BMC_BLOCKS: BmcBlock[] = [
  {
    id: 'keyPartners',
    title: 'Key Partners',
    description: 'Key strategic partners and stakeholders driving supply & operations.',
    iconName: 'Users',
    items: [
      { id: 'kp-1', text: 'Huay', category: 'Founder / Operations & Sourcing', notes: 'Leads supplier relationships, tea sourcing & store ops.', priority: 'high' },
      { id: 'kp-2', text: 'Eric', category: 'Co-Founder / Finance & Growth', notes: 'Manages unit economics, budgeting, scale & franchising.', priority: 'high' },
      { id: 'kp-3', text: 'Deng Lu', category: 'Co-Founder / Brand & Marketing', notes: 'Drives social media, influencer partnerships & app strategies.', priority: 'high' }
    ]
  },
  {
    id: 'keyActivities',
    title: 'Key Activities',
    description: 'Core daily operations, marketing drivers, and engagement programs.',
    iconName: 'Activity',
    items: [
      { id: 'ka-1', text: 'Free Sample', category: 'Customer Acquisition', notes: 'Pop-up sampling near universities and office hubs to drive trial.', priority: 'high' },
      { id: 'ka-2', text: 'Stamp Reward Card', category: 'Retention', notes: 'Digital & physical stamp card (e.g. Buy 9, 10th Cup Free).', priority: 'high' },
      { id: 'ka-3', text: 'Tea Appreciation Workshop', category: 'Brand Building', notes: 'Interactive tasting sessions for premium single-origin tea leaves.', priority: 'medium' },
      { id: 'ka-4', text: 'Seasonal Flavour', category: 'Product Innovation', notes: 'Monthly limited-edition drinks (e.g. Taro Cheese, Mango Sago).', priority: 'high' },
      { id: 'ka-5', text: 'Product Collaboration', category: 'Co-Branding', notes: 'Partnerships with local dessert shops & lifestyle brands.', priority: 'medium' }
    ]
  },
  {
    id: 'keyResources',
    title: 'Key Resources',
    description: 'Critical assets required to deliver value and reach customers.',
    iconName: 'Layers',
    items: [
      { id: 'kr-1', text: 'Survey', category: 'Market Insights', notes: 'Customer feedback loops on sweetness levels, flavor preferences & pricing.', priority: 'medium' },
      { id: 'kr-2', text: 'Advertising', category: 'Marketing Assets', notes: 'Digital ad collateral, influencer content, print banners & signage.', priority: 'high' }
    ]
  },
  {
    id: 'valuePropositions',
    title: 'Value Propositions',
    description: 'The unique value delivered to customer segments.',
    iconName: 'Sparkles',
    items: [
      { id: 'vp-1', text: 'Affordable prices', category: 'Pricing', notes: 'High value at an accessible average $5 per cup price point.', priority: 'high' },
      { id: 'vp-2', text: 'Variation of choices', category: 'Product Range', notes: 'Milk teas, fruit teas, cheese teas, and alternative milk options.', priority: 'high' },
      { id: 'vp-3', text: 'Consistency (Quality)', category: 'Quality Assurance', notes: 'Strict SOPs and automated tea brew timers for identical taste every time.', priority: 'high' },
      { id: 'vp-4', text: 'Customisation', category: 'Personalization', notes: '5 sweetness levels (0% to 100%), ice levels, and 8+ topping options.', priority: 'high' },
      { id: 'vp-5', text: 'Delivery (Accessibility)', category: 'Convenience', notes: 'Fast local delivery via food apps and mobile pre-order pickup.', priority: 'high' }
    ]
  },
  {
    id: 'customerRelationships',
    title: 'Customer Relationships',
    description: 'How the brand interacts with and retains customers.',
    iconName: 'HeartHandshake',
    items: [
      { id: 'cr-1', text: '24/7', category: 'Service Availability', notes: 'Automated app ordering, online support & 24/7 self-service kiosks.', priority: 'medium' },
      { id: 'cr-2', text: 'Online vs Offline', category: 'Omnichannel', notes: 'Seamless bridge between physical store experience and mobile app rewards.', priority: 'high' }
    ]
  },
  {
    id: 'channels',
    title: 'Channels',
    description: 'Customer touchpoints and distribution avenues.',
    iconName: 'Share2',
    items: [
      { id: 'ch-1', text: 'Social Media', category: 'Digital Marketing', notes: 'Instagram reels, TikTok boba aesthetics, and Xiaohongshu marketing.', priority: 'high' },
      { id: 'ch-2', text: 'Influencer', category: 'Word of Mouth', notes: 'Micro-influencer sampling campaigns & food blogger reviews.', priority: 'high' },
      { id: 'ch-3', text: 'Apps', category: 'Digital Channels', notes: 'Custom mobile app for pre-orders, delivery integrations (Grab/Foodpanda).', priority: 'high' },
      { id: 'ch-4', text: 'Advertisement (printed/online)', category: 'Traditional & Paid Media', notes: 'Targeted meta ads, Google Maps ads, and printed flyers near campuses.', priority: 'medium' }
    ]
  },
  {
    id: 'customerSegments',
    title: 'Customer Segments',
    description: 'Target demographic groups consuming bubble tea.',
    iconName: 'Target',
    items: [
      { id: 'cs-1', text: 'Working professionals', category: 'Primary High-Value', notes: 'Afternoon tea breaks, corporate group orders, premium options.', priority: 'high' },
      { id: 'cs-2', text: 'Students', category: 'Primary High-Volume', notes: 'Post-class hangouts, study sessions, price-sensitive loyalty seekers.', priority: 'high' }
    ]
  },
  {
    id: 'costStructure',
    title: 'Cost Structure',
    description: 'Major monthly expenditure and cost drivers.',
    iconName: 'DollarSign',
    items: [
      { id: 'cs-1', text: '$35,000 per month', category: 'Monthly Fixed/Operating Cost', notes: 'Covers marketing, manpower (staffing), raw ingredients base, and cup materials.', priority: 'high' },
      { id: 'cs-2', text: '30,000 cups target volume at $5 per cup', category: 'Target Volume & Pricing', notes: 'Based on average market bubble tea chain selling price ($150k target gross revenue).', priority: 'high' }
    ]
  },
  {
    id: 'revenueStreams',
    title: 'Revenue Streams',
    description: 'How the business generates income and gross margins.',
    iconName: 'TrendingUp',
    items: [
      { id: 'rs-1', text: '$2.50 margin per cup (50% gross profit)', category: 'Unit Margin', notes: '$2.50 product cost per cup sold at $5.00 retail = 50% gross margin profit per cup.', priority: 'high' }
    ]
  }
];

export const INITIAL_FINANCIALS: BusinessFinancials = {
  sellingPricePerCup: 5.00,
  costPerCup: 2.50,
  monthlyTargetCups: 30000,
  monthlyFixedBudget: 35000,
  marketingAllocationPercent: 20,
  manpowerAllocationPercent: 40,
  ingredientsAllocationPercent: 25,
  packagingAllocationPercent: 15,
  studentRatioPercent: 50,
  studentDiscountPercent: 10,
};

export const PARTNER_PROFILES: PartnerAssignment[] = [
  {
    name: 'Huay',
    role: 'Head of Operations & Sourcing',
    avatarBg: 'bg-emerald-500',
    responsibilities: [
      'Tea supplier relationships & single-origin ingredient procurement',
      'Store SOP standardization & tea brew quality control',
      'Overseeing inventory, packaging, and cup material supplies'
    ],
    kpis: ['Maintain cup COGS <= $2.50', 'Zero tea freshness quality complaints', 'Store SOP compliance > 98%']
  },
  {
    name: 'Eric',
    role: 'Head of Finance & Business Scaling',
    avatarBg: 'bg-indigo-500',
    responsibilities: [
      'Financial modeling, unit economics & break-even management',
      'Monthly budget allocation ($35,000 threshold monitoring)',
      'Expansion strategy & franchise profitability framework'
    ],
    kpis: ['Monthly net profit margin >= 25%', 'Keep fixed monthly burn <= $35k', 'Achieve 30,000 cup monthly sales goal']
  },
  {
    name: 'Deng Lu',
    role: 'Head of Brand, Apps & Marketing',
    avatarBg: 'bg-amber-500',
    responsibilities: [
      'Social media campaigns (TikTok, Instagram) & Influencer outreach',
      'Stamp Reward Card digital app loyalty system rollout',
      'Tea Appreciation Workshops & Co-branding product collabs'
    ],
    kpis: ['App download growth +20%/mo', 'Loyalty card repeat purchase rate > 45%', 'Workshop attendance rate 90%+']
  }
];

export const SAMPLE_INGREDIENTS: RecipeIngredient[] = [
  { id: 'ing-1', name: 'Premium Jasmine Green Tea', category: 'tea', costPerUnit: 0.35, unit: 'brew/cup' },
  { id: 'ing-2', name: 'Roasted Oolong Tea Base', category: 'tea', costPerUnit: 0.40, unit: 'brew/cup' },
  { id: 'ing-3', name: 'Fresh Whole Milk / Cream', category: 'dairy', costPerUnit: 0.60, unit: '200ml' },
  { id: 'ing-4', name: 'Oat Milk Sub', category: 'dairy', costPerUnit: 0.85, unit: '200ml' },
  { id: 'ing-5', name: 'Chewy Brown Sugar Boba', category: 'topping', costPerUnit: 0.35, unit: 'portion' },
  { id: 'ing-6', name: 'Salted Cheese Foam', category: 'topping', costPerUnit: 0.50, unit: 'layer' },
  { id: 'ing-7', name: 'Fruit Puree (Mango/Taro)', category: 'topping', costPerUnit: 0.45, unit: 'portion' },
  { id: 'ing-8', name: 'Cane Sugar Syrup', category: 'sweetener', costPerUnit: 0.10, unit: 'dose' },
  { id: 'ing-9', name: 'Custom Logo Sealed Cup & Straw', category: 'packaging', costPerUnit: 0.40, unit: 'set' },
];

export const SAMPLE_DRINKS: CustomDrink[] = [
  {
    id: 'drink-1',
    name: 'Classic Brown Sugar Boba Milk Tea',
    category: 'Milk Tea',
    sellingPrice: 5.50,
    ingredients: [
      { ingredientId: 'ing-2', amount: 1 },
      { ingredientId: 'ing-3', amount: 1 },
      { ingredientId: 'ing-5', amount: 1 },
      { ingredientId: 'ing-8', amount: 1 },
      { ingredientId: 'ing-9', amount: 1 }
    ]
  },
  {
    id: 'drink-2',
    name: 'Jasmine Cheese Foam Tea',
    category: 'Specialty Tea',
    sellingPrice: 5.00,
    ingredients: [
      { ingredientId: 'ing-1', amount: 1 },
      { ingredientId: 'ing-6', amount: 1 },
      { ingredientId: 'ing-8', amount: 1 },
      { ingredientId: 'ing-9', amount: 1 }
    ]
  },
  {
    id: 'drink-3',
    name: 'Mango Taro Sago Delight (Seasonal)',
    category: 'Seasonal Flavour',
    sellingPrice: 6.00,
    ingredients: [
      { ingredientId: 'ing-1', amount: 1 },
      { ingredientId: 'ing-4', amount: 1 },
      { ingredientId: 'ing-7', amount: 1 },
      { ingredientId: 'ing-9', amount: 1 }
    ]
  }
];
