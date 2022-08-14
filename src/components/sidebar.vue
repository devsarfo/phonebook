<template>
    <aside class="w-64 md:block hidden">
        <div class="overflow-y-auto py-4 px-3">
            <ul class="space-y-2">
                <li class="mt-4 mb-8">
                    <router-link to="/create" class="hover:shadow-lg hover:text-blue-600 hover:bg-gray-200 bg-white border border-slate-200 p-4 text-slate-700 shadow rounded-full">
                        <i class="fa fa-user-plus"></i>
                        {{ $t('createContact') }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/" class="sidemenu-item-active">
                        <i class="fa-regular fa-address-book"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('contacts') }}
                        </span>
                        <span class="inline-flex justify-center items-center py-3 px-2 text-white w-auto h-3 text-sm bg-blue-600 rounded-full">
                            1,780
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/recent" class="sidemenu-item">
                        <i class="fa fa-clock-rotate-left"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('recentlyAdded') }}
                        </span>
                    </router-link>
                </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
                <li>
                    <router-link to="/import" class="sidemenu-item">
                        <i class="fa fa-upload"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('import') }}
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/export" class="sidemenu-item">
                        <i class="fa fa-download"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('export') }}
                        </span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/export" class="sidemenu-item">
                        <i class="fa fa-print"></i>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                            {{ $t('print') }}
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>