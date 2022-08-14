<script setup lang="ts">

import Footer from '@/components/footer.vue';
import Header from '@/components/header.vue';
import AuthService from '@/services/auth';
    
const auth = new AuthService();
const user = await auth.getUser();
const profile = user?.profile;

</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        
        <Header :auth="true" />

        <div class="flex-grow py-16">
            <router-view />
        </div>
        
        <Footer />
    </div>
</template>