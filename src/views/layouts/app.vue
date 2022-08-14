<script setup lang="ts">

import Footer from '@/components/footer.vue';
import Header from '@/components/header.vue';
import Sidebar from '@/components/sidebar.vue';
import AuthService from '@/services/auth';
    
const auth = new AuthService();
const user = await auth.getUser();
const profile = user?.profile;

</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header :auth="true" />

        <main class="flex-grow pt-16 ">
            <div class="flex">
                <Sidebar />
            
                <div class="container mx-auto py-8 md:w-4/5 w-11/12">
                    <div class="w-full h-full">
                        <RouterView />
                    </div>
                </div>
            </div>
        </main>
        
        <Footer />
    </div>
</template>