<script setup lang="ts">
import ContactService from '@/services/contact';
import { reactive } from 'vue';

const data = reactive<{loadingMore:boolean, loading: boolean, errors: any, contacts: any, count: number}>({
    loading: false,
    loadingMore: false,
    errors: [],
    contacts: [],
    count: 0
});

async function getContacts()
{
    data.loading = true;
    data.contacts = await ContactService.get({});
    data.loading = false;
}

async function loadMore()
{
    data.loadingMore = true;

    const contacts = await ContactService.get({
        skip: data.contacts.length
    });
    data.contacts.push(...contacts);
    
    const count = await ContactService.count();
    if(data.contacts.length != count) data.loadingMore = false;
}

//Get Contacts
getContacts();

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
                    <th scope="row" class="flex items-center contact-list-item-td font-medium whitespace-nowrap">
                        <div class="bg-blue-600 inline-flex overflow-hidden justify-center items-center w-10 h-10 rounded-full mr-2">
                            <span class="font-medium text-white">
                                {{ contact.Info.Name.charAt(0) }}
                            </span>
                        </div>
                    
                        {{ contact.Info.Name }}
                    </th>
                    <td class="contact-list-item-td hidden md:table-cell">
                        {{ contact.Info.DefaultPhone.Number }}
                    </td>
                    <td class="contact-list-item-td hidden md:table-cell">
                        {{ contact.Info.DefaultEmail.EmailAddress }}
                    </td>
                    <td class="contact-list-item-td hidden md:table-cell">
                        {{ contact.Info.InvoiceAddress?.AddressLine1 }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <i class="p-2 rounded-full shadow-md fa fa-pencil text-gray-600 hover:text-gray-800"></i>
                            <i class="p-2 rounded-full shadow-md fa fa-trash text-red-600 hover:text-red-800"></i>
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