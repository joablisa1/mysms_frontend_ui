<template>
  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-50">
    <div class="w-full max-w-md">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">
        Sign in to your dashboard
      </h2>

      <div>
        <button
          class="flex justify-center w-full px-4 py-3 font-medium text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            class="w-6 h-6 mr-2"
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>

      <div class="flex items-center justify-center my-4 space-x-2">
        <span class="w-full h-px bg-gray-300"></span>
        <span class="px-2 text-gray-500">or</span>
        <span class="w-full h-px bg-gray-300"></span>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div
          class="p-4 mb-4 text-sm text-red-800 bg-red-400 rounded-lg dark:bg-gray-800 dark:text-red-400"
          role="alert"
          v-if="errorMessage"
        >
          <span class="font-medium"> {{ errorMessage }}</span>
        </div>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-400"
          role="alert"
          v-if="passwordErrors.length > 0"
        >
          <ul>
            <li v-for="error in passwordErrors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            name="username"
            type="text"
            v-model="user.username"
            autocomplete="username"
            class="w-full py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md cursor pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Enter username"
          />
        </div>

        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type="password"
            v-model="user.password"
            class="w-full py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md cursor pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            placeholder="Password"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-0"
            />
            <label
              for="remember-me"
              class="block ml-2 text-sm text-gray-900 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            :disabled="loading"
            type="submit"
            class="text-white bg-blue-700 cursor pointer w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              v-show="loading"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Sign In
          </button>
        </div>
      </form>

      <div class="mt-2 text-sm text-gray-600">
        Not registered yet?
        <router-link
          href="#"
          to="/user/add"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Create an account</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
// import swal from "sweetalert";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      usernameErrors: [],
      passwordErrors: [],
      loading: false,
      errorMessage: "",
    };
  },
  computed: {
    logedUserIn() {
      return store.state.loggedIn;
    },
  },
  created() {
    // if (this.logedUserIn) {
    //     this.$router.push({
    //         name: "login"
    //     })
    //     //  this.$router.push({name:'fetch-user',params:{user:{
    //     //             email:this.user.username
    //     //         }}})
    // }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      // if (!this.user.username || !this.user.password) {
      //     this.errorMessage = "Please enter both username and password.";
      //     this.loading = false;
      //     return;
      // }
      // this.usernameErrors = [];
      // this.passwordErrors = [];

      // if (!this.user.email){
      //     this.usernameErrors.push("Please enter your username.");
      // }
      // if (!this.user.password) {
      //     this.passwordErrors.push("Please enter your password.");
      // }

      // if (this.usernameErrors.length > 0 || this.passwordErrors.length > 0) {
      //     this.loading = false;
      //     return;
      // }

      this.$store
        .dispatch("loggedIn", this.user)
        .then((response) => {
          localStorage.setItem("token", response.data);
          this.$router.push({
            name: "home",
          });

          console.log(response.token.data);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = "Sorry Invalid Credentials";
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) | error.message || error.toString();

          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Response data:", error.response.data);
            console.log("Response status:", error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log("Request error:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error message:", error.message);
          }
        });
    },
  },
};
</script>
