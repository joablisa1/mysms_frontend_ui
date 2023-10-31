<template>
<!-- component -->
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">New Bulk Sms</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">bulksms</span>
        </div>
    </div>
    <div class="items-center justify-center mx-4 mt-2">
        <div class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10">
            <div class="flex flex-col items-center sm:flex-row">
                <h2 class="mr-auto text-lg font-semibold">New Bulk Sms</h2>
                <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
            </div>

            <div class="mt-5">
                <div class="form">
                    <!-- <input type="hidden" v-model="organization.parent" name="parentOrg" /> -->
                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Campaign Name<abbr title="required">*</abbr></label>
                        <input placeholder="Type sms Unique Id here..." id="uniqueId" @input="formattedCampaignName" class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" v-model="bulksms.campaignName" />
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>
                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600">Organization :<abbr title="required">*</abbr></label>
                        <select v-model="bulksms.organizationId" name="organizationId" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full" required="required">
                            <option v-for="(organization, key) in filteredOrganizations" :value="organization.id" :key="key">
                                {{ organization.organizationName }}
                            </option>
                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600">ShortCode:<abbr title="required">*</abbr></label>
                        <select v-model="bulksms.shortcode" name="shortcode" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full" required="required">
                            <option v-for="(shortcode, key) in shortcodes" :value="shortcode.id" :key="key">
                                {{ shortcode.shortcode }}
                            </option>
                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600">Bulk Type:<abbr title="required">*</abbr></label>
                        <select name="type" v-model="bulksms.bulkType" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full" required="required">
                            <option value="single">Manually Added</option>
                            <option value="group">Contact Group</option>
                            <option value="file">File Upload</option>
                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Sender Name: <abbr title="required">*</abbr></label>
                        <input placeholder="Type sms OA here..." class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" v-model="bulksms.oa" />
                        <p class="hidden text-xs text-red">Please fill out this field.</p>
                    </div>

                    <div class="flex flex-col w-full mb-3" v-if="bulksms.bulkType === 'single'">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Enter Contacts:<abbr title="required">*</abbr></label>
                        <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
                            {{ tag }}
                            <span @click="removeTag(index)">x</span>
                        </div>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                            <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter a Tag" required="required" @keydown.enter="addTag" @keydown="handleKeyDown" @keydown.delete="removeLastTag" v-model="organization.registrationNumber" />
                        </div>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Upload file:<abbr title="required">*</abbr></label>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                            <!-- <input type="text" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" placeholder=" Enter CP ID.." required="required" v-model="organization.cpId"> -->
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        </div>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm text-left text-gray-600">Contact Group:<abbr title="required">*</abbr></label>
                        <select v-model="bulksms.group" name="shortcode" class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full" required="required">
                            <option v-for="(contactgroup, key) in contactgroups" :value="contactgroup.id" :key="key">
                                {{ contactgroup.groupName }}
                            </option>
                        </select>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Action Url:<abbr title="required">*</abbr></label>
                        <div class="relative flex flex-wrap items-stretch w-full mb-4">
                            <input type="text" placeholder=" Type sms action url here..." required="required" v-model="bulksms.actionResponseURL" class="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal border rounded-lg border-grey-lighter border-grey-light focus:border-blue focus:shadow" />
                        </div>
                    </div>

                    <div class="flex flex-col w-full mb-3">
                        <label class="py-2 text-sm font-semibold text-left text-gray-600">Message</label>
                        <textarea v-model="bulksms.message" name="message" class="min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4" placeholder="Type sms message here..." spellcheck="false"></textarea>
                        <p class="my-3 text-xs text-left text-gray-400">
                            You inserted 0 characters
                        </p>
                    </div>

                    <div class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
                        <button :disabled="bulksms.bulkType === 'file' && !selectedFiles" @click="submitBulkSMS" class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500">
                            Create Bulksms
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
import BulksmsService from "../../service/bulksms.service";
import ShortcodeService from "../../service/shortcode.service";
import ContactService from "../../service/contact.service";
import ContactGroupService from "../../service/contactgroup.service";
import EventBus from "../../common/EventBus";
import Swal from "sweetalert2";
import store from "@/store";
export default {
    data() {
        return {
            tags: [],
            msisdns: [],
            organizations: [],
            smsservices: [],
            shortcodes: [],
            contactgroups: [],
            bulksms: {
                bulkName: "",
                oa: "",
                group: "",
                organizationId: "",
                shortcode: "",
                channel: "",
                msisdn: [],
                uniqueId: "",
                actionResponseURL: "",
                bulkType: "",
                campaignName: "",
                formattedCampaignName: "", // Initialize formattedCampaignName
            },
            submitted: false,
            matchingId: "",
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
        };
    },
    computed: {
        currentUser() {
            return store.state.user;
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
    methods: {
        //Tags
        async addTag(event) {
            event.preventDefault();
            let val = event.target.value.trim();
            if (val.length > 0) {
                // Check if the tag exists on the backend
                const tagExists = await this.checkTagExists(val);

                if (!tagExists) {
                    // Tag doesn't exist, add it to the tags array
                    if (this.tags.length >= 1) {
                        for (let i = 0; i < this.tags.length; i++) {
                            if (this.tags[i] === val) {
                                return false;
                            }
                        }
                    }

                    if (this.msisdns.length >= 1) {
                        for (let i = 0; i < this.msisdns.length; i++) {
                            if (this.msisdns[i] === val) {
                                return false;
                            }
                        }
                    }

                    if (this.bulksms.msisdn.length >= 1) {
                        for (let i = 0; i < this.bulksms.msisdn.length; i++) {
                            if (this.bulksms.msisdn[i] === val) {
                                return false;
                            }
                        }
                    }

                    this.tags.push(val);
                    this.msisdns.push(val);
                    this.bulksms.msisdn.push(val);

                    event.target.value = "";
                    console.log(this.tags);
                } else {
                    // Tag already exists on the backend, handle accordingly
                    // You can show an error message or take other actions
                    console.log("Tag already exists on the backend");
                }
            }
        },
        removeTag(index) {
            this.tags.splice(index, 1);
            this.msisdns.splice(index, 1);
            this.bulksms.msisdn.splice(index, 1);
        },
        removeLastTag(event) {
            if (event.target.value.length === 0) {
                this.removeTag(this.tags.length - 1);
                this.removeTag(this.msisdns.length - 1);
                this.removeTag(this.bulksms.msisdn.length - 1);
            }
        },
        handleKeyDown(event) {
            if (event.key === "Enter" || event.key === ",") {
                this.addTag(event);
            }
        },
        async checkTagExists(tag) {
            console.log(tag);
            // Replace with your backend API endpoint to check tag existence
            //const response = await axios.get(`/api/checkTagExists?tag=${tag}`);
            //return response.data.exists; // Assuming the backend responds with an 'exists' property
            const params = {
                msisdn: tag,
                organizationId: this.currentUser.organization,
            };
            ContactService.getOneContact(params)
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
        formattedCampaignName() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0"); // Add 1 to month as it is 0-based
            const date = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            // Combine the parts with underscores
            this.bulksms.formattedCampaignName = `${this.bulksms.campaignName}_${year}${month}${date}_${hours}${minutes}${seconds}`;
            this.bulksms.bulkName = `${this.bulksms.campaignName}_${year}${month}${date}_${hours}${minutes}${seconds}`;
        },
        hasRootPrivilege(user) {
            return user.roles.includes("ROOT_PRIVILEGE");
        },
        selectFile() {
            this.selectedFiles = this.$refs.file.files;
        },
        submitBulkSMS() {
            this.bulksms.timeStamp = new Date().toISOString();
            this.progress = 0;

            //this.bulksms.group = this.bulksms.group.toString();

            if (this.bulksms.bulkType === "file") {
                // If bulkType is 'file', call createBulkSmsWithUpload
                this.currentFile = this.selectedFiles.item(0);
                BulksmsService.createBulkSmsWithUpload(
                        this.currentFile,
                        JSON.stringify(this.bulksms),
                        (event) => {
                            this.progress = Math.round((100 * event.loaded) / event.total);
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                        this.submitted = true;
                        Swal.fire({
                            title: "Success!",
                            icon: "success",
                            text: "Bulk item created successfully!",
                        });
                    })
                    .catch((error) => {
                        this.progress = 0;
                        this.message = "Could not upload the file!";
                        this.currentFile = undefined;
                        Swal.fire({
                            title: "Oops!",
                            icon: "error",
                            text: error.message,
                        });
                    });
                this.selectedFiles = undefined;
            } else if (this.bulksms.bulkType === "group") {
                // If bulkType is 'group', call createBulkWithGroup
                BulksmsService.createBulkWithGroup(this.bulksms)
                    .then((response) => {
                        console.log(response.data);
                        this.submitted = true;
                        Swal.fire({
                            title: "Success!",
                            icon: "success",
                            text: "Bulk item created successfully!",
                        });
                    })
                    .catch((error) => {
                        this.message = "Could not create bulk item!";
                        Swal.fire({
                            title: "Oops!",
                            icon: "error",
                            text: error.message,
                        });
                    });
            } else {
                // Default case: If bulkType is 'single' or unknown, call createBulkWithContacts
                BulksmsService.createBulkWithContacts(this.bulksms)
                    .then((response) => {
                        console.log(response.data);
                        this.submitted = true;
                        Swal.fire({
                            title: "Success!",
                            icon: "success",
                            text: "Bulk item created successfully!",
                        });
                    })
                    .catch((error) => {
                        this.message = "Could not create bulk item!";
                        Swal.fire({
                            title: "Oops!",
                            icon: "error",
                            text: error.message,
                        });
                    });
            }
        },

        ///////////////////////////////////////////////////
        async retrieveShrotcodes() {
            // Check if the user is logged in
            if (!this.currentUser) {
                this.$router.push("/");
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
        async retrieveContactGroups() {
            const organizationId = this.currentUser.organization;
            const params = {
                organizationId: organizationId,
            };

            try {
                const response =
                    await ContactGroupService.getContactGroupsByOrganization(params);
                if (response.status === 200 && response.data && response.data.payload) {
                    // Assuming response.data.payload is the array of contact groups
                    this.contactgroups = response.data.payload;
                    console.log(this.contactgroups);
                } else {
                    console.error("Invalid response from the server");
                }
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            }
        },
        async retrieveServices() {
            SmsService.getAll()
                .then((response) => {
                    this.smsservices = response.data.items;
                    console.log(this.smsservices);
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
        this.retrieveServices();
        this.retrieveOrganizations();
        this.retrieveShrotcodes();
        this.retrieveContactGroups();
    },
};
</script>
