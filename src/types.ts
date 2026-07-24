export type BmcBlockId =
  | 'keyPartners'
  | 'keyActivities'
  | 'keyResources'
  | 'valuePropositions'
  | 'customerRelationships'
  | 'channels'
  | 'customerSegments'
  | 'costStructure'
  | 'revenueStreams';

export interface BmcItem {
  id: string;
  text: string;
  category?: string;
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface BmcBlock {
  id: BmcBlockId;
  title: string;
  description: string;
  iconName: string;
  items: BmcItem[];
}

export interface BusinessFinancials {
  sellingPricePerCup: number;
  costPerCup: number;
  monthlyTargetCups: number;
  monthlyFixedBudget: number;
  marketingAllocationPercent: number;
  manpowerAllocationPercent: number;
  ingredientsAllocationPercent: number;
  packagingAllocationPercent: number;
  studentRatioPercent: number;
  studentDiscountPercent: number;
}

export interface PartnerAssignment {
  name: string;
  role: string;
  avatarBg: string;
  responsibilities: string[];
  kpis: string[];
}

export interface RecipeIngredient {
  id: string;
  name: string;
  category: 'tea' | 'dairy' | 'topping' | 'sweetener' | 'packaging';
  costPerUnit: number;
  unit: string;
}

export interface CustomDrink {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  ingredients: { ingredientId: string; amount: number }[];
}
