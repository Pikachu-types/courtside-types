import { randomUUID } from "crypto";
import { DocumentSchema, normalize } from "../..";
import { createSlug, unixTimeStampNow } from "../../utils/system";
import { Model } from "../model";

export type PriceType = 'free' | 'fixed' | 'from';

export type PricingOption = {
  id: string;
  duration: number; // in minutes
  priceType: PriceType;
  price?: number; // required if priceType is 'fixed' or 'from'
  currency?: string; // e.g., 'NGN', 'SEK'
  availableFor?: ServiceAvailability;
};

export type ServiceNotificationSettings = {
  rebookReminder?: {
    enabled: boolean;
    when: number; // number of units
    duration: 'days' | 'weeks' | 'months'; // unit type
  };
};

export type ServiceSalesSettings = {
  taxRate?: number; // percentage, e.g., 7.5 for 7.5%
  taxIncluded?: boolean; // whether tax is included in the price
};

export type ServiceAvailability = 'all' | 'male' | 'female' | 'kids';

export type Service = {
  name: string;
  categoryId: string; // reference to category
  description?: string;
  tenantId: string; // reference to tenant
  onlineBookingEnabled: boolean;
  /** @deprecated use pricingOptions[].availableFor */
  availableFor?: ServiceAvailability;
  pricingOptions: PricingOption[];
  notificationSettings?: ServiceNotificationSettings;
  salesSettings?: ServiceSalesSettings;
  createdBy?: string;
} & DocumentSchema;

export class ServiceModel extends Model<Service> {
  public static generate(
    name: string,
    categoryId: string,
    tenantId: string,
    creator: string,
    options?: {
      description?: string;
      onlineBookingEnabled?: boolean;
      availableFor?: ServiceAvailability;
      pricingOptions?: PricingOption[];
      notificationSettings?: ServiceNotificationSettings;
      salesSettings?: ServiceSalesSettings;
    }
  ): ServiceModel {
    const pricingOptions = options?.pricingOptions ?? [
      {
        duration: 30,
        id: randomUUID(),
        priceType: 'fixed',
        price: 0,
        currency: 'NGN',
        availableFor: options?.availableFor ?? 'all',
      },
    ];

    // If availableFor is provided in options, ensure it's applied to pricing options that don't have it
    if (options?.availableFor) {
      pricingOptions.forEach(opt => {
        if (!opt.availableFor) {
          opt.availableFor = options.availableFor;
        }
      });
    }

    return ServiceModel.fromJson({
      id: `service_${createSlug(name)}_${unixTimeStampNow()}`,
      name,
      categoryId,
      tenantId,
      createdBy: creator,
      description: options?.description,
      onlineBookingEnabled: options?.onlineBookingEnabled ?? true,
      pricingOptions,
      notificationSettings: options?.notificationSettings,
      salesSettings: options?.salesSettings,
      iat: unixTimeStampNow(),
      updatedAt: unixTimeStampNow(),
    });
  }

  /**
   * Get the primary pricing option (first one)
   */
  getPrimaryPricing(): PricingOption | undefined {
    return this.schema.pricingOptions[0];
  }

  /**
   * Check if service has online booking enabled
   */
  isOnlineBookingEnabled(): boolean {
    return this.schema.onlineBookingEnabled;
  }

  getFormattedAvailability(optionIndex: number = 0) {
    const pricingOption = this.schema.pricingOptions[optionIndex];
    const option = pricingOption?.availableFor ?? this.schema.availableFor ?? 'all';

    switch (option) {
      case 'all': { 
        return 'All genders';
      }
      case 'female':
        return 'Female only';
      case 'kids': 
        return 'Children only'
      case 'male':
        return 'Male only';
      default:
        return 'Not specified'
    } 
  }

  /**
   * Get formatted price for display
   */
  getFormattedPrice(optionIndex: number = 0): string {
    const option = this.schema.pricingOptions[optionIndex];
    if (!option) return 'N/A';
    
    if (option.priceType === 'free') {
      return 'Free';
    }
    
    const currency = option.currency || 'NGN';
    const price = option.price ?? 0;
    
    const formattedPrice = currency === 'NGN'
      ? `₦${price.toLocaleString()}`
      : `${currency} ${price.toLocaleString()}`;

    if (option.priceType === 'from') {
      return `From ${formattedPrice}`;
    }

    return formattedPrice;
  }
}

