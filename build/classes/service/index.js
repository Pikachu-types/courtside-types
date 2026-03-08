"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const crypto_1 = require("crypto");
const system_1 = require("../../utils/system");
const model_1 = require("../model");
class ServiceModel extends model_1.Model {
    static generate(name, categoryId, tenantId, creator, options) {
        var _a, _b, _c;
        const pricingOptions = (_a = options === null || options === void 0 ? void 0 : options.pricingOptions) !== null && _a !== void 0 ? _a : [
            {
                duration: 30,
                id: (0, crypto_1.randomUUID)(),
                priceType: 'fixed',
                price: 0,
                currency: 'NGN',
                availableFor: (_b = options === null || options === void 0 ? void 0 : options.availableFor) !== null && _b !== void 0 ? _b : 'all',
            },
        ];
        // If availableFor is provided in options, ensure it's applied to pricing options that don't have it
        if (options === null || options === void 0 ? void 0 : options.availableFor) {
            pricingOptions.forEach(opt => {
                if (!opt.availableFor) {
                    opt.availableFor = options.availableFor;
                }
            });
        }
        return ServiceModel.fromJson({
            id: `service_${(0, system_1.createSlug)(name)}_${(0, system_1.unixTimeStampNow)()}`,
            name,
            categoryId,
            tenantId,
            createdBy: creator,
            description: options === null || options === void 0 ? void 0 : options.description,
            onlineBookingEnabled: (_c = options === null || options === void 0 ? void 0 : options.onlineBookingEnabled) !== null && _c !== void 0 ? _c : true,
            pricingOptions,
            notificationSettings: options === null || options === void 0 ? void 0 : options.notificationSettings,
            salesSettings: options === null || options === void 0 ? void 0 : options.salesSettings,
            iat: (0, system_1.unixTimeStampNow)(),
            updatedAt: (0, system_1.unixTimeStampNow)(),
        });
    }
    /**
     * Get the primary pricing option (first one)
     */
    getPrimaryPricing() {
        return this.schema.pricingOptions[0];
    }
    /**
     * Check if service has online booking enabled
     */
    isOnlineBookingEnabled() {
        return this.schema.onlineBookingEnabled;
    }
    getFormattedAvailability(optionIndex = 0) {
        var _a, _b;
        const pricingOption = this.schema.pricingOptions[optionIndex];
        const option = (_b = (_a = pricingOption === null || pricingOption === void 0 ? void 0 : pricingOption.availableFor) !== null && _a !== void 0 ? _a : this.schema.availableFor) !== null && _b !== void 0 ? _b : 'all';
        switch (option) {
            case 'all': {
                return 'All genders';
            }
            case 'female':
                return 'Female only';
            case 'kids':
                return 'Children only';
            case 'male':
                return 'Male only';
            default:
                return 'Not specified';
        }
    }
    /**
     * Get formatted price for display
     */
    getFormattedPrice(optionIndex = 0) {
        var _a;
        const option = this.schema.pricingOptions[optionIndex];
        if (!option)
            return 'N/A';
        if (option.priceType === 'free') {
            return 'Free';
        }
        const currency = option.currency || 'NGN';
        const price = (_a = option.price) !== null && _a !== void 0 ? _a : 0;
        const formattedPrice = currency === 'NGN'
            ? `₦${price.toLocaleString()}`
            : `${currency} ${price.toLocaleString()}`;
        if (option.priceType === 'from') {
            return `From ${formattedPrice}`;
        }
        return formattedPrice;
    }
}
exports.ServiceModel = ServiceModel;
//# sourceMappingURL=index.js.map