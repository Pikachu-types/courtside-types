import { CourtSidePermission, DocumentSchema } from "../..";
import { Model } from "../model";

export interface Branding {
  logo?: string | null;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  favicon?: string;
}

export type Club = {
  name: string;
  createdBy?: string;
  description?: string;
  location?: string;
  isActive: boolean;
  requiresApproval?: boolean;
  branding?: Branding;
} & DocumentSchema;

export type ClubRequests = {
  club: string;
  uid: string;
  status: 'pending' | 'approved' | 'rejected';
} & DocumentSchema;

export type ClubMember = {
  uid: string;
  club: string;
  isActive: boolean;
  player: boolean;
  permissions: CourtSidePermission[];
} & DocumentSchema;

export class ClubModel extends Model<Club> { }