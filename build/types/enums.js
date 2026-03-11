"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.permissions = exports.paymentLogicType = exports.products = exports.pricingPlans = exports.chargesDestination = exports.environmentType = exports.transactionType = exports.paymentStatus = exports.businessType = exports.authProvider = exports.staffStatus = exports.roles = exports.plans = exports.collections = void 0;
exports.collections = {
    users: "users",
    clubs: "clubs",
    members: "members",
    joinRequests: "joinRequests",
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
};
exports.staffStatus = strEnum(['active', 'inactive', 'archived']);
exports.authProvider = {
    email: "Email address",
    google: "Social authenticator",
    apple: "Apple social authenticator",
    pasby: "pasby e-ID (National Identification Number)",
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
exports.pricingPlans = strEnum(['starter', 'professional']);
exports.products = strEnum(['appointments', 'hotels']);
exports.paymentLogicType = strEnum(['percentage', 'fixed']);
exports.permissions = strEnum(['coach', 'admin']);
exports.status = strEnum(['pending', 'rejected', 'accepted']);
function strEnum(o) {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
//# sourceMappingURL=enums.js.map