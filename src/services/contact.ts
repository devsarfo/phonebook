import { Contact } from "@/models/contact";
import axios from 'axios';
import AuthService from "./auth";

export default class ContactService {

    public static async create(contact: Contact) : Promise<any>
    {   
        let data;

        const uri = "biz/contacts";
        const result = await axios.post(import.meta.env.VITE_BASE_URL + uri, contact, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).then((response) => {
            data = { error: false, response: response?.data };
        }).catch((error) => {
            data = { error: true, response: error.response.data };            
        });
        
        return data;
    }

    public static async update(contact: Contact) : Promise<any>
    {   
        let data;
        
        const uri = "biz/contacts/"+contact.ID
        const result = await axios.put(import.meta.env.VITE_BASE_URL + uri, contact, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).then((response) => {
            data = { error: false, response: response?.data };
        }).catch((error) => {
            data = { error: true, response: error.response.data };            
        });
        
        return data;
    }
    
    public static async delete(id: String) : Promise<any>
    {   
        let data;

        const uri = "biz/contacts/"+id;
        const result = await axios.delete(import.meta.env.VITE_BASE_URL + uri, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).then((response) => {
            data = { error: false, response: response?.data };
        }).catch((error) => {
            data = { error: true, response: error.response.data };            
        });
        
        return data;
    }

    public static async get(id: string)
    {   
        const uri = "biz/contacts/"+ id +"?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress,Info.Phones,Info.Emails,Info.Addresses&hateoas=false";
        const result = await axios.get(import.meta.env.VITE_BASE_URL + uri, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).catch((error) => {
            console.log(error.toJSON());
        });
        
        return result?.data;
    }

    public static async getAll(params: any)
    {   
        const skip = params?.skip ?? 0;
        const orderBy = encodeURI(params?.orderBy ?? 'Info.Name ASC');
        
        const uri = "biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress,Info.Phones,Info.Emails,Info.Addresses&hateoas=false&top=10&skip="+skip+"&orderBy="+orderBy;
        const result = await axios.get(import.meta.env.VITE_BASE_URL + uri, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).catch((error) => {
            console.log(error.toJSON());
        });
        
        return result?.data;
    }

    public static async count()
    {   
        const uri = "statistics?model=Contact";
        const result = await axios.get(import.meta.env.VITE_BASE_URL + uri, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ await AuthService.token()
            }
        }).catch((error) => {
            console.log(error.toJSON());
        });
                
        return result?.data.Data[0].countid ?? 0;
    }
}
