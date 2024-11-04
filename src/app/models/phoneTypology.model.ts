import { contact } from "./contact.model"
import { phone } from "./phone.model";

export interface phoneTypology
{
    PhoneTypologyId: number;
    PhoneTypologyName: string;
    Phones: Array<phone>
}