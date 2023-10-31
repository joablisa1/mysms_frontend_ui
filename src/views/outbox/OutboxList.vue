<template>
<div v-if="currentUser">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
        <h2 class="text-2xl text-gray-600">#Outbox Messages</h2>

        <div class="flex items-center space-x-1 text-xs">
            <router-link to="/home" class="font-bold text-indigo-700">Home</router-link>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600">outbox</span>
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
                    <!-- <button type="button" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add product
                    </button> -->
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
            <table class="w-full mt-2 text-gray-500">
                <thead class="text-sm border-b shadow-sm ">
                    <tr>
                        <th scope="col">
                            <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                        </th>
                        <th scope="col">Keyword</th>
                        <th scope="col">OfferCode</th>
                        <th scope="col">Sender</th>
                        <th scope="col">Receiver</th>
                        <th scope="col">Message</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody  v-if="outboxes.length > 0">
                    <tr v-for="outboxe in outboxes" :key="outboxe.id" class="border-b dark:border-gray-700">
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input v-model="selectAll" type="checkbox" class="w-5 h-5 text-blue-500 border-gray-300 rounded cursor-pointer focus:ring-0" />
                        </th>
                        <td class="px-4 py-3">{{ outboxe.keyword }}</td>
                        <td class="px-4 py-3">{{ outboxe.offerCode }}</td>
                        <td class="px-4 py-3">{{ outboxe.shortCode?.shortcode }}</td>
                        <td class="px-4 py-3">{{ outboxe.msisdn }}</td>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3">
                            {{ formattedDate(outboxe.creationDate) }}
                        </td>
                        <td class="px-4 py-3 lowercase">{{ outboxe.status }}</td>

                        <td class="flex items-center px-6 py-4 space-x-3">
                            <button @click.prevent="deleteOutBox(outboxe.id)" href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">
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
                            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Showing
                                        <span class="font-semibold text-gray-900 dark:text-white">Page {{ currentPage + 1 }}
                                        </span>
                                        of
                                        <span class="font-semibold text-gray-900 dark:text-white">
                                            {{ totalPages }}</span>
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
import OutboxService from "../../service/outbox.service";
import OrganizationService from "../../service/organization.service";
import EventBus from "../../common/EventBus";
import Swal from "sweetalert2";
import store from "@/store";
import ErrorMessage from "../ErrorMessage.vue";

export default {
    name: "user-list",
    components:{
        ErrorMessage
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
    // setup() {
    //     let searchTerm = ref("");

    //     const searchCountries = computed(() => {
    //         if (searchTerm.value === "") {
    //             return [];
    //         }

    //         let matches = 0;

    //         return countries.filter((country) => {
    //             if (
    //                 country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    //                 matches < 10
    //             ) {
    //                 matches++;
    //                 return country;
    //             }
    //         });
    //     });

    //     const selectCountry = (country) => {
    //         selectedCountry.value = country;
    //         searchTerm.value = "";
    //     };

    //     let selectedCountry = ref("");

    //     return {
    //         countries,
    //         searchTerm,
    //         searchCountries,
    //         selectCountry,
    //         selectedCountry,
    //     };
    // },
    data() {
        return {
            outboxitem: null,
            date: null,
            outboxes: [],
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
            //context
            show: false,
            optionsComponent: {
                zIndex: 3,
                minWidth: 250,
                x: 500,
                y: 200,
            },
        };
    },
    methods: {
        formattedDate(timestampMillis) {
            const date = new Date(timestampMillis); // Use the provided timestamp directly
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            };
            return date.toLocaleString("en-US", options).replace(/,/, "");
        },
        hasRootPrivilege(user) {
            return user.roles.includes("ROOT_PRIVILEGE");
        },

        onContextMenu(e, data) {
            e.preventDefault();
            this.outboxitem = data;
            console.log(data + "=====================>");
            //Set the mouse position
            this.optionsComponent.x = e.x;
            this.optionsComponent.y = e.y;
            //Show menu
            this.show = true;
        },
        alertContextMenuItemClicked(name) {
            alert("You clicked " + name + " !" + this.outboxitem.id);
        },
        //sell
        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveOutboxes();
        },
        getNextLink() {
            this.page = this.page + 1;
            this.retrieveOutboxes();
        },
        getPrevLink() {
            this.page = this.page - 1;
            this.retrieveOutboxes();
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
            this.retrieveOutboxes();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },
        async retrieveOutboxes() {
            const params = this.getRequestParams(
                this.searchTitle,
                this.page,
                this.pageSize
            );
            const userData = this.currentUser;
            const organizationId = userData.organization;
            const hasRootPrivilege = this.hasRootPrivilege(userData);
            try {
                if (!hasRootPrivilege) {
                    params["orgName"] = organizationId; //Tech debt if user does not exist in any organization then return anauthorized page/route
                }

                OutboxService.getAll(params).then((response) => {
                    this.outboxes = response.data.items;
                    this.currentPage = response.data.currentPage;
                    this.totalItems = response.data.totalItems;
                    this.totalPages = response.data.totalPages;
                    console.log(this.outboxes.items);
                });
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            }
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
                    const response = await OrganizationService.getOrganizationById(
                        organizationId
                    );
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

        setActiveOrganization(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removeAllTutorials() {
            OutboxService.deleteAll()
                .then((response) => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteOutBox(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#009E60",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete!",
            }).then((result) => {
                if (result.isConfirmed) {
                    OutboxService.delete(id).then(() => {
                        this.refreshList();
                    });

                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            });
        },

        // deleteOrganization(id) {
        //     if (confirm("Are you sure to delete this category ?")) {
        //         this.axios.delete(`/api/category/${id}`).then(response => {
        //             this.getCategories()
        //             console.log(response);
        //         }).catch(error => {
        //             console.log(error)
        //         })
        //     }
        // },
        searchName() {
            OutboxService.findByTitle(this.title)
                .then((response) => {
                    this.tutorials = response.items;
                    //this.setActiveTutorial(null);
                    console.log(response.items);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        // OutboxService.getAll()
        //     .then((response) => {
        //         this.outboxes = response.data.items;
        //         setTimeout(() => {
        //             $("#datatable").DataTable({
        //                 lengthMenu: [
        //                     [5, 10, 25, 50, -1],
        //                     [5, 10, 25, 50, "All"],
        //                 ],
        //                 pageLength: 5,
        //             });
        //         });
        //         console.log(this.outboxes.items);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //         if (e.response && e.response.status === 403) {
        //             EventBus.dispatch("logout");
        //         }
        //     });

        if (!this.currentUser) {
            this.$router.push("/");
        }
        this.retrieveOutboxes();
        this.retrieveOrganizations();
    },
};
</script>
