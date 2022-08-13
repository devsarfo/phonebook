<script setup lang="ts">
import router from '@/router';


const features:any = [
    {
        icon: "fa fa-address-book fa-2xl",
        name: "listContacts",
        desc: "listContactsHint"
    },
    {
        icon: "fa fa-file-circle-plus fa-2xl",
        name: "addContacts",
        desc: "addContactsHint"
    },
    {
        icon: "fa fa-file-pen fa-2xl",
        name: "manageContacts",
        desc: "manageContactsHint"
    }
];

function getStarted()
{
    router.push("/dashboard");
}

</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <header class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white backdrop-blur-sm shadow-lg">
            <div class="max-w-6xl mx-auto px-5 sm:px-6">
                <div class="flex items-center justify-between h-16 md:h-20">
                    <div class="flex-shrink-0 mr-4">
                    <router-link class="flex items-center md:gap-2 block" aria-label="Phonebook" to="/">
                        <img src="@/assets/icon.png" class="h-12" />
                        <span class="text-4xl font-bold hidden md:block">{{ $t('phonebook') }}</span>
                    </router-link>
                    </div>
                    <nav class="flex flex-grow">
                    <ul class="flex flex-grow justify-end flex-wrap items-center">
                        <li>
                            <a class="btn-sm text-white bg-blue-600 hover:bg-blue-800 ml-3" href="#" v-on:click="getStarted()">
                                <span>{{ $t('getStarted') }}</span>
                                <svg class="w-3 h-3 fill-current text-white flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fill-rule="nonzero"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    </nav>
                </div>
            </div>
        </header> 
        
        <main class="flex-grow">
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div class="text-center pb-12 md:pb-16">
                        <h1 class="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                            {{ $t('manageYourContacts') }}
                            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500">
                                {{ $t('onTheGo') }}
                            </span>
                        </h1>
                        <div class="max-w-3xl mx-auto">
                            <p class="text-xl text-gray-600 mb-8" v-html="$t('promoText')"></p>
                            <div class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                                <div><a class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#" v-on:click="getStarted()">
                                    {{ $t('getStarted') }}
                                </a></div>
                                <div><a class="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" target="_blank" href="https://softrig.com/">
                                    {{ $t('learnMore') }}
                                </a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-100">
                <div class="max-w-6xl mx-auto px-4 sm:px-6">
                    <div class="py-12 md:py-20">
                    <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h2 class="h2 mb-4">{{ $t('features') }}</h2>
                        <p class="text-xl text-gray-600">
                            {{ $t('featuresHint') }}
                        </p>
                    </div>
                    <div class="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
                        <div v-for="feature in features" class="flex flex-col items-center p-6 bg-white rounded shadow-xl">
                            <i :class="feature.icon" class="fa-2xl text-blue-600 m-5"></i>

                            <h4 class="text-xl font-bold leading-snug tracking-tight mb-1">{{ $t(feature.name) }}</h4>
                            <p class="text-gray-600 text-center">{{ $t(feature.desc) }}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
            
        
        <footer>
            <div class="max-w-6xl mx-auto px-4 sm:px-6">
                <div class="md:flex md:items-center md:justify-between py-4 md:py-8">
                    <ul class="flex mb-4 md:order-1 md:ml-4 md:mb-0">
                    <li>
                        <a class="sm-icon" aria-label="Twitter" href="https://twitter.com/devsarfo">
                            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="ml-4">
                        <a class="sm-icon" aria-label="Github" href="https://github.com/devsarfo">
                            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path>
                            </svg>
                        </a>
                    </li>
                    <li class="ml-4">
                        <a class="sm-icon" aria-label="Facebook" href="https://facebook.com/thedevsarfo">
                            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z"></path>
                            </svg>
                        </a>
                    </li>
                    </ul>
                    <div class="text-sm text-gray-600 mr-4">
                        {{ $t('copyright') }}
                        <a class="text-blue-600 hover:underline" href="https://devsarfo.io/">DevSarfo</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>