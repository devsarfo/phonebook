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

    public static async get(params: any)
    {   
        const skip = params?.skip ?? 0;
        const uri = "biz/contacts?orderBy=Info.Name%20ASC&expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10&skip="+skip;
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
