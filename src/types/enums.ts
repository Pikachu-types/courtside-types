export const collections = {
  users: "users",
  clubs: "clubs",
  members: "members",
  joinRequests: "joinRequests",
} as const;

export const plans = {
  basic: "basic",
  scale: "scale",
} as const;


export const roles = {
  owner: "owner",
  admin: "admin",
  supervisor: "supervisor",
  viewer: "viewer",
} as const;

export const staffStatus = strEnum(['active', 'inactive', 'archived']);

export const authProvider = {
  email: "Email address",
  google: "Social authenticator",
  apple: "Apple social authenticator",
  pasby: "pasby e-ID (National Identification Number)",
  custom: "Wildcard verifiable authenticator",
} as const;

export const businessType = {
  llc: "Limited company",
  sole: "Sole trader",
} as const;

export const paymentStatus = strEnum(['paid', 'pending', 'failed', 'refunded', 'cancelled']);
export const transactionType = strEnum(['credit', 'debit', 'ticketing']);
export const environmentType = strEnum(['live', 'test']);
export const chargesDestination = strEnum(['self', 'customer']);
export const pricingPlans = strEnum(['starter', 'professional']);
export const products = strEnum(['appointments', 'hotels']);
export const paymentLogicType = strEnum(['percentage', 'fixed']);
export const permissions = strEnum(['coach', 'admin']);
export const status = strEnum(['pending', 'rejected', 'accepted']);


export type ProductType = keyof typeof products;
export type CourtSidePermission = keyof typeof permissions;
export type PaymentLogicType = keyof typeof paymentLogicType;
export type PaymentStatus = keyof typeof paymentStatus;
export type TransactionType = keyof typeof transactionType;
export type BillingPlans = keyof typeof plans;
export type BusinessType = keyof typeof businessType;
export type PricingPlanType = keyof typeof pricingPlans;
export type DashboardRoles = keyof typeof roles;
export type ChargeTarget= keyof typeof chargesDestination;
export type EnvironmentType = keyof typeof environmentType;
export type AuthenticationProvider = keyof typeof authProvider;


function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}