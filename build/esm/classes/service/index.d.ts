import { DocumentSchema } from "../..";
import { Model } from "../model";
export type PriceType = 'free' | 'fixed' | 'from';
export type PricingOption = {
    id: string;
    duration: number;
    priceType: PriceType;
    price?: number;
    currency?: string;
    availableFor?: ServiceAvailability;
};
export type ServiceNotificationSettings = {
    rebookReminder?: {
        enabled: boolean;
        when: number;
        duration: 'days' | 'weeks' | 'months';
    };
};
export type ServiceSalesSettings = {
    taxRate?: number;
    taxIncluded?: boolean;
};
export type ServiceAvailability = 'all' | 'male' | 'female' | 'kids';
export type Service = {
    name: string;
    categoryId: string;
    description?: string;
    tenantId: string;
    onlineBookingEnabled: boolean;
    /** @deprecated use pricingOptions[].availableFor */
    availableFor?: ServiceAvailability;
    pricingOptions: PricingOption[];
    notificationSettings?: ServiceNotificationSettings;
    salesSettings?: ServiceSalesSettings;
    createdBy?: string;
} & DocumentSchema;
export declare class ServiceModel extends Model<Service> {
    static generate(name: string, categoryId: string, tenantId: string, creator: string, options?: {
        description?: string;
        onlineBookingEnabled?: boolean;
        availableFor?: ServiceAvailability;
        pricingOptions?: PricingOption[];
        notificationSettings?: ServiceNotificationSettings;
        salesSettings?: ServiceSalesSettings;
    }): ServiceModel;
    /**
     * Get the primary pricing option (first one)
     */
    getPrimaryPricing(): PricingOption | undefined;
    /**
     * Check if service has online booking enabled
     */
    isOnlineBookingEnabled(): boolean;
    getFormattedAvailability(optionIndex?: number): "All genders" | "Female only" | "Children only" | "Male only" | "Not specified";
    /**
     * Get formatted price for display
     */
    getFormattedPrice(optionIndex?: number): string;
}
