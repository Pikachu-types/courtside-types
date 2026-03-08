export const BUSINESS_INDUSTRIES: { value: string; label: string }[] = [
  // Food & Hospitality
  { value: "restaurant", label: "Restaurant" },
  { value: "bar", label: "Bar" },
  { value: "cafe", label: "Café" },
  { value: "lounge", label: "Lounge" },
  { value: "hotel_kitchen", label: "Hotel Kitchen" },
  { value: "food_truck", label: "Food Truck" },
  { value: "bakery", label: "Bakery" },
  { value: "club", label: "Club" },
  { value: "catering_service", label: "Catering Service" },
  { value: "event_venue", label: "Event Venue" },
  { value: "fast_food", label: "Fast Food Outlet" },
  { value: "private_chef", label: "Private Chef Business" },
  { value: "kitchen_service", label: "Kitchen-as-a-Service" },
  { value: "franchise", label: "Franchise Food Brand" },
  { value: "juice_bar", label: "Juice or Smoothie Bar" },
  { value: "qsr", label: "QSR (Quick Service Restaurant)" },
  { value: "deli", label: "Deli" },
  { value: "hookah_lounge", label: "Hookah Lounge" },
  { value: "popup", label: "Pop-up Eatery" },

  // Retail & Trading Businesses
  { value: "supermarket", label: "Supermarket / Grocery" },
  { value: "minimart", label: "Mini Mart / Corner Store" },
  { value: "wholesale_shop", label: "Wholesale Shop" },
  { value: "pharmacy", label: "Pharmacy / Drugstore" },
  { value: "boutique", label: "Boutique / Fashion Store" },
  { value: "electronics_shop", label: "Electronics / Phone Store" },
  { value: "hardware_store", label: "Hardware / Building Materials" },
  { value: "market_vendor", label: "Market Stall / Vendor" },
  { value: "beverages_shop", label: "Beverage / Drinks Store" },
  { value: "butchery", label: "Butchery / Meat Shop" },
  { value: "fishery", label: "Fishery / Cold Room" },
  { value: "printing_shop", label: "Printing / Stationery Store" },
  { value: "auto_parts", label: "Auto Parts / Mechanic Shop" },
  { value: "pet_shop", label: "Pet Supplies Store" },

  // Services & Experiences
  { value: "salon", label: "Salon" },
  { value: "barbershop", label: "Barbershop" },
  { value: "spa", label: "Spa" },
  { value: "gym", label: "Gym" },
  { value: "laundry", label: "Laundry / Dry Cleaning" },
  { value: "repair_service", label: "Electronics / Repair Service" },
  { value: "photography_studio", label: "Photography / Studio" },
  { value: "tailoring", label: "Tailoring / Fashion Design" },
  { value: "cowork_space", label: "Co-working Space / Studio" },
  { value: "training_center", label: "Training / Skill Center" },

  // Miscellaneous
  { value: "bookshop", label: "Bookshop" },
  { value: "waste_management", label: "Waste management" },
  { value: "flower_shop", label: "Flower Shop" },
  { value: "rental_service", label: "Equipment / Party Rentals" },
  { value: "transport_service", label: "Transport / Logistics Service" },
  { value: "mobile_vendor", label: "Mobile Vendor / Street Seller" },
];


export interface Authorization {
  customer: {
    test?: string;
    live?: string;
  };
  map: {
    card_type: string;
    channel: string;
    brand: string;
    country_code: string;
    exp_month: string
    exp_year: string;
    last4: string;
    reusable: boolean
  },
  keep: string; // authorization code which we will encrypt
}

export type  DocumentSchema = {
  id: string; // Unique identifier
  // Metadata
  iat: Date | null | string | number;
  updatedAt?: Date | null | string | number; // Timestamp for last update
}

export type reactSelectOptionsType = {
  label: string;
  group: string;
  value: string;
}

export type OptionSchema = {
  label: string;
  options: {
    label: string;
    group?: string;
    value: string;
  }[];
};