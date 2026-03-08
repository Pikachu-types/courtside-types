import { BusinessType, DashboardRoles, DocumentSchema, EnvironmentType, PaymentLogicType, PricingPlanType, ProductType } from "../..";
import { Model } from "../model";
export interface TenantLimits {
    members: number;
    customDomains: number;
}
export interface TenantBilling {
    plan: PricingPlanType;
    customerId?: string;
    subscriptionId?: string;
    priceId?: string;
    domain?: EnvironmentType;
    trialEnds?: number;
}
export interface TenantSettings {
    features: string[];
    limits: TenantLimits;
    customDomain?: string;
    sslEnabled?: boolean;
    custom404?: string;
    customLanding?: string;
    emailTemplates?: {
        welcome?: string;
        invitation?: string;
        notification?: string;
    };
}
export interface TenantDomain extends DocumentSchema {
    tenantId: string;
    domain: string;
    sslEnabled: boolean;
    custom404?: string;
    customLanding?: string;
    verified: boolean;
    verificationToken?: string;
}
export interface TenantBranding {
    logo?: string | null;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    favicon?: string;
}
export type Tenant = {
    name: string;
    email: string;
    slug: string;
    branding?: TenantBranding;
    settings: TenantSettings;
    billing?: TenantBilling;
    status: 'active' | 'trial' | 'suspended' | 'cancelled';
    owner: string;
    product: ProductType;
    domain: EnvironmentType;
    appointments?: {
        services?: string[];
        location?: [string, string, string];
        about?: string;
        hours?: {
            [day: string]: Array<{
                open: string;
                close: string;
            }>;
        };
        reservationLogic?: {
            amount: number;
            type: PaymentLogicType;
        };
        gallery?: {
            url: string;
            position: number;
        }[];
    };
    configuration?: {
        domain: string;
        verified: boolean;
    } | null;
    members: {
        [key: string]: {
            role: DashboardRoles;
            uid: string;
        };
    };
    incorporationStatus: BusinessType;
    salesActive?: boolean;
    incorporation?: {
        legal: string;
        identifier: string;
        vat?: string;
    } | null;
} & DocumentSchema;
export declare class TenantModel extends Model<Tenant> {
    /**
      * Check if tenant is in trial period
      * Note: Trial status is now managed by Stripe
      */
    isInTrial(): boolean;
    /**
     * Check if tenant is active (not suspended or cancelled)
     */
    isActive(): boolean;
    /**
     * Get tenant's display name
     */
    getDisplayName(): string;
    /**
     * Get tenant's branding configuration
     */
    getBranding(): TenantBranding | undefined;
    /**
     * Update tenant's branding
     */
    updateBranding(branding: Partial<TenantBranding>): void;
    /**
     * Get tenant's settings
     */
    getSettings(): TenantSettings;
    /**
     * Update tenant's settings
     */
    updateSettings(settings: Partial<TenantSettings>): void;
    /**
     * Get tenant's billing information
     */
    getBilling(): TenantBilling | undefined;
    /**
     * Update tenant's billing information
     */
    updateBilling(billing: Partial<TenantBilling>): void;
    /**
     * Check if tenant can add more members
     */
    canAddMember(): boolean;
    /**
     * Get tenant's plan limits
     */
    getLimits(): Tenant['settings']['limits'];
    /**
     * Get tenant's custom domains
     */
    getCustomDomains(): string[];
    /**
     * Check if tenant can add more custom domains
     */
    canAddCustomDomain(): boolean;
    userRole(uid: string): DashboardRoles | undefined;
}
