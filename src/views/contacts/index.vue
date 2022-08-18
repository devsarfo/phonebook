<script setup lang="ts">
import { Contact } from '@/models/contact';
import ContactService from '@/services/contact';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const data = reactive<{loadingMore:boolean, loading: boolean, errors: any, contacts: any, count: number}>({
    loading: false,
    loadingMore: true,
    errors: [],
    contacts: [],
    count: 0
});

async function getContacts()
{   
    data.loading = true;
    data.contacts = await ContactService.getAll();

    if(data.contacts.length)
    {
        const count = await ContactService.count();
        if(data.contacts.length == count) data.loadingMore = true;
        else data.loadingMore = false;
    }

    data.loading = false;
}

async function loadMore()
{
    data.loadingMore = true;

    const contacts = await ContactService.getAll({skip: data.contacts.length});
    data.contacts.push(...contacts);
    
    const count = await ContactService.count();
    if(data.contacts.length != count) data.loadingMore = false;
}


function viewContact(contact: any)
{
    router.push({path: '/contact/' + contact.ID });
}

function editContact(contact: any)
{
    router.push({path: '/contact/' + contact.ID + "/edit" });
}

async function deleteContact(contact: any)
{
    const proceed = confirm("Delete from contacts?");
    if(proceed)
    {
        data.errors = [];
        const result = await ContactService.delete(contact.ID);
        
        if(!result.error)
        {
            data.contacts = data.contacts.filter((item: Contact) => item.ID !== contact.ID);
        }
        else
        {
            if(result.response.hasOwnProperty("ErrorsCount"))
            {
                result.response.Messages.forEach((message: any) => data.errors.push(message.Message));
            }

            alert(data.errors);
        }
    }
}

onMounted(() => getContacts());

</script>

<template>
    <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
            <thead class="border-b text-xs font-bold text-gray-500 uppercase">
                <tr>
                    <th scope="col" class="contact-list-item-th">
                        {{ $t('name') }}
                    </th>
                    <th scope="col" class="contact-list-item-th hidden md:table-cell">
                        {{ $t('phone') }}
                    </th>
                    <th scope="col" class="contact-list-item-th hidden md:table-cell">
                        {{ $t('email') }}
                    </th>
                    <th scope="col" class="contact-list-item-th hidden md:table-cell">
                        {{ $t('address') }}
                    </th>
                    <th scope="col" class="contact-list-item-th text-right">
                        <i class="fa fa-ellipsis-vertical"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="data.loading" v-for="item in 10" class="contact-list-item">
                    <td class="contact-list-item-td">
                        <div class="animate-pulse flex items-center space-x-4">
                            <div class="rounded-full bg-gray-200 h-10 w-10"></div>        
                            <div>
                                <div class="h-2 mb-2 bg-gray-200 w-64 rounded"></div>
                                <div class="h-2 mb-2 bg-gray-200 w-64 rounded"></div>
                            </div>
                        </div>
                        
                    </td>
                    <td class="contact-list-item-td hidden md:table-cell">
                        <div class="animate-pulse flex items-center space-x-4">
                            <div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                            </div>
                        </div>
                        
                    </td>
                    <td class="contact-list-item-td hidden md:table-cell">
                        <div class="animate-pulse flex items-center space-x-4">
                            <div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                            </div>
                        </div>
                        
                    </td>
                    <td class="contact-list-item-td hidden md:table-cell">
                        <div class="animate-pulse flex items-center space-x-4">
                            <div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                                <div class="h-2 mb-2 bg-gray-200 w-32 rounded"></div>
                            </div>
                        </div>
                        
                    </td>
                    <td></td>
                </tr>
                
                
                
                <tr v-if="!data.loading && data.contacts.length" v-for="contact in data.contacts" class="contact-list-item">
                    <th @click="viewContact(contact)" scope="row" class="flex items-center contact-list-item-td font-medium whitespace-nowrap">
                        <div class="bg-blue-600 inline-flex overflow-hidden justify-center items-center w-10 h-10 rounded-full mr-2">
                            <span class="font-medium text-white">
                                {{ contact.Info.Name.charAt(0) }}
                            </span>
                        </div>
                    
                        {{ contact.Info.Name }}
                    </th>
                    <td @click="viewContact(contact)" class="contact-list-item-td hidden md:table-cell">
                        <p v-for="phone in contact.Info.Phones" class="mb-2">
                            {{ "(" + phone.CountryCode + ") " + phone.Number }}
                        </p>
                    </td>
                    <td @click="viewContact(contact)" class="contact-list-item-td hidden md:table-cell">
                        <p v-for="email in contact.Info.Emails" class="mb-2">
                            {{ email.EmailAddress }}
                        </p>
                    </td>
                    <td @click="viewContact(contact)" class="contact-list-item-td hidden md:table-cell">
                        {{ 
                            (contact.Info.InvoiceAddress?.AddressLine1 + " " + 
                                contact.Info.InvoiceAddress?.AddressLine2 + " " + 
                                contact.Info.InvoiceAddress?.City + " " + 
                                contact.Info.InvoiceAddress?.PostalCode
                            ).trim()
                        }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <i @click="editContact(contact)" class="p-2 rounded-full shadow-md fa fa-pencil text-gray-600 hover:text-gray-800"></i>
                            <i @click="deleteContact(contact)" class="p-2 rounded-full shadow-md fa fa-trash text-red-600 hover:text-red-800"></i>
                        </div>
                    </td>
                </tr>

                <tr v-if="!data.loadingMore && data.contacts.length">
                    <td colspan="5" class="p-5 text-center" @click="loadMore()">
                        <div class="hover:bg-gray-200 font-medium hover:rounded-full p-4 cursor-pointer">
                            <i class="fa fa-download mr-2"></i>
                            {{ $t('loadMore') }}
                        </div>
                    </td>
                </tr>

                <tr v-if="!data.loading && !data.contacts.length" class="contact-list-item">
                    <th scope="row" class="flex text-gray-600 p-8 items-center contact-list-item-td font-medium whitespace-nowrap">
                        <i class="fa fa-address-book mr-3"></i>
                        {{ $t('noContactsFound') }}
                    </th>
                    
                    <td class="contact-list-item-td hidden md:table-cell"></td>
                    <td class="contact-list-item-td hidden md:table-cell"></td>
                    <td class="contact-list-item-td hidden md:table-cell"></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>