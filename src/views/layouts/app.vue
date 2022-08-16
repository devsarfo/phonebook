<script setup lang="ts">
import Sidebar from '@/components/sidebar.vue';
import { Contact } from '@/models/contact';
import AuthService from '@/services/auth';
import ContactService from '@/services/contact';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const auth = new AuthService();
const user = await auth.getUser();
const profile = user?.profile;

function initials(name: any)
{
    return name.match(/(\b\S)?/g).join("").toUpperCase();
}


function logout()
{
    auth.logout();
}

const data = reactive<{sideMenu: boolean, profileMenu: boolean, searching: boolean, loading: boolean, search: string, contacts: Contact[]}>({
    sideMenu: false,
    profileMenu: false,
    searching: false,
    loading: false,
    search: '',
    contacts: []
});


function viewContact(contact: any)
{
    data.searching = false;
    router.push({path: '/contact/' + contact.ID });
}

function toggleSide() {
    data.sideMenu = !data.sideMenu;
}

function toggleProfile() {
    data.profileMenu = !data.profileMenu;
}

async function search()
{
    if(data.search.trim().length)
    {
        data.searching = true;
        
        data.loading = true;
        
        var filterString = "contains(Info.Name,'"+data.search.trim()+"')";
        filterString += " or contains(Info.Phones.Number,'"+data.search.trim()+"')";
        filterString += " or contains(Info.Emails.EmailAddress,'"+data.search.trim()+"')";
        filterString += " or contains(Info.InvoiceAddress.AddressLine1,'"+data.search.trim()+"')";
        filterString += " or contains(Info.InvoiceAddress.AddressLine2,'"+data.search.trim()+"')";
        filterString += " or contains(Info.InvoiceAddress.City,'"+data.search.trim()+"')";
        filterString += " or contains(Info.InvoiceAddress.Country,'"+data.search.trim()+"')";
        filterString += " or contains(Info.InvoiceAddress.PostalCode,'"+data.search.trim()+"')";
        
        data.contacts = await ContactService.getAll({filter: filterString});
        data.loading = false;
        
    }
    else data.searching = false;
}

watch(() => data.search, () => {
    setTimeout(() => search(), 500);
});


</script>
<template>
    <nav class="fixed px-2 sm:px-6 lg:px-8 top-0 inset-x-0 z-50 h-16 text-white bg-gray-800 font-medium flex justify-between items-center">
        <div class="p-4 sm:w-64">
            <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <button class="p-1 hover:text-white mr-4 block sm:hidden" @click="toggleSide()">
                    <i v-if="!data.sideMenu" class="fa fa-bars fa-lg text-white cursor-pointer"></i>
                    <i v-if="data.sideMenu" class="fa fa-close fa-lg text-white cursor-pointer"></i>
                </button>
                
                <div class="flex-shrink-0 flex items-center">
                    <img class="h-8 w-auto" src="@/assets/icon.png" alt="Workflow">
                </div>
                
                <router-link to="/" class="mx-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
                    {{ $t('phonebook') }}
                </router-link>
            </div>
        </div>

        <div class="hidden w-1/2 sm:block sm:ml-6">
            <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <i class="fa fa-search text-gray-600"></i>
                </div>
                <input type="text" v-model="data.search" 
                    class="pl-10 p-2 w-full text-sm text-gray-900 rounded border border-gray-500 focus:bg-white focus:outline-none bg-gray-500" 
                    :placeholder="$t('searchHint')">
                <div v-if="data.search.length" @click="data.search = ''" class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer">
                    <i class="fa fa-close text-gray-600"></i>
                </div>
            </div>
            
        </div>

        <div class="sm:hidden block">
            <i class="fa fa-search"></i>
        </div>
        
        <div class="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div class="ml-3 relative">
                <div>
                    <button @click="data.profileMenu = !data.profileMenu"  type="button" class="btn-sm text-sm text-white bg-blue-600 hover:bg-blue-800 ml-3">
                        <i class="fa fa-circle-user mr-2"></i>
                        <div class="hidden md:block">{{ profile?.name }}</div>
                        <div class="block md:hidden">{{ initials(profile?.name) }}</div>
                    </button>
                </div>

                <div :class="data.profileMenu ? 'block' : 'hidden'" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100", Not Active: "" -->
                    <a href="#" @click="logout()" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                        {{ $t('logout') }}
                    </a>
                </div>
            </div>
        </div>
    </nav>
    
    <div class="hidden sm:block">
        <Sidebar />
    </div>

    <div :class="data.sideMenu ? 'block' : 'hidden'">
        <Sidebar />
    </div>
    
    <main class="pt-16 sm:pl-64" :class="data.sideMenu ? 'pl-64' : ''">
        <!-- Page  -->
        <RouterView v-if="!data.searching" />  
        
        <!-- Search Div -->
        <div v-if="data.searching" class="overflow-x-auto">
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
                    </tr>
                </thead>
                <tbody>    
                    <tr @click="viewContact(contact)" v-if="!data.loading && data.contacts.length" v-for="contact in data.contacts" class="contact-list-item">
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
                    </tr>
                    
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
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </main>
</template>