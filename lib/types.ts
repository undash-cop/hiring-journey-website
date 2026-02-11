// User types
export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "starter" | "pro" | "elite";
  credits: number;
  creditsUsed: number;
  createdAt: string;
}

// Application types
export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: "applied" | "screening" | "interview" | "offer" | "rejected";
  appliedAt: string;
  updatedAt: string;
}

// Resume types
export interface Resume {
  id: string;
  userId: string;
  role: string;
  score: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Credit transaction types
export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: "earned" | "spent" | "purchased";
  description: string;
  createdAt: string;
}

// Pricing plan types
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  credits: number;
  features: string[];
  popular?: boolean;
}
