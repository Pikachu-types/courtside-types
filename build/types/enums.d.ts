export declare const collections: {
    readonly users: "users";
    readonly clubs: "clubs";
    readonly members: "members";
    readonly joinRequests: "joinRequests";
};
export declare const plans: {
    readonly basic: "basic";
    readonly scale: "scale";
};
export declare const roles: {
    readonly owner: "owner";
    readonly admin: "admin";
    readonly supervisor: "supervisor";
    readonly viewer: "viewer";
};
export declare const staffStatus: {
    active: "active";
    inactive: "inactive";
    archived: "archived";
};
export declare const authProvider: {
    readonly email: "Email address";
    readonly google: "Social authenticator";
    readonly apple: "Apple social authenticator";
    readonly pasby: "pasby e-ID (National Identification Number)";
    readonly custom: "Wildcard verifiable authenticator";
};
export declare const businessType: {
    readonly llc: "Limited company";
    readonly sole: "Sole trader";
};
export declare const paymentStatus: {
    paid: "paid";
    pending: "pending";
    failed: "failed";
    refunded: "refunded";
    cancelled: "cancelled";
};
export declare const transactionType: {
    credit: "credit";
    debit: "debit";
    ticketing: "ticketing";
};
export declare const environmentType: {
    live: "live";
    test: "test";
};
export declare const chargesDestination: {
    self: "self";
    customer: "customer";
};
export declare const pricingPlans: {
    starter: "starter";
    professional: "professional";
};
export declare const products: {
    appointments: "appointments";
    hotels: "hotels";
};
export declare const paymentLogicType: {
    percentage: "percentage";
    fixed: "fixed";
};
export declare const permissions: {
    admin: "admin";
    coach: "coach";
};
export declare const status: {
    pending: "pending";
    rejected: "rejected";
    accepted: "accepted";
};
export type ProductType = keyof typeof products;
export type CourtSidePermission = keyof typeof permissions;
export type PaymentLogicType = keyof typeof paymentLogicType;
export type PaymentStatus = keyof typeof paymentStatus;
export type TransactionType = keyof typeof transactionType;
export type BillingPlans = keyof typeof plans;
export type BusinessType = keyof typeof businessType;
export type PricingPlanType = keyof typeof pricingPlans;
export type DashboardRoles = keyof typeof roles;
export type ChargeTarget = keyof typeof chargesDestination;
export type EnvironmentType = keyof typeof environmentType;
export type AuthenticationProvider = keyof typeof authProvider;
