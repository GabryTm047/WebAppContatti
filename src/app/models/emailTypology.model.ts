import { email } from "./email.model";

export interface emailTypology{
    EmailTypologyId: number;
    EmailTypologyName: string;
    Emails: Array<email>;
}