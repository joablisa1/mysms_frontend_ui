<template>
    <!-- component -->
    <div v-if="currentUser">
        <div class="flex justify-between px-4 mt-4 sm:px-8">
            <h2 class="text-2xl text-gray-600">Create Subscription</h2>
            <div class="flex items-center space-x-1 text-xs">
                <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <span class="text-gray-600">subscription</span>
            </div>
        </div>
        <div class="items-center justify-center mx-4 mt-2 ">
            <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
                <div class="flex flex-col items-center sm:flex-row">
                    <h2 class="mr-auto text-lg font-semibold"> Create Subscription</h2>
                    <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
                </div>
    
                <div class="mt-5">
                    <div class="form">
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Short Code:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.shortcode" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="(shortcode,key) in shortcodes" :value="shortcode.id" :key="key">{{ shortcode.shortcode }}</option>
                            </select>
                        </div>
    
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Offer Code:<abbr title="required">*</abbr></label>
                            <select  v-model="subscription.serviceId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="service in  service" :value="service.id" :key="service.id"> {{ service.keyword }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Msisdn:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" v-model="subscription.msisdn" name="keyword" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter msisdn." required="required" >
                            </div>
                        </div>
    
                
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Organization:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.organization" name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="(organization, key) in filteredOrganizations" :value="organization.id" :key="key">{{ organization.organizationName }}</option>
    
                            </select>
                        </div>
    
                        <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                            <button @click.prevent="saveSubscription" class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                                Create Subscription
                            </button>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
import OrganizationService from "../../service/organization.service";
import ShortcodeService from "../../service/shortcode.service";
import SubscriptionService from "../../service/subscription.service"
import SmsService from "../../service/smsservice.service";
import EventBus from "../../common/EventBus";
import Swal from 'sweetalert2';
import store from '@/store';
    export default {
        name: "add-organization",
    computed: {
        currentUser() {
            return store.state.user;
        },
        //copy this omwami   
     userOrganizationId() {
      return this.currentUser ? this.currentUser.organization : null;
    },
    filteredOrganizations() {
      if (!this.organizations || !this.currentUser) {
        return [];
    }

      // Check if the user has root privileges
      const hasRootPrivilege = this.hasRootPrivilege(this.currentUser);

      // If user has root privileges, show all organizations
      if (hasRootPrivilege) {
        return this.organizations;
      }

      // Otherwise, filter the organizations based on the logged-in user's organization ID
      return this.organizations.filter(org => org.id === this.currentUser.organization);
    },
    },
    watch: {
    // organizations: {
    //   immediate: true, // Run the watcher immediately on component load
    //   handler() {
    //     // Filter the organizations only after the data is loaded
    //     this.filteredOrganizations();
    //   },
    // },
  },
    data() {
        return {
            organizations: [],
            shortcodes: [],
            service:[],
            subscription:{
               id:null,
               shortcode:"",
               serviceId:"",
               msisdn:"",
               organization:""
            },
            // service: {
            //     id: null,
            //     shortcode: "",
            //     type: "",
            //     offerCode:"",
            //     serviceName: "",
            //     organizationId: "",
            //     published: false
            // },
            submitted: false
        };
    },
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        },
        saveSubscription() {
            const data = {
                shortcode: this.subscription.shortcode,
                serviceId: this.subscription. serviceId,
                msisdn: this.subscription.msisdn,
                organization: this.subscription.organization
            };
            console.log(this.subscription)
            SubscriptionService.createSubscritpion(data)
                .then(response => {
                  this.subscription.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                    this.$router.push("/subscriptions")
                    Swal.fire({
                        icon: 'success',
                        text: 'Subscription updated successfully!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(e => {
                    if (e.response && e.response.status === 403) {
                        EventBus.dispatch("logout");
                        Swal.fire({
                 position: 'top-center',
                 icon: 'success',
                 title: 'An unexpected error occurred. Please try again later.',
                 showConfirmButton: false,
                 timer: 2000
             });
                    }
                    Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href="">Why do I have this issue?</a>'
})
                    console.log(e);
                });
        },
        async retrieveOrganizations() {
            OrganizationService.getAll()
                .then(response => {
                    this.organizations = response.data.items;
                    console.log(this.organizations.items);
                })
                .catch(e => {
                    console.log(e);
                    if (e.response && e.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                });
        },
            //Omwami copy this
    async retrieveShrotcodes() {
      // Check if the user is logged in
      if (!this.currentUser) {
        this.$router.push('/');
        return;
      }

      // Retrieve the user's organization ID
      const organizationId = this.currentUser.organization;

      // Check if the user has root privileges
      const hasRootPrivilege = this.hasRootPrivilege(this.currentUser);

      try {
        // Retrieve the shortcodes based on the user's privileges
        if (hasRootPrivilege) {
          // User with root privilege can view all shortcodes
          const response = await ShortcodeService.getAllSC();
          this.shortcodes = response.data.items;
        } else {
          // Non-root user can view only the shortcodes of their organization
          const response = await ShortcodeService.getAllSCByOrg(organizationId);
          this.shortcodes = response.data.items;
        }
        console.log(this.shortcodes);
      } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    },
    async retrieveOfferCodes() {
  // Check if the user is logged in, and if not, redirect to the home page.
  if (!this.currentUser) {
    this.$router.push('/');
    return;
  }

  // Retrieve the user's organization ID
  const organizationId = this.currentUser.organization;

  // Check if organizationId is null, then handle the case accordingly
  if (!organizationId) {
    Swal.fire({
      icon: 'error',
      title: 'Organization ID Missing',
      text: 'The organization ID is missing for the user. Please contact support.',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Determine if the user has root privileges
  const hasRootPrivilege = this.hasRootPrivilege(this.currentUser);

  // Define the function to handle the response from the API
  const handleResponse = (response) => {
    this.service = response.data.items;
    console.log(this.service);
  };

  // Define the function to handle errors and dispatch logout if needed
  const handleError = (e) => {
    console.log(e);
    if (e.response && e.response.status === 403) {
      EventBus.dispatch("logout");
    }
  };

  try {
    // Fetch services based on privileges using conditional logic
    const servicePromise = hasRootPrivilege
      ? SmsService.getAllServices()
      : SmsService.getServicesByOrganization(organizationId);

    // Execute the promise and handle the response
    const response = await servicePromise;
    handleResponse(response);
  } catch (e) {
    handleError(e);
  }
} ,
  },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        this.retrieveOfferCodes()
        this.retrieveOrganizations();
        this.retrieveShrotcodes();
    }
        
    }
    </script>