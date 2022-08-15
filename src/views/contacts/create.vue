<script setup lang="ts">
import { Contact } from '@/models/contact';
import countries from '@/models/country';
import router from '@/router';
import ContactService from '@/services/contact';
import { reactive } from 'vue';

const contact = reactive<Contact>({
    info: {
        name: '',
        invoiceAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            country: '',
            countryCode: '',
            postalCode: '',
        },
        defaultPhone: {
            countryCode: '+47',
            country: 'Norway',
            number: '',
            description: ''
        },
        defaultEmail: {
            emailAddress: ''
        },
    },
    comment: ''
});

const data = reactive<{loading: boolean, errors: any}>({
    loading: false,
    errors: [],
});

function selectCountry()
{
    const country = countries.filter((country) => country.name == contact.info.invoiceAddress.country);
    if(country.length)
    {
        contact.info.invoiceAddress.countryCode = country[0].code;
    }
}

async function save()
{
    if(!contact.info.name.trim().length)
    {
        return;
    }

    data.loading = true; data.errors = [];
    const result = await ContactService.create(contact);
    
    if(!result.error)
    {
        
        if(result.response.hasOwnProperty("ID"))
        {
            router.push({ path: '/contact/'+result.response.ID});
        }
        else
        {
            router.push({ path: '/' });
        }    
    }
    else
    {
        if(result.response.hasOwnProperty("ErrorsCount"))
        {
            result.response.Messages.forEach((message: any) => data.errors.push(message.Message));
        }
    }
    
    data.loading = false;
}

</script>

<template>
    <div class="border-b border-gray-200">
        <div class="flex items-center justify-between h-16 m-8">
            <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <div class="bg-blue-600 inline-flex overflow-hidden justify-center items-center w-24 h-24 rounded-full mr-2">
                        <span class="font-medium text-2xl text-white">
                            {{ contact.info.name.trim().length ? contact.info.name.trim().charAt(0).toUpperCase() : '+'}}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex gap-2">
                <button v-if="!data.loading" :class="contact.info.name.trim().length ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-100 text-gray-500 shadow-inner cursor-not-allowed'" class="btn-sm text-sm text-white" v-on:click="save()">
                    {{ $t('save') }}
                </button>
                
                <button v-if="data.loading" class="btn-sm text-sm text-white bg-gray-100 text-gray-500 shadow-inner cursor-not-allowed">
                    <i class="fa fa fa-spinner fa-pulse mr-2"></i>
                    {{ $t('saving') }}
                </button>
                
                <router-link class="btn-sm text-sm text-red-600 hover:bg-red-600 hover:text-white" to="/">
                    {{ $t('cancel') }}
                </router-link>
            </div>
        </div>
    </div>
    
    <div class="p-8">
        <form class="w-full max-w-lg">
            
            <div v-if="data.errors.length" class="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 mb-4 shadow-md" role="alert">
                <div class="flex items-center">
                    <div class="py-1"><i class="fa fa-circle-exclamation text-red-500 mr-4"></i></div>
                    <div>
                        <p v-for="error in data.errors" class="text-sm">
                            {{ error }}
                        </p>
                    </div>
                </div>
            </div>

            
            <div class="flex flex-wrap -mx-3 mb-6 gap-4">
                <div class="w-full px-3">
                    <label for="name" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('name') }}
                    </label>
                    
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-user text-gray-600"></i>
                        </div>
                        <input id="name" type="text" class="form-input"  v-model="contact.info.name" :placeholder="$t('firstAndLastName')">
                    </div>
                </div>

                <div class="w-full px-3">
                    <label for="phone" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('phone') }}
                    </label>
                    
                    <div class="grid gap-2 grid-cols-1 md:grid-cols-3">
                        <div>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <i class="fa fa-flag text-gray-600"></i>
                                </div>
                                <select class="form-input" v-model="contact.info.defaultPhone.countryCode" :placeholder="$t('country')">
                                    <option v-for="country in countries" :value="country.dialCode">{{ country.code + " ("+ country.dialCode + ")" }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <i class="fa fa-phone text-gray-600"></i>
                                </div>
                                <input id="phone" type="tel" class="form-input"  v-model="contact.info.defaultPhone.number" :placeholder="$t('phone')">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full px-3">
                    <label for="email" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('email') }}
                    </label>
                    
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-envelope text-gray-600"></i>
                        </div>
                        <input id="email" type="email" class="form-input"  v-model="contact.info.defaultEmail.emailAddress" :placeholder="$t('email')">
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
                        <input id="addressLine1" type="text" class="form-input"  v-model="contact.info.invoiceAddress.addressLine1" :placeholder="$t('addressLine1')">
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
                        <input type="text" class="form-input"  v-model="contact.info.invoiceAddress.addressLine2" :placeholder="$t('addressLine2')">
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
                        <input id="city" type="text" class="form-input"  v-model="contact.info.invoiceAddress.city" :placeholder="$t('city')">
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
                        <input id="postalCode" type="number" min="0" class="form-input"  v-model="contact.info.invoiceAddress.postalCode" :placeholder="$t('postalCode')">
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
                        <select id="country" class="form-input" @change="selectCountry()" v-model="contact.info.invoiceAddress.country" :placeholder="$t('country')">
                            <option value="">{{ $t('select')+" "+$t('country') }}</option>
                            <option v-for="country in countries" :value="country.name">
                                {{ country.name }}
                            </option>
                        </select>
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
                        <input id="comments" type="text" class="form-input"  v-model="contact.comment" :placeholder="$t('comments')">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>