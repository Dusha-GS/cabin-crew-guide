// src/hooks/useMembership.ts
// Manages membership tier and free trial limits
// In production, Standard/Premium would be verified via Whop webhook
// Free trial limits are tracked in localStorage (1-time per visitor)

export type MembershipTier = "free" | "standard" | "premium";

export interface MembershipState {
  tier: MembershipTier;
  mockInterviewsUsed: number;
  cvReviewsUsed: number;
  canUseMockInterview: boolean;
  canUseCVReview: boolean;
  isStandard: boolean;
  isPremium: boolean;
}

const FREE_MOCK_LIMIT = 1;
const FREE_CV_LIMIT = 1;

export function getMembershipState(tier: MembershipTier): MembershipState {
  const mockUsed = parseInt(localStorage.getItem("mock-interviews-used") || "0");
  const cvUsed = parseInt(localStorage.getItem("cv-reviews-used") || "0");

  return {
    tier,
    mockInterviewsUsed: mockUsed,
    cvReviewsUsed: cvUsed,
    canUseMockInterview: tier !== "free" || mockUsed < FREE_MOCK_LIMIT,
    canUseCVReview: tier !== "free" || cvUsed < FREE_CV_LIMIT,
    isStandard: tier === "standard" || tier === "premium",
    isPremium: tier === "premium",
  };
}

export function recordMockInterviewUsed() {
  const used = parseInt(localStorage.getItem("mock-interviews-used") || "0");
  localStorage.setItem("mock-interviews-used", String(used + 1));
}

export function recordCVReviewUsed() {
  const used = parseInt(localStorage.getItem("cv-reviews-used") || "0");
  localStorage.setItem("cv-reviews-used", String(used + 1));
}

export const WHOP_STANDARD_LINK = "https://whop.com/cabin-crew-guidebook-through-interview/cabin-crew-interview-guidebook/"; // ← Replace
export const WHOP_PREMIUM_LINK = "https://whop.com/cabin-crew-guidebook-through-interview/premium-access-be-74b9";   // ← Replace
