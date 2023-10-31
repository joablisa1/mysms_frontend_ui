import axios from 'axios';
import authHeader from './auth-header';

 
 //const API_URL = 'http://143.198.76.119:8080/api/v1/';
 
 
//const API_URL = 'http://localhost:8080/api/v1/';

// eslint-disable-next-line no-unused-vars
class ContentService {

    getContentSchedules(params) {
       return axios.get( 'content/schedules/'+ params.organization,{ params ,headers: authHeader()});
    }
    getContents(params) {
      return axios.get( 'content/fetch',{ params ,headers: authHeader()});
    }
  
    getUserBoard() {
      return axios.get( 'user', { headers: authHeader() });
    }
  
    getModeratorBoard() {
      return axios.get( 'mod', { headers: authHeader() });
    }
  
    getAdminBoard() {
      return axios.get( 'admin', { headers: authHeader() });
    }

    getAll() {
        return axios.get("orgs/all",{ headers: authHeader() });
      }
 
      getContentById(id) {
        return axios.get(`content/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data) {
        return axios.post( "content/create", data,{ headers: authHeader() });
      }
    
      update(id, data) {
        return axios.put(`content/${id}`, data,data,{ headers: authHeader() });
      }
    
      deleteContent(id) {
        return axios.delete(`content/remove/${id}`,{ headers: authHeader() });
      }
    
      deleteAll() {
        return axios.delete(`content`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new ContentService();