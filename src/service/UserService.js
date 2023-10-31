import axios from "axios";
import authHeader from "./auth-header";
class UserService{

    getAll(params) {
        // return axios.get(API_URL+"users/all",{ headers: authHeader() });
        return axios.get( 'users/all',{ params ,headers: authHeader()});
      }
      getUserbyId(id){
        return axios.get(`users/${id}`,{headers: authHeader()});
      }
      updateUser(id,data){
        return axios.patch(`users/${id}`,data,{headers: authHeader()});
        
      }
      removeUser(id){
        return axios.delete(`users/remove/${id}`,{headers: authHeader()});
      }
    
      create(data) {
        return axios.post("users/add", data,{ headers: authHeader() });
      }

}
export default new UserService()