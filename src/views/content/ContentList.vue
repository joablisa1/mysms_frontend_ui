<template>
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">Content</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">content</span>
        </div>
    </div>
   

    <div class="p-4 mt-8 sm:px-8 sm:py-4">
        <div class="p-4 bg-white rounded">
            <!-- new table start -->

            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                        </div>
                    </form>
                </div>
                <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <router-link to="/content/add"  class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                       Add Content
                    </router-link>
                    <div class="flex items-center w-full space-x-3 md:w-auto">
                        Show Page:
                        <select v-model="pageSize" @change.prevent="handlePageSizeChange($event)" class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <option v-for="size in pageSizes" :key="size" :value="size">
                                {{ size }}
                            </option>
                        </select>

                        <div id="actionsDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                            </svg>
                            Filter
                            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <table class="w-full mt-2 text-gray-500 ">
                <thead class="text-sm border-b shadow-sm ">
                    <tr>
                        <th scope="col">
                            <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                        </th>
                        <th scope="col">Keyword</th>
                        <th scope="col">Sender</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody  v-if="contents.length > 0">
                    <tr v-for="(content, key) in contents" :key="key" class="border-b dark:border-gray-700">
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                        </th>
                        <td hidden="hidden">{{ content.id }}</td>
                        <td class="px-4 py-3">{{ content.smsService?.serviceName }}</td>
                        <td class="px-4 py-3">{{ content.smsService.shortCode?.shortcode }}</td>
                        <td class="px-4 py-3">
                            {{ content.message }}
                
                        </td>
                        <td class="px-4 py-3">
                            {{
                  new Date(content?.scheduleDate)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")
                }}
                        </td>
                        <td class="px-4 py-3">
                            {{
                  new Date(content?.scheduleDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                }}
                        </td>
                        <td class="px-4 py-3 lowercase" >
                            <span class="text-green-700 shadow-sm">
                                <span :class="{ 'font-bold text-sm': content.processed }">
                                    {{ content?.processed ? "PROCESSED" : "PENDING" }}
                                </span>
                            </span>
                        </td>
                        <td  class="px-4 py-3">{{ content.smsService.shortCode?.shortcode }}</td>
                        <td  class="px-4 py-3 ">
                            <span v-if="content.processed">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" width="24" height="24" preserveAspectRatio="xMidYMid meet" style="transform: translate3d(0px, 0px, 0px); 
content-visibility: visible;">
                                    <defs>
                                        <clipPath id="__lottie_element_16">
                                            <rect width="128" height="128" x="0" y="0">

                                            </rect>
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#__lottie_element_16)">
                                        <g style="display: none;">
                                            <g>
                                                <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4">

                                                </path>
                                            </g>
                                        </g>
                                        <g transform="matrix(0.9859926700592041,-0.16678878664970398,0.16678878664970398,0.9859926700592041,-9.77801513671875,11.570953369140625)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,71.56999969482422,71.56999969482422)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-7.570000171661377,-7.570000171661377 C-7.570000171661377,-7.570000171661377 7.570000171661377,7.570000171661377 7.570000171661377,7.570000171661377"></path>
                                            </g>
                                        </g>
                                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M64,49 C64,49 64,64 64,64"></path>
                                            </g>
                                        </g>
                                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,45.5,45.5)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke-dasharray=" 10 15" stroke-dashoffset="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-18.5,18.5 C-18.5,-1.899999976158142 -1.899999976158142,-18.5 18.5,-18.5"></path>
                                            </g>
                                            <g opacity="1" transform="matrix(1,0,0,1,64,64)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-37,0 C-37,20.399999618530273 -20.399999618530273,37 0,37 C20.399999618530273,37 37,20.399999618530273 37,0 C37,-20.399999618530273 20.399999618530273,-37 0,-37"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>

                            </span>
                            <span v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" width="24" height="24" preserveAspectRatio="xMidYMid meet" style="transform: translate3d(0px, 0px, 0px); 
content-visibility: visible;">
                                    <defs>
                                        <clipPath id="__lottie_element_16">
                                            <rect width="128" height="128" x="0" y="0">

                                            </rect>
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#__lottie_element_16)">
                                        <g style="display: none;">
                                            <g>
                                                <path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4">

                                                </path>
                                            </g>
                                        </g>
                                        <g transform="matrix(0.9859926700592041,-0.16678878664970398,0.16678878664970398,0.9859926700592041,-9.77801513671875,11.570953369140625)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,71.56999969482422,71.56999969482422)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-7.570000171661377,-7.570000171661377 C-7.570000171661377,-7.570000171661377 7.570000171661377,7.570000171661377 7.570000171661377,7.570000171661377"></path>
                                            </g>
                                        </g>
                                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M64,49 C64,49 64,64 64,64"></path>
                                            </g>
                                        </g>
                                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style="display: block;">
                                            <g opacity="1" transform="matrix(1,0,0,1,45.5,45.5)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke-dasharray=" 10 15" stroke-dashoffset="0" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-18.5,18.5 C-18.5,-1.899999976158142 -1.899999976158142,-18.5 18.5,-18.5"></path>
                                            </g>
                                            <g opacity="1" transform="matrix(1,0,0,1,64,64)">
                                                <path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="5" d=" M-37,0 C-37,20.399999618530273 -20.399999618530273,37 0,37 C20.399999618530273,37 37,20.399999618530273 37,0 C37,-20.399999618530273 20.399999618530273,-37 0,-37"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                        <tr>
                            <td colspan="10" class="justify-center px-4 pt-6 pr-4 mt-4 mb-4 space-x-6 tw-text-center">
                                <ErrorMessage></ErrorMessage>
                            </td>
                        </tr>
                    </tbody>
                <tfoot>
                    <tr>
                        <td colspan="7" class="py-2">
                       
                            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing
                                        <span class="font-semibold text-gray-900 dark:text-white">Page {{ currentPage + 1 }}</span>
                                        of
                                        <span class="font-semibold text-gray-900 dark:text-white">{{ totalPages }}</span>
                                    </span>
                                </div>
                                <div id="pagination">
                                    <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
                                        <ul class="inline-flex items-center -space-x-px">
                                            <li v-if="hasPreviousPage">
                                                <button @click.prevent="getPrevLink(currentPage - 1)" href="#" class="pr-2 tw-block tw-px-4 tw-py-1 tw-no-underline tw-text-inherit dark:tw-text-zinc-50 tw-rounded-md tw-border-2 tw-transition-colors print:no-link tw-border-neutral-600 dark:tw-border-zinc-300" aria-label="Page {{ currentPage - 1 }}" data-turbo-frame="frame-statistics" data-turbo-action="advance" aria-current="page">
                                                    Previous
                                                </button>
                                            </li>

                                            <li v-if="hasNextPage">
                                                <button @click.prevent="getNextLink(currentPage + 1)" href="#" class="tw-block tw-px-4 tw-py-1 tw-no-underline tw-text-inherit dark:tw-text-zinc-50 tw-rounded-md tw-border-2 tw-transition-colors print:no-link tw-border-neutral-300 dark:tw-border-zinc-700 hover:tw-border-neutral-400 focus:tw-border-neutral-400 hover:dark:tw-border-zinc-500 focus:dark:tw-border-zinc-500" aria-label="Last page, page {{ currentPage + 1 }}" data-turbo-frame="frame-statistics" data-turbo-action="advance">
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import OrganizationService from "../../service/organization.service";
import ContentService from "../../service/content.service";
import EventBus from "../../common/EventBus";
import store from '@/store';
import ErrorMessage from "../ErrorMessage.vue";
export default {
    name: "organization-list",
    components:{
        ErrorMessage
    },
    data() {
        return {
            selectAll: false,
            organizations: [],
            contents: [],
            currentTutorial: null,
            currentIndex: 0,
            title: "",
            totalPages: 0,
            currentPage: 0,
            totalItems: 0,
            searchTitle: "",
            page: 1,
            count: 0,
            pageSize: 10,
            pageSizes: [5, 10, 20, 40, 50, 100],
        };
    },
    computed: {
        currentUser() {
            return store.state.user;
        },
        hasPreviousPage() {
            // return this.currentPage > 1;
            return this.page > 1;
        },
        hasNextPage() {
            // return this.currentPage < this.totalPages;
            return this.page < this.totalPages;
        },
    },
   
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        },
        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveContents();
        },
        getNextLink() {
            this.page = this.page + 1;
            this.retrieveContents();
        },
        getPrevLink() {
            this.page = this.page - 1;
            this.retrieveContents();
        },
        async retrieveOrganizations() {
            const userData = this.currentUser;
            const hasRootPrivilege = this.hasRootPrivilege(userData);
            try {
                if (hasRootPrivilege) {
                    // If the user has root privilege, retrieve all organizations
                    const response = await OrganizationService.getAll();
                    this.organizations = response.data.items;
                    console.log(this.organizations);
                } else {
                    // If the user doesn't have root privilege, retrieve only their organization
                    const organizationId = userData.organization;
                    const response = await OrganizationService.getOrganizationById(organizationId);
                    this.organizations = [response.data]; // Wrap the single organization in an array
                    console.log(this.organizations);
                }
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            }
        },
        getRequestParams(searchTitle, page, pageSize) {
            let params = {};

            if (searchTitle) {
                params["title"] = searchTitle;
            }

            if (page) {
                params["page"] = page - 1;
            }

            if (pageSize) {
                params["size"] = pageSize;
            }

            return params;
        },
        async retrieveContents() {

            const params = this.getRequestParams(this.searchTitle, this.page, this.pageSize);
            const userData = this.currentUser;
            const organizationId = userData.organization;
            const hasRootPrivilege = this.hasRootPrivilege(userData);
            try {

                if (!hasRootPrivilege) {
                    params['orgName'] = organizationId; //Tech debt if user does not exist in any organization then return anauthorized page/route
                }

                ContentService.getContents(params)
                    .then(response => {
                        this.contents = response.data.items;
                        this.currentPage = response.data.currentPage;
                        this.totalItems = response.data.totalItems;
                        this.totalPages = response.data.totalPages;
                        console.log(this.contents.items);
                    })

            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            }

        },
        refreshList() {
            this.retrieveOrganizations();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },

        setActiveOrganization(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removeAllTutorials() {
            OrganizationService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteOrganization(id) {
            if (confirm("Are you sure to delete this category ?")) {
                this.axios.delete(`/api/category/${id}`).then(response => {
                    this.getCategories()
                    console.log(response);
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        searchName() {
            OrganizationService.findByTitle(this.title)
                .then(response => {
                    this.tutorials = response.items;
                    //this.setActiveTutorial(null);
                    console.log(response.items);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        formattedTime(scheduleDate) {
            const date = new Date(scheduleDate);
            let hour = date.getHours();
            let minute = date.getMinutes();
            const amPm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12; // Convert to 12-hour format
            hour = hour.toString().padStart(2, '0'); // Add leading zero if single digit
            minute = minute.toString().padStart(2, '0'); // Add leading zero if single digit
            return `${hour}:${minute} ${amPm}`;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        this.retrieveOrganizations();

        this.retrieveContents();
    }
};
</script>
