import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://143.198.76.119:8080/api/test/';
const API_URL = 'http://localhost:8080/api/test/';
// eslint-disable-next-line no-unused-vars
class MessageService {

    getOrganizations() {
      return axios.get(API_URL + 'all');
    }
  
    getUserBoard() {
      return axios.get(API_URL + 'user', { headers: authHeader() });
    }
  
    getModeratorBoard() {
      return axios.get(API_URL + 'mod', { headers: authHeader() });
    }
  
    getAdminBoard() {
      return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
  }

  export default new MessageService();