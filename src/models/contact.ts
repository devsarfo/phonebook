export interface Contact
{
    info: {
        name: string,
        invoiceAddress: {
            addressLine1: string,
            addressLine2: string,
            city: string,
            country: string,
            countryCode: string,
            postalCode: string,
        },
        defaultPhone: {
            countryCode: string,
            country: string,
            number: string,
            description: string,
        },
        defaultEmail: {
            emailAddress: string
        },
    }
    comment: string
};

