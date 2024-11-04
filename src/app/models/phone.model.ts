import { contact } from "./contact.model";
import { phoneTypology } from "./phoneTypology.model";

export interface phone{
    PhoneId: number;
    Value: string;
    PhoneTypology: phoneTypology
    PhoneTypologyId: number;
    Contact: contact;
    ContactId: number;
}