<template>
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">Organization List</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">organizaton</span>
        </div>
    </div>
    <!-- start coding from here -->

    <!-- end coding here -->

    <div class="p-4 mt-8 sm:px-8 sm:py-4">
        <div class="p-4 bg-white rounded ">

            <!-- new table start -->
            <div class="bg-white dark:bg-gray-800 ">
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
                                <input type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="">
                            </div>
                        </form>
                    </div>
                    <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                        <router-link to="/organization/add" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Create User
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
                <hr>
                <div class="overflow-x-auto">
                    <table class="w-full mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <thead class="text-sm border-b shadow-sm ">
                            <tr>
                                <th scope="col">
                                    <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                                </th>
                                <th scope="col">Name </th>
                                <th scope="col">CpId</th>
                                <th scope="col">Registration Number</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Parent</th>
                                <th scope="col">Organization Name</th>
                                <th scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="organizations.length > 0">
                            <tr v-for="(organization,key) in organizations" :key="key" class="border-b dark:border-gray-700">
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                                </th>
                                <td class="px-4 py-3">{{ organization.organizationName }}</td>
                                <td class="px-4 py-3">{{ organization.cpId }}</td>
                                <td class="px-4 py-3">{{ organization.pin }}</td>
                                <td class="px-4 py-3">{{ organization.regNumber }}</td>
                                <td class="px-4 py-3"> {{ organization.apiUsername  }} </td>
                                <td class="px-4 py-3">{{ organization.apiPassword  }}</td>
                                <td class="px-4 py-3">{{ organization.child ? organization.organization.organizationName : organization.organizationName }}</td>
                                <td class="flex items-center px-6 py-4 space-x-3">
                                    <router-link :to="'/organization/edit/'+ organization.id" href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" :class="{ 'disabled-link': organization.organizationName === 'ROOT' }">
                                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 494.936 494.936" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157

c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21

s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741

c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z" />
                                                    <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069

c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963

c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692

C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107

l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005

c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z" />
                                                </g>
                                            </g>
                                        </svg>

                                    </router-link>
                                    <button href="#" @click.prevent="organization.organizationName !== 'ROOT' ? deleteOrganization(organization.id) : null" class="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-hidden="true" focusable="false" class="w-4 h-4 mr-0.5">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>

                                    </button>
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

                                    <div class=" sm:flex-1 sm:flex sm:items-center sm:justify-between">
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
    </div>

</div>
</template>

<script>
import OrganizationService from "@/service/organization.service";
import EventBus from "../../common/EventBus";
import Swal from 'sweetalert2';
// import swal from 'sweetalert'
import store from '@/store'
import ErrorMessage from "../ErrorMessage.vue";
// import AlertMessage from "../AlertMessage.vue";
export default {
    name: "organization-list",
    components: {
        ErrorMessage,

    },
    data() {
        return {
            selectAll: false,
            organizations: [],
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
            alert: ""

        }
    },
    computed: {
        currentUser() {
            return store.state.user
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
    // computed: {
    //     // current logged in user
    //     currentUser() {
    //         return store.state.user
    //     },

    //     // compute pagination
    //     hasPreviousPage() {
    //         // return this.currentPage > 1;
    //         return this.page > 1;
    //     },
    //     hasNextPage() {
    //         // return this.currentPage < this.totalPages;
    //         return this.page < this.totalPages;
    //     },
    // },
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        },

        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveOrganizations();
        },
        getNextLink() {
            this.page = this.page + 1;
            this.retrieveOrganizations();
        },
        getPrevLink() {
            this.page = this.page - 1;
            this.retrieveOrganizations();
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
        refreshList() {
            this.retrieveOrganizations();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },
        async retrieveOrganizations() {
            const params = this.getRequestParams(this.searchTitle, this.page, this.pageSize);
            const userData = this.currentUser;
            const organizationId = userData.organization;
            const hasRootPrivilege = this.hasRootPrivilege(userData);
            try {

                if (!hasRootPrivilege) {
                    params['orgName'] = organizationId; //Tech debt if user does not exist in any organization then return anauthorized page/route
                }
                OrganizationService.getAll(params)
                    .then(response => {
                        this.organizations = response.data.items;
                        this.data = response.data;
                        this.currentPage = response.data.currentPage;
                        this.totalPages = response.data.totalPages;
                        this.totalItems = response.data.totalItems;

                        console.log(this.organizations.items);
                    })

            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            }

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
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#009E60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete!'
            }).then((result) => {
                if (result.isConfirmed) {

                    OrganizationService.deleteOrg(id).then(() => {
                        this.refreshList();
                    });

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                }
            });

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
        handlePageChange(value) {
            this.page = value;
            this.retrieveOrganizations();
        },

    },
    // created() {
    //     if (this.$route.query.alert) {
    //         this.alert = this.$route.query.alert;
    //     }
    //     this.getUser()

    // },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/');
        }
        this.retrieveOrganizations();
    }

};
</script>
