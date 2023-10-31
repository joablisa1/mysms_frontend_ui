import axios from "axios";
const AUTH_URL_API="http://localhost:8080/api/auth/"

class AuthService{

    login(user){
        return axios.post(`${AUTH_URL_API}signin`,user).then(response => {
            if(response.data.accessToken){
                localStorage.setItem('user',JSON.stringify(response.data))
            }
            return response.data;
        })
    }
    fetchAllUser(user){
        return axios.get(`user/fetch`,user)
    }
    createUser(userForm){
        return axios.post(`${AUTH_URL_API}signup`,userForm)
    }
    getUserById(id){
        return axios.get(`user/${id}`)
    }
  
    logout(){
        localStorage.removeItem(`user`)
    }

}
export default new AuthService()