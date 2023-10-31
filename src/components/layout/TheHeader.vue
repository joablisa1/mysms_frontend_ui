<template>
<header class="flex justify-between px-4 bg-white border-b-2 sm:justify-end sm:px-6">

    <button class="sm:hidden" @click="toggleSidebar()">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>

    <Menu as="div" class="relative">
        <MenuButton class="flex items-center px-2 py-3 space-x-2 text-sm hover:bg-gray-200 focus:outline-none">
            <img class="w-8 h-8 rounded-full" src="@/assets/images/photo/user-36-04.jpg" alt="" />
            <span v-if="currentUser">{{currentUser.username}} </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </MenuButton>
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems class="absolute right-0 w-48 py-1 origin-top-right bg-white divide-y divide-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div v-if="currentUser">
                    <MenuItem v-slot="{ active }">
                    <a href="#"  :class="[active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                    </MenuItem>  
                </div>
                <MenuItem v-slot="{ active }" v-if="!currentUser">
                <router-link :to="{ name: 'login' }" :class="[active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700']">Login </router-link>
                </MenuItem>

                <MenuItem v-slot="{ active }" v-if="currentUser">
                <a href="#" @click.prevent="logout" :class="[active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700 cursor pointer'] ">Sign out</a>
                </MenuItem>

            </MenuItems>
        </transition>
    </Menu>
</header>
</template>

<script>
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
} from '@headlessui/vue'
import store from '@/store'
import { mapState} from 'vuex'
export default {
    components: {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
    },
    data(){
        return{
            show:true
        }
    },
    computed: {
        currentUser() {
            return store.state.user
        },
        ...mapState(['sideBarOpen'])

    },
    methods: {
        logout() {
            store.dispatch('logout')
            this.$router.push({
                name: 'login'
            })
        },
        toggleSidebar(){
            this.$store.dispatch('toggleSidebar')
        }
    }

}
</script>
