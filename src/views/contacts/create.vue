<script setup lang="ts">
import { Contact } from '@/models/contact';
import { reactive } from 'vue';


const contact = reactive<Contact>({
    name: undefined
});

function save()
{
}

</script>

<template>
    <div class="border-b border-gray-200">
        <div class="flex items-center justify-between h-16 m-8">
            <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <div class="bg-blue-600 inline-flex overflow-hidden relative justify-center items-center w-24 h-24 rounded-full mr-2">
                        <span class="font-medium text-2xl text-white">
                            {{ contact.name?.charAt(0).toUpperCase() ?? '+'}}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex gap-2">
                <a :class="contact.name?.length ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-100 text-gray-500 shadow-inner cursor-not-allowed'" class="btn-sm text-sm text-white" href="#" v-on:click="save()">
                    {{ $t('save') }}
                </a>
                <router-link class="btn-sm text-sm text-red-600 hover:bg-red-600 hover:text-white" to="/">
                    {{ $t('cancel') }}
                </router-link>
            </div>
        </div>
    </div>
    
    <div class="p-8">
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6 gap-4">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('name') }}
                    </label>
                    
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-user text-gray-600"></i>
                        </div>
                        <input type="text" class="form-input"  v-model="contact.name" :placeholder="$t('firstAndLastName')">
                    </div>
                </div>

                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('phone') }}
                    </label>
                    
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-phone text-gray-600"></i>
                        </div>
                        <input type="text" class="form-input"  v-model="contact.phone" :placeholder="$t('phone')">
                    </div>
                </div>

                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {{ $t('email') }}
                    </label>
                    
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-envelope text-gray-600"></i>
                        </div>
                        <input type="text" class="form-input"  v-model="contact.email" :placeholder="$t('email')">
                    </div>
                </div>
                
            </div>
        </form>
    </div>
</template>