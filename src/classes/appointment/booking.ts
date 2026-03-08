import { DocumentSchema, Service } from "../..";

export type Booking = {
  tenant: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  services: Array<{
    id: string;
    service: Service;
    pricingOptionIndex: number;
    quantity: number;
  }>;
  bookingDetails: {
    date: string;
    time: string;
  };
  amount: number;
  reservationAmount: number; // Amount that was reserved/paid
  paymentMethod: 'online' | 'on_arrival';
  status: 'pending_payment' | 'confirmed' | 'payment_cancelled' | 'cancelled';
  trxID: string; // payment reference
} & DocumentSchema;