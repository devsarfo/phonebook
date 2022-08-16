<script setup lang="ts">

import ContactService from '@/services/contact';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = reactive({
    count: 0,
    active: router.currentRoute.value.path
});

function setActive(menu: string)
{
    data.active = menu;
}

async function getCount()
{
    data.count = await ContactService.count();
}

getCount();

</script>

<template>
    <aside class="pt-16 w-64 fixed inset-y-0 overflow-x-hidden overflow-y-auto">
        <div class="p-4 min-h-full">
            <ul class="space-y-2">
                <li class="mt-4 mb-8">
                    <router-link to="/create" class="hover:shadow-lg hover:text-blue-600 hover:bg-gray-200 bg-white border border-slate-200 p-4 text-slate-700 shadow rounded-full">
                        <i class="fa fa-user-plus"></i>
                        {{ $t('createContact') }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/" @click="setActive('/dashboard')" :class="data.active == '/dashboard' ? 'sidemenu-item-active':'sidemenu-item'">
                        <i class="fa-regular fa-address-book"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('contacts') }}
                        </span>
                        <span class="inline-flex justify-center items-center py-3 px-2 text-white w-auto h-3 text-sm bg-blue-600 rounded-full">
                            {{ data.count }}
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/recent" @click="setActive('/recent')" :class="data.active == '/recent' ? 'sidemenu-item-active':'sidemenu-item'">
                        <i class="fa fa-clock-rotate-left"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('recentlyAdded') }}
                        </span>
                    </router-link>
                </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
                <li>
                    <button :class="data.active == '/import' ? 'sidemenu-item-active':'sidemenu-item'">
                        <i class="fa fa-upload"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('import') }}
                        </span>
                    </button>
                </li>
                <li>
                    <button :class="data.active == '/export' ? 'sidemenu-item-active':'sidemenu-item'">
                        <i class="fa fa-download"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('export') }}
                        </span>
                    </button>
                </li>
                <li>
                    <button :class="data.active == '/print' ? 'sidemenu-item-active':'sidemenu-item'">
                        <i class="fa fa-print"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('print') }}
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>