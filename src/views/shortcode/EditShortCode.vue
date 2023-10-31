<template>
<!-- component -->
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">Create Shortcode</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">shortcode</span>
        </div>
    </div>
    <div class="items-center justify-center mx-4 mt-2 ">
        <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
            <div class="flex flex-col items-center sm:flex-row">
                <h2 class="mr-auto text-lg font-semibold"> Create Shortcode</h2>
                <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
            </div>
           
                <div class="mt-5">
<!--                     
                    <div v-if="errors.length" class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <span class="help-block tw-text-sm">
                            <svg class="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <p v-if="errors.length > 2" class="text-red-500 ">
                                <b>Please correct the following errors:</b>
                                <ul class="px-6 list-disc list-outside list">
                                    <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                            <p v-else-if="errors.length === 1" class="text-red-500 ">
                                <b>Please correct the following error:</b>
                                {{ errors[0] }}
                            </p>
                            <p v-else class="text-green-500">
                                No errors!
                            </p>
                        </span>
                    </div> -->
                    <form @submit.prevent="updateShortcode">
                    <div class="form">
                        <input type="hidden" v-model="shortcode.id">
                        
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">ShortCode:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter shortcode..." required="required" v-model="shortcode.shortcode">
                            </div>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Telco :<abbr title="required">*</abbr></label>
                            <select v-model="shortcode.telco" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="telcomtype in telcotype" :key="telcomtype" :value="telcomtype" >{{telcomtype.toLowerCase()}}</option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Type :<abbr title="required">*</abbr></label>
                            <select v-model="shortcode.type" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="shortcodetype in shortcodetype" :key="shortcodetype" :value="shortcodetype" >{{shortcodetype.toLowerCase()}}</option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Category :<abbr title="required">*</abbr></label>
                            <select v-model="shortcode.category" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                      
                              <option v-for="shortcodecat in shortcodecategory" :key="shortcodecat" :value="shortcodecat">{{shortcodecat.toLowerCase()}}</option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Organization:<abbr title="required">*</abbr></label>
                            <select v-model="shortcode.organizationId"  name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="(organization, key) in filteredOrganizations" :value="organization.id" :key="key">{{ organization.organizationName }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                            <button  class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                                Update Shortcode
                            </button>
                        </div>
                    </div>
                </form>

                </div>
            
        </div>
    </div>
</div>
</template>


<script>
import OrganizationService from "../../service/organization.service";
import ShortcodeService from "../../service/shortcode.service";
import EventBus from "../../common/EventBus";
import Swal from "sweetalert2";
import store from "@/store";

export default {
  name: "add-organization",
  computed: {
    currentUser() {
      return store.state.user;
    },
    
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
      return this.organizations.filter(
        (org) => org.id === this.currentUser.organization
      );
    },
  },
  watch: {},

  data() {
    return {
      organizations: [],
      shortcodetype: [],
      shortcodecategory: [],
      shortservice: {},
      telcotype: [],
      shortcode: {},
      submitted: false,
      errors: [],
    };
  },
  methods: {
    hasRootPrivilege(user) {
      return user.roles.includes("ROOT_PRIVILEGE");
    },

    async getShortCodeId(id) {
      ShortcodeService.getShortCodeById(id).then((response) => {
        this.shortcode = response.data.payload[0];
        console.log(response.data);
      });
    },
    async updateShortcode() {
      const data = {
        id: this.shortcode.id,
        shortCode: this.shortcode.shortcode,
        type: this.shortcode.type,
        telco: this.shortcode.telco,
        category: this.shortcode.category,
        organizationId: this.shortcode.organizationId,
      };

      ShortcodeService.updateShortCode(data.id, data)
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
          this.submitted = true;
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Shortcode created successfully!",
          });
          this.$router.push("/shortcodes");
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: e.message,
          });
          console.log(e);
        });
    },
    async retrieveOrganizations() {
      OrganizationService.getAll()
        .then((response) => {
          this.organizations = response.data.items;
          console.log(this.organizations.items);
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
        });
    },
    async retrieveShortCodeType() {
      ShortcodeService.getShortCodeType().then((response) => {
          this.shortcodetype = response.data;
          console.log(this.shortcodetype.items);
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
        });
    },
    async retrieveShortCodeCategory() {
      ShortcodeService.getShortCodeCategory()
        .then((response) => {
          this.shortcodecategory = response.data;
          console.log(this.shortcodecategory.items);
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
        });
    },

    async retrieveTelcoType() {
      ShortcodeService.getTelcoType().then((response) => {
          this.telcotype = response.data;
          this.shortcode.console.log(this.telcotype.items);
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.status === 403) {
            EventBus.dispatch("logout");
          }
        });
    },
    newShortcode() {
      this.submitted = false;
      this.organization = {};
    },
  },
  created() {
    this.getShortCodeId(this.$route.params.id);
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    this.retrieveOrganizations();
    this.retrieveShortCodeType();
    this.retrieveShortCodeCategory();
    this.retrieveTelcoType();
  },
};
</script>
