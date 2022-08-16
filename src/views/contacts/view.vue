<script setup lang="ts">
import { Contact } from '@/models/contact';
import ContactService from '@/services/contact';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const data = reactive<{contact?: Contact, id: string, loading: boolean, errors: any}>({
    loading: false,
    errors: [],
    id: route.params.id?.toString(),
});

async function getContact()
{
    data.loading = true;
    data.contact = await ContactService.get(data.id);
    data.loading = false;
}


async function deleteContact()
{
    const proceed = confirm("Delete from contacts?");
    if(proceed)
    {
        data.errors = [];
        const result = await ContactService.delete(data.id);
        
        if(!result.error)
        {
            router.push({path: '/'});
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

onMounted(() => getContact());

</script>

<template>
    <div class="border-b border-gray-200">
        <div class="flex items-center justify-between h-16 m-8">
            <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <div class="bg-blue-600 inline-flex overflow-hidden justify-center items-center w-24 h-24 rounded-full mr-2">
                        <span class="font-medium text-2xl text-white">
                            {{ data.contact?.Info.Name.trim().length ? data.contact?.Info.Name.trim().charAt(0).toUpperCase() : '+'}}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex gap-2">
                <router-link :to="'/contact/'+data.id+'/edit'" class="btn-sm text-sm bg-blue-600 hover:bg-blue-800 text-white">
                    {{ $t('edit') }}
                </router-link>
                
                <button @click="deleteContact()" class="btn-sm text-sm text-red-600 hover:bg-red-600 hover:text-white">
                    {{ $t('delete') }}
                </button>
            </div>
        </div>
    </div>
    
    <div class="p-8 w-full max-w-lg" v-if="!data.loading">
        <div class="flex flex-wrap -mx-3 mb-6 gap-4">
            <div class="w-full px-3">
                <label for="name" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('name') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-user text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.Name }}
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="phone" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('phone') }}
                </label>
                
                <div v-for="phone in data.contact?.Info.Phones" class="grid gap-2 grid-cols-1 md:grid-cols-3">
                    <div>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <i class="fa fa-flag text-gray-600"></i>
                            </div>    
                            <p class="form-input-view">
                                {{ phone.CountryCode }}
                            </p>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <i class="fa fa-phone text-gray-600"></i>
                            </div>
                            <p class="form-input-view">
                                <a :href="'tel:'+phone.CountryCode+phone.Number">
                                    {{ phone.Number }}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="email" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('email') }}
                </label>
                
                <div v-for="email in data.contact?.Info.Emails" class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-envelope text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        <a :href="'mailto:'+email.EmailAddress">
                            {{ email.EmailAddress }}
                        </a>
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="addressLine1" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('addressLine1') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-signs-post text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.InvoiceAddress.AddressLine1 }}
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('addressLine2') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-signs-post text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.InvoiceAddress.AddressLine2 }}
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="city" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('city') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-map-location text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.InvoiceAddress.City }}
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="postalCode" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('postalCode') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-location text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.InvoiceAddress.PostalCode }}
                    </p>
                </div>
            </div>
            
            <div class="w-full px-3">
                <label for="country" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('country') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-flag text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Info.InvoiceAddress.City }}
                    </p>
                </div>
            </div>

            <div class="w-full px-3">
                <label for="comments" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {{ $t('comments') }}
                </label>
                
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <i class="fa fa-info-circle text-gray-600"></i>
                    </div>
                    <p class="form-input-view">
                        {{ data.contact?.Comment }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div v-if="data.loading" v-for="item in 5" class="contact-list-item">
        <div class="animate-pulse flex items-center space-x-4 w-full p-4">
            <div class="rounded-full bg-gray-200 h-10 w-10"></div>        
            <div class="w-3/4">
                <div class="h-2 mb-2 bg-gray-200 w-full rounded"></div>
                <div class="h-2 mb-2 bg-gray-200 w-1/2 rounded"></div>
                <div class="h-2 mb-2 bg-gray-200 w-3/4 rounded"></div>
            </div>
        </div>
    </div>
</template>