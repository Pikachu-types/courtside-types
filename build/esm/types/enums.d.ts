export declare const collections: {
    readonly users: "users";
    readonly orgs: "orgs";
    readonly staffs: "staffs";
    readonly tenants: "tenants";
    readonly appointments: "appointments";
    readonly reservations: "reservations";
    readonly orgRequests: "orgRequests";
    readonly venues: "venues";
    readonly accounts: "accounts";
    readonly subscriptions: "subscriptions";
    readonly payments: "payments";
    readonly tickets: "tickets";
    readonly ledger: "balanceLedger";
    readonly transactions: "transactions";
    readonly payouts: "payouts";
    readonly config: "config";
    readonly customers: "customers";
    readonly inventoryCol: (org: string) => string;
    readonly categoryCol: (tenant: string) => string;
    readonly venueCol: (org: string) => string;
    readonly balanceLedgerCol: (org: string) => string;
    readonly categories: "categories";
    readonly services: "services";
    readonly terminals: "terminals";
    readonly inventory: "inventory";
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
    readonly staff: "staff";
};
export declare const staffRoles: {
    readonly processor: "Order processor";
    readonly cashier: "Transaction handler";
    readonly practitioner: "Service provider";
    readonly assistant: "Assistant";
    readonly manager: "Manager";
    readonly frontdesk: "Front desk";
};
export declare const staffStatus: {
    active: "active";
    inactive: "inactive";
    archived: "archived";
};
export declare const authProvider: {
    readonly email: "Email address";
    readonly google: "Social authenticator";
    readonly pasby: "pasby e-ID (National Identification Number)";
    readonly pasbyMail: "pasby and email authentication";
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
export declare const payoutType: {
    standard: "standard";
    instant: "instant";
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
export declare const appointmentStatus: {
    pending: "pending";
    cancelled: "cancelled";
    confirmed: "confirmed";
    checked_in: "checked_in";
    completed: "completed";
    no_show: "no_show";
};
export declare const appointmentSource: {
    online: "online";
    manual: "manual";
    walk_in: "walk_in";
};
export declare const appointmentChannel: {
    web: "web";
    mobile: "mobile";
    assistant: "assistant";
};
export declare const appointmentPaymentStatus: {
    paid: "paid";
    pending: "pending";
    refunded: "refunded";
    unpaid: "unpaid";
    authorized: "authorized";
};
export type ProductType = keyof typeof products;
export type PaymentLogicType = keyof typeof paymentLogicType;
export type PayoutType = keyof typeof payoutType;
export type PaymentStatus = keyof typeof paymentStatus;
export type TransactionType = keyof typeof transactionType;
export type BillingPlans = keyof typeof plans;
export type BusinessType = keyof typeof businessType;
export type PricingPlanType = keyof typeof pricingPlans;
export type DashboardRoles = keyof typeof roles;
export type ChargeTarget = keyof typeof chargesDestination;
export type StaffRoles = keyof typeof staffRoles;
export type StaffStatus = keyof typeof staffStatus;
export type EnvironmentType = keyof typeof environmentType;
export type AuthenticationProvider = keyof typeof authProvider;
export type AppointmentStatus = keyof typeof appointmentStatus;
export type AppointmentSource = keyof typeof appointmentSource;
export type AppointmentPaymentStatus = keyof typeof appointmentPaymentStatus;
export type AppointmentChannel = keyof typeof appointmentChannel;
