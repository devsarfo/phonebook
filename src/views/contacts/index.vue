<script setup lang="ts">

const contacts = [
    { 
        name: "Bernard Sarfo Twumasi", 
        phone: "+233206119718", 
        email: "devsarfo@gmail.com",
        address: "Løkkestredet 3, Grimstad 4876",
    },
    { 
        name: "Kwaku Twumasi", 
        phone: "+233558183873", 
        email: "bernardsarfo3@gmail.com",
        address: "Olam Road, AsoKwa - Kumasi",
    },
    { 
        name: "Kwaku Twumasi", 
        phone: "+233558183873", 
        email: "",
        address: "",
    },
    
    { 
        name: "Bernard Sarfo Twumasi", 
        phone: "+233206119718", 
        email: "devsarfo@gmail.com",
        address: "Løkkestredet 3, Grimstad 4876",
    },
    { 
        name: "Kwaku Twumasi", 
        phone: "+233558183873", 
        email: "bernardsarfo3@gmail.com",
        address: "Olam Road, AsoKwa - Kumasi",
    },
    { 
        name: "Bernard Sarfo Twumasi", 
        phone: "+233206119718", 
        email: "devsarfo@gmail.com",
        address: "",
    },
    { 
        name: "Kwaku Twumasi", 
        phone: "", 
        email: "bernardsarfo3@gmail.com",
        address: "",
    },
];

console.log(contacts);

</script>

<template>
    <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left">
            <thead class="border-b text-xs font-bold text-gray-500 uppercase">
                <tr>
                    <th scope="col" class="contact-list-item-th">
                        {{ $t('name') }}
                    </th>
                    <th scope="col" class="contact-list-item-th">
                        {{ $t('phone') }}
                    </th>
                    <th scope="col" class="contact-list-item-th">
                        {{ $t('email') }}
                    </th>
                    <th scope="col" class="contact-list-item-th">
                        {{ $t('address') }}
                    </th>
                    <th scope="col" class="contact-list-item-th text-right">
                        <i class="fa fa-ellipsis-vertical"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" class="contact-list-item">
                    <th scope="row" class="flex items-center contact-list-item-td font-medium whitespace-nowrap">
                        <div class="bg-blue-600 inline-flex overflow-hidden relative justify-center items-center w-10 h-10 rounded-full mr-2">
                            <span class="font-medium text-white">
                                {{ contact.name.charAt(0) }}
                            </span>
                        </div>
                    
                        {{ contact.name }}
                    </th>
                    <td class="contact-list-item-td">
                        {{ contact.phone }}
                    </td>
                    <td class="contact-list-item-td">
                        {{ contact.email }}
                    </td>
                    <td class="contact-list-item-td">
                        {{ contact.address }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <i class="p-2 rounded-full shadow-md fa fa-pencil text-gray-600 hover:text-gray-800"></i>
                            <i class="p-2 rounded-full shadow-md fa fa-trash text-red-600 hover:text-red-800"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>