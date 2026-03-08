"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModel = void 0;
const model_1 = require("../model");
class TenantModel extends model_1.Model {
    /**
      * Check if tenant is in trial period
      * Note: Trial status is now managed by Stripe
      */
    isInTrial() {
        return this.data.status === 'trial';
    }
    /**
     * Check if tenant is active (not suspended or cancelled)
     */
    isActive() {
        return this.data.status === 'active' || this.isInTrial();
    }
    /**
     * Get tenant's display name
     */
    getDisplayName() {
        return this.data.name;
    }
    /**
     * Get tenant's branding configuration
     */
    getBranding() {
        return this.data.branding;
    }
    /**
     * Update tenant's branding
     */
    updateBranding(branding) {
        this.data.branding = Object.assign(Object.assign({}, this.data.branding), branding);
        this.data.updatedAt = Date.now();
    }
    /**
     * Get tenant's settings
     */
    getSettings() {
        return this.data.settings;
    }
    /**
     * Update tenant's settings
     */
    updateSettings(settings) {
        this.data.settings = Object.assign(Object.assign({}, this.data.settings), settings);
        this.data.updatedAt = Date.now();
    }
    /**
     * Get tenant's billing information
     */
    getBilling() {
        return this.data.billing;
    }
    /**
     * Update tenant's billing information
     */
    updateBilling(billing) {
        this.data.billing = Object.assign(Object.assign({}, this.data.billing), billing);
        this.data.updatedAt = Date.now();
    }
    /**
     * Check if tenant can add more members
     */
    canAddMember() {
        const memberCount = Object.entries(this.data.members).length;
        return memberCount < this.data.settings.limits.members;
    }
    /**
     * Get tenant's plan limits
     */
    getLimits() {
        return this.data.settings.limits;
    }
    /**
     * Get tenant's custom domains
     */
    getCustomDomains() {
        var _a;
        return ((_a = this.data.configuration) === null || _a === void 0 ? void 0 : _a.domain) ? [this.data.configuration.domain] : [];
    }
    /**
     * Check if tenant can add more custom domains
     */
    canAddCustomDomain() {
        const customDomains = this.getCustomDomains();
        return customDomains.length < this.data.settings.limits.customDomains;
    }
    userRole(uid) {
        return this.schema.members[uid].role;
    }
}
exports.TenantModel = TenantModel;
//# sourceMappingURL=index.js.map