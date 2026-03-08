import {
  AppointmentChannel,
  AppointmentPaymentStatus,
  AppointmentSource,
  AppointmentStatus,
  DocumentSchema,
  PaymentLogicType,
  PriceType,
} from "../..";
import { unixTimeStampNow } from "../../utils/system";
import { Model } from "../model";

export type AppointmentCustomer = {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export type AppointmentSchedule = {
  date: string; // YYYY-MM-DD
  start: string; // HH:mm (24h)
  end: string; // HH:mm (24h)
  timezone: string;
};

export type AppointmentServiceSnapshot = {
  serviceId: string;
  serviceName: string;
  categoryId?: string;
  duration: string; // referencing pricing option ID
  priceType: PriceType;
  currency: string;
  price?: number;
};

export type AppointmentStaffAssignment = {
  staffId: string;
  role: 'primary' | 'assistant';
  assignedAt: number;
  confirmed: boolean;
};

export type AppointmentTimelineEntry = {
  type: 'status_change' | 'note' | 'assignment' | 'reminder';
  at: number;
  actorId?: string;
  payload?: Record<string, unknown>;
};

export type AppointmentTotals = {
  subtotal: number;
  tax?: number;
  paid?: number;
  discount?: number;
  grandTotal: number;
  currency: string;
};

export type Appointment = {
  tenantId: string;
  reservation?: string | undefined;
  customer: AppointmentCustomer;
  schedule: AppointmentSchedule;
  service: AppointmentServiceSnapshot;
  notes?: string;
  status: AppointmentStatus;
  paymentStatus: AppointmentPaymentStatus;
  channel: AppointmentChannel;
  source: AppointmentSource;
  totals: AppointmentTotals;
  assignments: AppointmentStaffAssignment[];
  timeline?: AppointmentTimelineEntry[];
  metadata?: Record<string, unknown>;
} & DocumentSchema;

export class AppointmentModel extends Model<Appointment> {
  public static create(
    tenantId: string,
    customer: AppointmentCustomer,
    schedule: AppointmentSchedule,
    service: AppointmentServiceSnapshot,
    totals: AppointmentTotals,
    options?: {
      source?: AppointmentSource;
      channel?: AppointmentChannel;
      status?: AppointmentStatus;
      paymentStatus?: AppointmentPaymentStatus;
      notes?: string;
      assignments?: AppointmentStaffAssignment[];
      metadata?: Record<string, unknown>;
    }
  ): AppointmentModel {
    const now = unixTimeStampNow();
    return AppointmentModel.fromJson({
      id: `apt_${service.serviceId}_${now}`,
      tenantId,
      customer,
      schedule,
      service,
      totals,
      notes: options?.notes,
      status: options?.status ?? 'pending',
      paymentStatus: options?.paymentStatus ?? 'unpaid',
      channel: options?.channel ?? 'web',
      source: options?.source ?? 'online',
      assignments: options?.assignments ?? [],
      metadata: options?.metadata,
      timeline: [
        {
          type: 'status_change',
          at: now,
          payload: { status: options?.status ?? 'pending' },
        },
      ],
      iat: now,
      updatedAt: now,
    });
  }

  addTimelineEntry(entry: AppointmentTimelineEntry) {
    if (!this.schema.timeline) {
      this.schema.timeline = [];
    }
    this.schema.timeline.push(entry);
    this.schema.updatedAt = unixTimeStampNow();
  }

  static reservationAmount(logic: PaymentLogicType, checkout: number) {
    if (logic === 'fixed') {
      
    }
  }
}

