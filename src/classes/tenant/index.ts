import { BusinessType, DashboardRoles, DocumentSchema, EnvironmentType, PaymentLogicType, PricingPlanType, ProductType } from "../..";
import { Model } from "../model";

export interface TenantLimits {
  members: number;
  customDomains: number;
}

export interface TenantBilling {
  plan: PricingPlanType;
  customerId?: string; // Stripe customer ID
  subscriptionId?: string; // Stripe subscription ID
  priceId?: string; // Stripe price ID
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
  email: string; // for billing
  slug: string; // URL-friendly identifier
  // Branding & Customization
  branding?: TenantBranding;

  // Settings & Configuration
  settings: TenantSettings;

  // Billing Information
  billing?: TenantBilling;

  // Status & Metadata
  status: 'active' | 'trial' | 'suspended' | 'cancelled';

  // Owner Information
  owner: string; // User ID of the tenant owner

  product: ProductType;

  domain: EnvironmentType;

  appointments?: {
    services?: string[];
    location?: [string, string, string];
    about?: string;
    hours?: {
      [day: string]: Array<{
        open: string;   // "09:00"
        close: string;  // "18:00"
      }>;
    };
    reservationLogic?: {
      amount: number;
      type: PaymentLogicType
    },
    gallery?: {url: string, position: number}[]
  };

  configuration?: {
    domain: string;
    verified: boolean;
  } | null;

  members: {
    [key: string]: {
      role: DashboardRoles;
      uid: string;
    },
  };

  incorporationStatus: BusinessType;

  salesActive?: boolean;

  incorporation?: {
    legal: string;
    identifier: string;
    vat?: string;
  } | null;

} & DocumentSchema;

export class TenantModel extends Model<Tenant> {
  /**
    * Check if tenant is in trial period
    * Note: Trial status is now managed by Stripe
    */
  public isInTrial(): boolean {
    return this.data.status === 'trial';
  }

  /**
   * Check if tenant is active (not suspended or cancelled)
   */
  public isActive(): boolean {
    return this.data.status === 'active' || this.isInTrial();
  }

  /**
   * Get tenant's display name
   */
  public getDisplayName(): string {
    return this.data.name;
  }

  /**
   * Get tenant's branding configuration
   */
  public getBranding(): TenantBranding | undefined {
    return this.data.branding;
  }

  /**
   * Update tenant's branding
   */
  public updateBranding(branding: Partial<TenantBranding>): void {
    this.data.branding = { ...this.data.branding, ...branding } as TenantBranding;
    this.data.updatedAt = Date.now();
  }

  /**
   * Get tenant's settings
   */
  public getSettings(): TenantSettings {
    return this.data.settings;
  }

  /**
   * Update tenant's settings
   */
  public updateSettings(settings: Partial<TenantSettings>): void {
    this.data.settings = { ...this.data.settings, ...settings };
    this.data.updatedAt = Date.now();
  }

  /**
   * Get tenant's billing information
   */
  public getBilling(): TenantBilling | undefined {
    return this.data.billing;
  }

  /**
   * Update tenant's billing information
   */
  public updateBilling(billing: Partial<TenantBilling>): void {
    this.data.billing = { ...this.data.billing, ...billing } as TenantBilling;
    this.data.updatedAt = Date.now();
  }

  /**
   * Check if tenant can add more members
   */
  public canAddMember(): boolean {
    const memberCount = Object.entries(this.data.members).length;
    return memberCount < this.data.settings.limits.members;
  }

  /**
   * Get tenant's plan limits
   */
  public getLimits(): Tenant['settings']['limits'] {
    return this.data.settings.limits;
  }

  /**
   * Get tenant's custom domains
   */
  public getCustomDomains(): string[] {
    return this.data.configuration?.domain ? [this.data.configuration.domain] : [];
  }

  /**
   * Check if tenant can add more custom domains
   */
  public canAddCustomDomain(): boolean {
    const customDomains = this.getCustomDomains();
    return customDomains.length < this.data.settings.limits.customDomains;
  }

  public userRole(uid: string): DashboardRoles | undefined {
    return this.schema.members[uid].role;
  }
}
