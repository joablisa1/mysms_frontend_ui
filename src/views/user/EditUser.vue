<template>
  <!-- component -->

  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">#Edit</h2>

    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/home" class="font-bold text-indigo-700"
        >Home</router-link
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-2 h-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span class="text-gray-600">Edit User</span>
    </div>
  </div>

  <div class="items-center justify-center px-8 py-6 pt-2 mx-4 mt-4">
    <div
      class="max-w-xl px-4 py-8 mx-auto bg-white shadow rounded-xl sm:rounded-lg sm:px-10"
    >
      <div class="flex flex-col items-center sm:flex-row">
        <h2 class="mr-auto text-lg font-semibold">Edit User</h2>
        <div class="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></div>
      </div>

      <div class="mt-5">
        <form @submit.prevent="updateUsers">
          <input type="hidden" v-model="user.id" />
          <div class="form">
            <div class="flex flex-col w-full mb-3">
              <label class="py-2 text-sm font-semibold text-left text-gray-600"
                >Username :<abbr title="required">*</abbr></label
              >
              <input
                placeholder="username"
                class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                type="text"
                v-model="user.username"
              />
              <p class="hidden text-xs text-red">Please fill out this field.</p>
            </div>

            <div class="flex flex-col w-full mb-3">
              <label class="py-2 text-sm font-semibold text-left text-gray-600"
                >Email :<abbr title="required">*</abbr></label
              >
              <input
                placeholder="email"
                id="pin"
                name="pin"
                class="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                type="text"
                required
                v-model="user.email"
              />
              <p class="hidden text-xs text-red">Please fill out this field.</p>
            </div>

            <div class="flex flex-col w-full mb-3">
              <label class="py-2 text-sm text-left text-gray-600"
                >Roles:<abbr title="required">*</abbr></label
              >
              <select
                v-model="user.roles"
                multiple
                class="block w-full border rounded-lg bg-grey-lighter text-grey-darker border-grey-lighter md:w-full"
                required="required"
              >
                <option
                  v-for="(role, key) in filteredRoles"
                  :value="role.id"
                  :key="key"
                >
                  {{
                    role.name
                      .replace("ROLE_", "")
                      .replace("_", " ")
                      .charAt(0)
                      .toUpperCase() +
                    role.name
                      .replace("ROLE_", "")
                      .replace("_", " ")
                      .slice(1)
                      .toLowerCase()
                  }}
                </option>
              </select>
            </div>

            <div class="flex flex-col w-full mb-3">
              <label class="py-2 text-sm text-left text-gray-600"
                >Organization :<abbr title="required">*</abbr></label
              >
              <select
                v-model="user.organization"
                class="block w-full h-10 px-4 border rounded-lg cursor-pointer bg-grey-lighter text-grey-darker border-grey-lighter md:w-full"
                required="required"
              >
                <option value="">Select organization</option>
                <option
                  v-for="(organization, key) in filteredOrganizations"
                  :value="organization.id"
                  :key="key"
                >
                  {{ organization.organizationName }}
                </option>
              </select>
            </div>
            <div
              class="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block"
            >
              <button
                class="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full md:mb-0 hover:shadow-lg hover:bg-green-500"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

    
<script>
import OrganizationService from "../../service/organization.service";
import UserService from "../../service/UserService";
import RoleService from "../../service/role.service";
// import EventBus from "../../common/EventBus";
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
            user: {},
            submitted: false,
            errors: [],
            userLoaded: false,
        };
    },
    methods: {
        hasRootPrivilege(user) {
            return user.roles.includes('ROOT_PRIVILEGE');
        },
        fetchUserById(id) {
      UserService.getUserbyId(id).then(response => {
        this.user = response.data.payload[0];
        this.user.rolesIds = this.user.roles.map(role => role.id); 
        this.userLoaded = true;
        console.log(response.data);
      });
    },
        // fetchUserById(id) {
        //     UserService.getUserbyId(id).then(response => {
        //         this.user = response.data.payload[0];
        //         this.userLoaded = true;
        //         console.log(response.data)
        //     })
        // },
        updateUsers() {
            const data = {
                id: this.user.id,
                username: this.user.username,
                email: this.user.email,
                organization: this.user.organization,
                // createdDate: this.user.created_date,
                roles: this.user.roles,
            };
 
            console.log(data)
            UserService.updateUser(data.id, data).then(response => {
                    this.user= response.data
                    console.log(response.data);
                    this.submitted = true;
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: "User updated successfully!",
                    });
                    this.$router.push("/user")
                })
                .catch(e => {
                    this.errors = e.response.data.errors;
                    Swal.fire({
                        title: 'Oops!',
                        icon: 'error',
                        text: e.message,

                    });
                    console.log(e);
                });
        },
        async retrieveRoles() {
            RoleService.getRoles()
                .then(response => {
                    this.roles = response.data.items;
                    console.log(this.roles.items);
                })
                .catch(e => {
                    console.log(e);
                    // if (e.response && e.response.status === 403) {
                    //     EventBus.dispatch("logout");
                    // }
                });
        },
        async retrieveOrganizations() {
            OrganizationService.getAll()
                .then(response => {
                    this.organizations = response.data.items;
                    
                    console.log(this.organizations.data);
                })
                .catch(e => {
                    console.log(e);
                    // if (e.response && e.response.status === 403) {
                    //     EventBus.dispatch("logout");
                    // }
                });
        },
    },
    created() {
        this.fetchUserById(this.$route.params.id)
    },

    mounted() {

        if (!this.currentUser) {
            this.$router.push('/');
        }
        this.retrieveOrganizations();
        this.retrieveRoles(); 

    }
};
</script>
