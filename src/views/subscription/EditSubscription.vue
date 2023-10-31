<template>
<!-- component -->
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600"># Edit</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">subscription</span>
        </div>
    </div>
    <div class="items-center justify-center mx-4 mt-2">
        <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
            <div class="flex flex-col items-center sm:flex-row">
                <h2 class="mr-auto text-lg font-semibold">Edit Subscription</h2>
                <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
            </div>

            <div class="mt-5">
                <form @submit.prevent="updatedService">
                    <div class="form">
                        <input type="hidden" v-model="subscription.id" />

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600">Short Code:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.shortcode" name="shortcode" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full">
                                <option v-for="shortcode in shortcodes" :key="shortcode.id" :value="shortcode.id"> {{ shortcode.shortcode }} </option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600">Offer Code:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.serviceId" name="serviceId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full">
                                <option v-for="service in service" :key="service.id" :value="service.id">
                                    {{ service.keyword }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm font-semibold text-left text-gray-600">Msisdn:<abbr title="required">*</abbr></label>
                            <div class="relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="text" v-model="subscription.msisdn" name="keyword" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter msisdn." required="required" />
                            </div>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600">Status:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.status" name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full">
                                <option v-for="sub in subscriptionList" :key="sub.id" :value="sub">
                                    {{ sub.toLowerCase() }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col w-full mb-3">
                            <label class="py-2 text-sm text-left text-gray-600">Organization:<abbr title="required">*</abbr></label>
                            <select v-model="subscription.organizationId" name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full" required="required">
                                <option v-for="(organization, key) in organizations" :value="organization.id" :key="key">
                                    {{ organization.organizationName }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                            <button class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                                Update Subscription
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
import SmsService from "../../service/smsservice.service";
import SubscriptionService from "../../service/subscription.service";
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
    data() {
        return {
            subscriptionList: [],
            organizations: [],
            service: [],
            shortcodes: [],
            subscription: {},
            submitted: false,
        };
    },
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes("ROOT_PRIVILEGE");
        },

        getSubscriptionById(id) {
            SubscriptionService.getSubscriptionById(id).then((response) => {
                this.subscription = response.data.payload[0];
            });
        },

        updatedService() {
            const data = {
                id: this.subscription.id,
                shortcode: this.subscription.shortcode,
                msisdn: this.subscription.msisdn,
                serviceId: this.subscription.service.id,
                status: this.subscription.status,
                organization: this.subscription.organizationId,
            };
            console.log(data);
            SubscriptionService.updateSubscriptions(data.id, data)
                .then((response) => {
                    this.subscription = response.data;
                    console.log(response.data);
                    this.submitted = true;
                    this.$router.push("/subscriptions");
                    Swal.fire({
                        icon: "success",
                        text: "Subscription updated successfully!",
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
        getSubScriptionType() {
            SubscriptionService.getSubscriptionByType()
                .then((response) => {
                    this.subscriptionList = response.data;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        async retrieveShrotcodes() {
            ShortcodeService.getAll()
                .then((response) => {
                    this.shortcodes = response.data.items;
                    console.log(this.shortcodes);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response && e.response.status === 403) {
                        EventBus.dispatch("logout");
                    }
                });
        },
        async retrieveOfferCodes() {
            SmsService.getAll()
                .then((response) => {
                    this.service = response.data.items;
                    console.log(this.service);
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
        this.getSubscriptionById(this.$route.params.id);
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/");
        }
        this.retrieveOfferCodes();
        this.getSubScriptionType();
        this.retrieveOrganizations();
        this.retrieveShrotcodes();
    },
};
</script>
