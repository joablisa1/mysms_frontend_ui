import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
//const API_URL = 'http://localhost:8080/api/v1/'; 
class RoleService { 
    getRoles() {
      return axios.get('roles/fetch', { headers: authHeader() });
    }
  
    getUserBoard() {
      return axios.get('user', { headers: authHeader() });
    }
  
    getModeratorBoard() {
      return axios.get('mod', { headers: authHeader() });
    }
  
    getAdminBoard() {
      return axios.get('admin', { headers: authHeader() });
    }
  }

  export default new RoleService();