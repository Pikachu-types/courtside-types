export const collections = {
  users: "users",
  orgs: "orgs",
  staffs: "staffs",
  tenants: "tenants",
  appointments: "appointments",
  reservations: "reservations",
  orgRequests: "orgRequests",
  venues: "venues", // sub document
  accounts: "accounts", // sub document
  subscriptions: "subscriptions",
  payments: "payments",
  tickets: "tickets",
  ledger: "balanceLedger", // sub document
  transactions: "transactions",
  payouts: "payouts",
  config: "config",
  customers: "customers",
  inventoryCol: (org: string) => `orgs/${org}/inventory`,
  categoryCol: (tenant: string) => `tenants/${tenant}/categories`,
  venueCol: (org: string) => `orgs/${org}/venues`,
  balanceLedgerCol: (org: string) => `orgs/${org}/balanceLedger`,
  categories: "categories",
  services: "services",
  terminals: "terminals",
  inventory: "inventory", // sub document
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
  staff: "staff",
} as const;

export const staffRoles = {
  processor: "Order processor",
  cashier: "Transaction handler",
  practitioner: "Service provider",
  assistant: "Assistant",
  manager: "Manager",
  frontdesk: "Front desk",
} as const;

export const staffStatus = strEnum(['active', 'inactive', 'archived']);

export const authProvider = {
  email: "Email address",
  google: "Social authenticator",
  pasby: "pasby e-ID (National Identification Number)",
  pasbyMail: "pasby and email authentication",
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
export const payoutType = strEnum(['standard', 'instant']);
export const pricingPlans = strEnum(['starter', 'professional']);
export const products = strEnum(['appointments', 'hotels']);
export const paymentLogicType = strEnum(['percentage', 'fixed']);
export const appointmentStatus = strEnum(['pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show']);
export const appointmentSource = strEnum(['online', 'manual', 'walk_in']);
export const appointmentChannel = strEnum(['web', 'mobile', 'assistant']);
export const appointmentPaymentStatus = strEnum(['unpaid', 'pending', 'authorized', 'paid', 'refunded']);


export type ProductType = keyof typeof products;
export type PaymentLogicType = keyof typeof paymentLogicType;
export type PayoutType = keyof typeof payoutType;
export type PaymentStatus = keyof typeof paymentStatus;
export type TransactionType = keyof typeof transactionType;
export type BillingPlans = keyof typeof plans;
export type BusinessType = keyof typeof businessType;
export type PricingPlanType = keyof typeof pricingPlans;
export type DashboardRoles = keyof typeof roles;
export type ChargeTarget= keyof typeof chargesDestination;
export type StaffRoles = keyof typeof staffRoles;
export type StaffStatus = keyof typeof staffStatus;
export type EnvironmentType = keyof typeof environmentType;
export type AuthenticationProvider = keyof typeof authProvider;
export type AppointmentStatus = keyof typeof appointmentStatus;
export type AppointmentSource = keyof typeof appointmentSource;
export type AppointmentPaymentStatus = keyof typeof appointmentPaymentStatus;
export type AppointmentChannel = keyof typeof appointmentChannel;


function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}