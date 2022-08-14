<script setup lang="ts">
import Footer from '@/components/footer.vue';
import Header from '@/components/header.vue';
import AuthService from '@/services/auth';


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
    const auth = new AuthService();
    auth.login();
}

</script>
<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        
        <Header />
        
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
            
        <Footer />
    </div>
</template>