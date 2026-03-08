"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentPaymentStatus = exports.appointmentChannel = exports.appointmentSource = exports.appointmentStatus = exports.paymentLogicType = exports.products = exports.pricingPlans = exports.payoutType = exports.chargesDestination = exports.environmentType = exports.transactionType = exports.paymentStatus = exports.businessType = exports.authProvider = exports.staffStatus = exports.staffRoles = exports.roles = exports.plans = exports.collections = void 0;
exports.collections = {
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
    inventoryCol: (org) => `orgs/${org}/inventory`,
    categoryCol: (tenant) => `tenants/${tenant}/categories`,
    venueCol: (org) => `orgs/${org}/venues`,
    balanceLedgerCol: (org) => `orgs/${org}/balanceLedger`,
    categories: "categories",
    services: "services",
    terminals: "terminals",
    inventory: "inventory", // sub document
};
exports.plans = {
    basic: "basic",
    scale: "scale",
};
exports.roles = {
    owner: "owner",
    admin: "admin",
    supervisor: "supervisor",
    viewer: "viewer",
    staff: "staff",
};
exports.staffRoles = {
    processor: "Order processor",
    cashier: "Transaction handler",
    practitioner: "Service provider",
    assistant: "Assistant",
    manager: "Manager",
    frontdesk: "Front desk",
};
exports.staffStatus = strEnum(['active', 'inactive', 'archived']);
exports.authProvider = {
    email: "Email address",
    google: "Social authenticator",
    pasby: "pasby e-ID (National Identification Number)",
    pasbyMail: "pasby and email authentication",
    custom: "Wildcard verifiable authenticator",
};
exports.businessType = {
    llc: "Limited company",
    sole: "Sole trader",
};
exports.paymentStatus = strEnum(['paid', 'pending', 'failed', 'refunded', 'cancelled']);
exports.transactionType = strEnum(['credit', 'debit', 'ticketing']);
exports.environmentType = strEnum(['live', 'test']);
exports.chargesDestination = strEnum(['self', 'customer']);
exports.payoutType = strEnum(['standard', 'instant']);
exports.pricingPlans = strEnum(['starter', 'professional']);
exports.products = strEnum(['appointments', 'hotels']);
exports.paymentLogicType = strEnum(['percentage', 'fixed']);
exports.appointmentStatus = strEnum(['pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show']);
exports.appointmentSource = strEnum(['online', 'manual', 'walk_in']);
exports.appointmentChannel = strEnum(['web', 'mobile', 'assistant']);
exports.appointmentPaymentStatus = strEnum(['unpaid', 'pending', 'authorized', 'paid', 'refunded']);
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
//# sourceMappingURL=enums.js.map