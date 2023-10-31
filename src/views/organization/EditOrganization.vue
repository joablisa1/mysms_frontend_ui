<template>
<!-- component -->
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600"># Eit organization Form</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">edit</span>
        </div>
    </div>
    <div class="items-center justify-center mx-4 mt-2 ">
        <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
            <div class="flex flex-col items-center sm:flex-row">
                <h2 class="mr-auto text-lg font-semibold"> Edit  Organization</h2>
                <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
            </div>

            <div class="mt-5">

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
                </div>
                <form @submit.prevent="updateOrganization">
                    <div class="form">
                        <input type="hidden" v-model="organization.id" />
                        <input type="hidden" v-model="organization.parent" name="parentOrg" />
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Organization Name <abbr title="required">*</abbr></label>
                            <input placeholder="Enter organization name." class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" v-model="organization.organizationName">
                            <p class="hidden text-xs text-red">Please fill out this field.</p>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Pin: <abbr title="required">*</abbr></label>
                            <input placeholder="Enter Pin." class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" v-model="organization.pin">
                            <p class="hidden text-xs text-red">Please fill out this field.</p>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Reg No:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter Reg No.." required="required" v-model="organization.regNumber">
                            </div>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Cp Id:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter CP ID.." required="required" v-model="organization.cpId">
                            </div>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">UserName:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter Api Username..." required="required" v-model="organization.apiUsername">
                            </div>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Password:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter Api password..." required="required" v-model="organization. apiPassword">
                            </div>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600 ">Type :<abbr title="required">*</abbr></label>
                            <select v-model="organization.organizationType" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                                <option v-for="typeOption in organizationTypes" :key="typeOption" :value="typeOption.toLowerCase()">
                                    {{ capitalizeFirstLetter(typeOption.toLowerCase()) }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Child Organization?:</label>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                          <input v-model="isChild" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" :disabled="!hasRootPrivilege">
                        </div>
                    </div>

                        <!-- <div class="flex flex-col w-full mb-3">
                                    <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Description</label>
                                    <textarea name="message" id="" v-model="organization.description " class=" min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4" placeholder="Enter your comapny info" spellcheck="false"></textarea>
                                    <p class="my-3 text-xs text-left text-gray-400">You inserted 0 characters</p>
                                </div> -->

                        <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                            <button  class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                                Update
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
import store from "@/store";
import Swal from "sweetalert2";
export default {
  name: "add-organization",
  data() {
    return {
      organizationTypes: ["dealer", "company", "individual", "other"],
      organization: {
        id: null,
        organizationName: "",
        regNumber: "",
        pin: "",
        cpId: "",
        apiPassword: "",
        apiUsername: "",
        organizationType: "",
        child: false,
        parent: "",
        published: false,
      },
      submitted: false,
      errors: [],
    };
  },
  computed: {
    currentUser() {
      return store.state.user;
    },
    hasRootPrivilege() {
      return (
        this.currentUser && this.currentUser.roles.includes("ROOT_PRIVILEGE")
      );
    },
    isChild: {
      get() {
        return this.organization.child;
      },
      set(value) {
        this.organization.child = value;
        this.updateParentOrg();
      },
    },
    selectedOrganizationType: {
      get() {
        if (this.organization && this.organization.organizationType) {
          return this.organization.organizationType.toLowerCase();
        }
        return "";
      },
      set(value) {
        this.organization.organizationType = value.toUpperCase();
      },
    },
    parentOrgId() {
      return this.organization.child
        ? this.organization.organization.id
        : this.organization.parent || "";
    },
  },
  watch: {
    isChild: "updateParentOrg",
  },

  methods: {
    updateParentOrg() {
      // Check if the organization is a child and there is a logged user with an organization
      if (
        this.organization.child &&
        this.currentUser &&
        this.currentUser.organization
      ) {
        this.organization.parent = this.currentUser.organization.id;
      } else {
        // If organization is not a child or there is no logged user with an organization, set parent to null or any other appropriate value
        this.organization.parent = "";
      }
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async fetchOrganizationById(id) {
      OrganizationService.get(id)
        .then((response) => {
          const organizationData = response.data.payload[0];
          if (organizationData) {
            // If the response has data, set it to the organization object
            this.organization = {
              ...organizationData,
              organizationType: organizationData.organizationType.toLowerCase(), // Convert to lowercase
            };
            this.parentOrgId;
          } else {
            // If the response is empty or doesn't contain the expected payload, set default values
            this.organization = {
              id: null,
              organizationName: "",
              regNumber: "",
              pin: "",
              cpId: "",
              apiPassword: "",
              apiUsername: "",
              organizationType: "",
              child: false,
              parent: "",
              published: false,
            };
            // Set other default properties if needed
          }
        })
        .catch((error) => {
          console.error("Error fetching organization:", error);
          // Handle the error as needed
        });
    },

    updateOrganization() {
      const data = {
        id: this.organization.id,
        organizationType: this.organization.organizationType,
        organizationName: this.organization.organizationName,
        pin: this.organization.pin,
        cpId: this.organization.cpId,
        sdpApiPassword: this.organization.apiPassword,
        sdpApiUsername: this.organization.apiUsername,
        registrationNumber: this.organization.regNumber,
        isChild: this.organization.child,
        parentOrg: this.currentUser.organization,
      };

      console.log(data);

      OrganizationService.update(data.id, data)
        .then((response) => {
          this.organization = response.data;
          this.submitted = true;
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "created successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
          if (e.response && e.response.status === 500) {
            console.log("Internal Server Error");
            Swal.fire({
              title: "Oops!",
              icon: "error",
              text: "Please contact CBT support team .",
            });
          } else {
            console.log("Internal Server Error");
          }
        });
    },
  },
  created() {
    this.organization.id = this.$route.params.id;
    this.fetchOrganizationById(this.$route.params.id);
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    this.organization.id = this.$route.params.id;
    this.fetchOrganizationById(this.$route.params.id);

    this.updateParentOrg();
    if (this.currentUser && this.currentUser.organization) {
      this.organization.parent = this.currentUser.organization;
    }
  },
};
</script>

    
<style>
</style>
