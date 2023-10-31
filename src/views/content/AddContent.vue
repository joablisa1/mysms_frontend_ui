<template>
<!-- component -->
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">Create Content</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">create</span>
        </div>
    </div>
    <div class="items-center justify-center mx-4 mt-2 ">
        <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
            <div class="flex flex-col items-center sm:flex-row">
                <h2 class="mr-auto text-lg font-semibold"> Create Content</h2>
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
                <div class="form">
                    <input type="hidden" v-model="organization.parent" name="parentOrg" />

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600 ">Type :<abbr title="required">*</abbr></label>
                        <select v-model="content.contentype" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                            <option value="text">Text</option>
                            <option value="audio" disabled>Audio</option>
                            <option value="video" disabled>Video</option>
                            <option value="image" disabled>Image</option>
                        </select>
                    </div>
                   
                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600 ">Service:<abbr title="required">*</abbr></label>
                        <select v-model="content.smserviceId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                            <option v-for="(smsservice,key) in smsservices" :value="smsservice.id" :key="key">{{ smsservice.serviceName }}</option>

                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600 ">Organization:<abbr title="required">*</abbr></label>
                        <select v-model="content.organizationId" name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                            <option v-for="(organization, key) in filteredOrganizations" :value="organization.id" :key="key">{{ organization.organizationName }}</option>

                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Schedule date: <abbr title="required">*</abbr></label>
                        <input placeholder="Enter Schedule date." class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" v-model="content.date" type="date" name="date" v-bind:disabled="content.publishnow">
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Schedule time: <abbr title="required">*</abbr></label>
                        <input placeholder="Enter Pin." class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" v-model="content.time" type="time" v-bind:disabled="content.publishnow">
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>

                    <div class="flex flex-col w-full ">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Publish:<abbr title="required">*</abbr></label>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                            <input v-model="content.published" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">status<abbr title="required">*</abbr></label>
                        </div>
                    </div>

                    <div class="flex flex-col w-full ">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Schedule Now?<abbr title="required">*</abbr></label>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                            <input v-model="content.publishnow" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600 ">status<abbr title="required">*</abbr></label>
                        </div>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600 ">Message:</label>
                        <textarea name="message" id="" v-model="content.message" class=" min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4" placeholder="Please type you  message here" spellcheck="true"></textarea>
                        <p class="my-3 text-xs text-left text-gray-400">You inserted 0 characters</p>
                    </div>

                    <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                        <button @click.prevent="saveContent" class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                            Create Content
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
import SmsService from "../../service/smsservice.service";
import ContentService from "../../service/content.service";
import EventBus from "../../common/EventBus";
import Swal from 'sweetalert2';
import store from "@/store";

export default {
    data() {
        return {
            organizations: [],
            smsservices: [],
            content: {
                id: null,
                smserviceId: "",
                organizationId: "",
                contentype: "",
                message: "",
                date: "",
                time: "",
                publishnow: false,
                published: false
            },
            organization: {
                id: null,
                organizationName: "",
                registrationNumber: "",
                pin: "",
                description: "",
                status: "",
                published: false
            },
            submitted: false,

            errors: [],
        };
    },
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
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        },
        saveContent() {
            var date1 = this.getDateTimeString();
            var data = {
                smserviceId: this.content.smserviceId,
                organizationId: this.content.organizationId,
                message: this.content.message,
                contentType: this.content.contentype,
                published: this.content.published,
                publishNow: this.content.publishnow,
                publishedDate: date1
            };

            ContentService.create(data)
                .then(response => {
                    this.content.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;

                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: "created successfully!",

                    });
                    this.$router.push("/contents")
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                    Swal.fire({
                        title: 'Oops!',
                        icon: 'error',
                        text: e.message,

                    });
                    console.log(e);
                    if (e.response && e.response.status === 400) {
                        Swal.fire({
                            title: 'Oops!',
                            icon: 'error',
                            text: "An unexpected error has occurred. Please contact CBT support team .",

                        });
                    }
                });
        },
        saveOrganization() {
            var data = {
                organizationName: this.organization.organizationName,
                status: this.organization.status,
                pin: this.organization.pin,
                registrationNumber: this.organization.registrationNumber,
                description: this.organization.description
            };

            OrganizationService.create(data)
                .then(response => {
                    this.organization.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Created successfully!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(e => {
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

        async retrieveServices() {
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
                this.smsservices = response.data.items;
                console.log(this.smsservices);
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
                const servicePromise = hasRootPrivilege ?
                    SmsService.getAllServices() :
                    SmsService.getServicesByOrganization(organizationId);

                // Execute the promise and handle the response
                const response = await servicePromise;
                handleResponse(response);
            } catch (e) {
                handleError(e);
            }
        },
        newContent() {
            this.submitted = false;
            this.content = {};
        },
        getDateTimeString() {

            if (!this.content.date || !this.content.time) {
                return null; // return null if date or time is not defined
            }

            const dateTime = new Date(`${this.content.date}T${this.content.time}`);

            if (isNaN(dateTime.getTime())) {
                return null; // return null if the combined date and time is not valid
            }

            const year = dateTime.getFullYear().toString()
            const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
            const day = dateTime.getDate().toString().padStart(2, '0')
            const hours = dateTime.getHours().toString().padStart(2, '0')
            const minutes = dateTime.getMinutes().toString().padStart(2, '0')
            const seconds = dateTime.getSeconds().toString().padStart(2, '0')
            return `${year}${month}${day}${hours}${minutes}${seconds}`
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        this.retrieveServices();
        this.retrieveOrganizations();
    }

}
</script>
