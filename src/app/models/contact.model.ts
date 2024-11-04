import { email } from "./email.model";
import { extraInfo } from "./extraInfo.model";
import { phone } from "./phone.model";

export interface contact {
    ContactId?: number;
    Name: string;
    Surname: string;
    Age: number;
    Phones: Array<phone>;
    Emails: Array<email>;
    ExtraInfo?: extraInfo;
    ExtraInfoId: number;
}