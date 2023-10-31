<template>
    <div class="flex min-h-screen">
      <the-sidebar  />
  
      <div class="flex flex-col flex-grow bg-gray-200" :class="sideBarOpen ? 'overlay' : ''">
        <the-header />
  
        <div class="mb-auto">
          <router-view />
        </div>
  
        <the-footer />
      </div>
    </div>
  </template>
  
  <script>
  import TheSidebar from '@/components/layout/TheSidebar.vue'
  import TheHeader from '@/components/layout/TheHeader.vue'
  import TheFooter from '@/components/layout/TheFooter.vue'
  import { mapState } from 'vuex'
  // import store from '@/store'
  export default {
    components: {
      TheSidebar,
      TheHeader,
      TheFooter,
    },
    computed: {
        // currentUser() {
        //     return store.state.user
        // },
        ...mapState(['sideBarOpen'])

    }, 
  }
  </script>
  
  