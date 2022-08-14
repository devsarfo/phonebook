<script setup lang="ts">
    import Header from '@/components/header.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen overflow-hidden">
        <Header :auth="true" />
    </div>
</template>