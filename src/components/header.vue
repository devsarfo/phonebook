<script setup lang="ts">

import AuthService from '@/services/auth';
import { defineProps, reactive } from 'vue';

const auth = new AuthService();
const user = await auth.getUser();
const profile = user?.profile;

const data = reactive({
  menu: false,
});

const props = defineProps({
    auth: Boolean
});

function initials(name: any)
{
    return name.match(/(\b\S)?/g).join("").toUpperCase();
}

function getStarted()
{
    auth.login();
}

function logout()
{
    auth.logout();
}

</script>

<template>
    <nav class="fixed w-full bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex-shrink-0 flex items-center">
                        <img class="h-8 w-auto" src="@/assets/icon.png" alt="Workflow">
                    </div>
                    
                    <router-link to="/" class="mx-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
                        {{ $t('phonebook') }}
                    </router-link>
                </div>

                <div v-if="props.auth" class="hidden w-1/2 sm:block sm:ml-6">
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fa fa-search text-gray-600"></i>
                        </div>
                        <input type="text" 
                            class="pl-10 p-2 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-500 focus:bg-white focus:outline-none bg-gray-500" 
                            :placeholder="$t('searchHint')">
                    </div>
                </div>

                <div v-if="!props.auth" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="ml-3 relative">
                        <a class="btn-sm text-sm text-white bg-blue-600 hover:bg-blue-800 ml-3" href="#" v-on:click="getStarted()">
                            <span>
                                {{ $t('login') }}
                                <i class="fa fa-sign-in"></i>
                            </span>
                        </a>
                    </div>
                </div>
                
                <div v-if="props.auth" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <div class="ml-3 relative">
                        <div>
                            <button @click="data.menu = !data.menu"  type="button" class="btn-sm text-sm text-white bg-blue-600 hover:bg-blue-800 ml-3">
                                <i class="fa fa-circle-user mr-2"></i>
                                {{ initials(profile?.name) }}
                            </button>
                        </div>

                        <div :class="data.menu ? 'block' : 'hidden'" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <a href="#" @click="logout()" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                                {{ $t('logout') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>