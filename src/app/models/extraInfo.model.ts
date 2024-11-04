import { contact } from "./contact.model";

export interface extraInfo{
    ExtraInfoId: number;
    EmergencyContactName: string;
    EmergencyContacPhone: string;
    Contact: contact;
    ContactId: number;
}