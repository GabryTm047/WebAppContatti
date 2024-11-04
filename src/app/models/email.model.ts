import { contact } from "./contact.model";
import { emailTypology } from "./emailTypology.model";

export interface email{
    EmailId: number;
    Value: string;
    EmailTypology: emailTypology;
    EmailTypologyId: number;
    Contact: contact;
    ContactId: number;
}