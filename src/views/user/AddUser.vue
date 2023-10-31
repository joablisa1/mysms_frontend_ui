<template>
<!-- component -->

<div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Create User</h2>

    <div class="flex items-center space-x-1 text-xs">
        <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-gray-600">Add User</span>
    </div>
</div>

<div class="items-center justify-center px-8 py-6 pt-2 mx-4 mt-4 ">
    <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
        <div class="flex flex-col items-center sm:flex-row">
            <h2 class="mr-auto text-lg font-semibold"> Create User</h2>
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
                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Username :<abbr title="required">*</abbr></label>
                        <input placeholder="username" class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" type="text" v-model="user.username" />
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Email :<abbr title="required">*</abbr></label>
                        <input placeholder="email" id="pin" name="pin" class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" type="text" required v-model="user.email" />
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600 ">Roles:<abbr title="required">*</abbr></label>
                        <select v-model="user.roles" multiple class="block w-full border rounded-lg bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                            <option v-for="(role,key) in filteredRoles" :value="role.id" :key="key"> {{ role.name.replace('ROLE_', '').replace('_', ' ').charAt(0).toUpperCase() + role.name.replace('ROLE_', '').replace('_', ' ').slice(1).toLowerCase() }}</option>
                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600 ">Organization :<abbr title="required">*</abbr></label>
                        <select v-model="user.organization" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required">
                            <option value="">Select organization</option>
                            <option v-for="(organization, key) in filteredOrganizations" :value="organization.id" :key="key">{{ organization.organizationName }}</option>
                        </select>
                    </div>
                    <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                        <button @click.prevent=" saveUser" class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                            Create User
                        </button>
                    </div>
                </div>
        </div>

    </div>
</div>
</template>

<script>
import OrganizationService from "../../service/organization.service";
import UserService from "../../service/UserService";
import RoleService from "../../service/role.service";
import EventBus from "../../common/EventBus";
import Swal from "sweetalert2";
import store from "@/store";
export default {
    name: "add-organization",
    computed: {
        currentUser() {
            return store.state.user;
        },
        filteredRoles() {
            if (this.hasRootPrivilege(this.currentUser)) {
                return this.roles;
            } else {
                return this.roles.filter(
                    (role) =>
                    role.name !== "ROOT_PRIVILEGE" && role.name !== "ROLE_SUPER_ADMIN"
                );
            }
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
    data() {
        return {
            roles: [],
            organizations: [],

            user: {
                id: null,
                username: "",
                email: "",
                pin: "",
                organization: "",
                created_date: "",
                roles: [],
                status: "",
            },
            submitted: false,
            errors: [],
        };
    },
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes("ROOT_PRIVILEGE");
        },
        saveUser() {
            var data = {
                username: this.user.username,
                email: this.user.email,
                organization: this.user.organization,
                createdDate: this.user.created_date,
                roles: this.user.roles,
            };

            console.log("===========================>" + JSON.stringify(data));
            UserService.create(data)

                .then((response) => {
                    //this.organization.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Created successfully!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    this.$router.push("/user");
                })
                .catch((e) => {
                    this.errors = e.response.data.errors;
                    Swal.fire({
                        title: "Oops!",
                        icon: "error",
                        text: "An unexpected error has occurred. Please contact CBT support team .",
                    });
                    console.log(e);
                });
        },
        async retrieveRoles() {
            RoleService.getRoles()
                .then((response) => {
                    this.roles = response.data.items;
                    console.log(this.roles.items);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response && e.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
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
        newOrganization() {
            this.submitted = false;
            this.organization = {};
        },
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/");
        }
        this.retrieveOrganizations();
        this.retrieveRoles();
    },
};
</script>
