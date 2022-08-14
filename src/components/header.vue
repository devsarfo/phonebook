<script setup lang="ts">

import AuthService from '@/services/auth';

const auth = new AuthService();

function getStarted()
{
    auth.login();
}

</script>

<template>
    <nav class="fixed w-full bg-gray-800">
        <div class="max-w-full px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                    
                    <div class="flex-shrink-0 flex items-center">
                        <img class="h-8 w-auto" src="@/assets/icon.png" alt="Workflow">
                    </div>
                    
                    <router-link to="/" class="mx-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
                        {{ $t('phonebook') }}
                    </router-link>
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="ml-3 relative">
                        <a class="btn-sm text-sm text-white bg-blue-600 hover:bg-blue-800 ml-3" href="#" v-on:click="getStarted()">
                            <span>
                                {{ $t('login') }}
                                <i class="fa fa-sign-in"></i>
                            </span>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </nav>
</template>