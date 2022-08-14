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
                <a class="btn-sm text-sm text-white bg-blue-600 hover:bg-blue-800" href="#" v-on:click="save()">
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
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        {{ $t('name') }}
                    </label>
                    <input class="form-input" type="text" v-model="contact.name">
                </div>
            </div>
        </form>
    </div>
</template>