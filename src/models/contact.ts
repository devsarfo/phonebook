import { Address } from "./address";
import { Email } from "./email";
import { Phone } from "./phone";

export interface Contact
{
  CustomValues?: any,
  InfoID?: Number,
  Comment?: string,
  CreatedBy?: string,
  Deleted?: boolean,
  CreatedAt?: string,
  UpdatedAt?: string,
  UpdatedBy?: string,
  ParentBusinessRelationID?: string,
  StatusCode?: string,
  ID?: Number,
  Info: {
    CustomValues?: any,
    DefaultBankAccountID?: string,
    DefaultContactID?: string,
    CreatedBy?: string,
    Name: string,
    Deleted?: boolean,
    ShippingAddressID?: string,
    CreatedAt?: string,
    UpdatedAt?: string,
    UpdatedBy?: string,
    StatusCode?: string,
    ID?: Number,
    DefaultEmailID?: Number,
    DefaultEmail: Email,
    Emails: Email[],
    DefaultPhoneID?: Number,
    DefaultPhone: Phone,
    Phones: Phone[],
    InvoiceAddressID?: Number,
    InvoiceAddress: Address,
    Addresses: Address[]
  }
}