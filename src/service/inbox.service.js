import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
//const API_URL = 'http://localhost:8080/api/v1/';
// eslint-disable-next-line no-unused-vars
class InboxService {
///api/v1/inbox/all
    getAllInbox(params) {
      // return axios.get(API_URL + 'inbox/all',{ headers: authHeader() });
      return axios.get('inbox/all',{ params ,headers: authHeader()});
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

    getAll() {
        return axios.get("inbox/all",{ headers: authHeader() });
      }
 
      get(id) {
        return axios.get(`/tutorials/${id}`);
      }
    //GET
//api/v1/inbox/all
      create(data) {
        return axios.post( "orgs/create", data,{ headers: authHeader() });
      }
    
      update(id, data) {
        return axios.put(`/tutorials/${id}`, data);
      }
    
      delete(id) {
        return axios.delete(`/tutorials/${id}`);
      }
    
      deleteAll() {
        return axios.delete(`/tutorials`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new InboxService();