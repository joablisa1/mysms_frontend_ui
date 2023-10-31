import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/v1/";
//axios.defaults.baseURL =process.env.VUE_APP_ROOT_API ;
axios.defaults.headers.common["Authorization"] = "Bearer" + localStorage.getItem("token");