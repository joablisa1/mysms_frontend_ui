import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://143.198.76.119:8080/api/v1/';
// const API_URL = 'http://143.198.76.119:8080/api/v1/';
///const API_URL = 'http://localhost:8080/api/v1/'; 

class SmsService {

  getServiceStats(params) { 
    const url = `service/stats/${params.year}/${params.month}`;
    const headers = authHeader();
  return axios.get(url, { headers }); 
 }
    getOrganizations() {
      return axios.get('all');
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

    getAllServices() {      
      return axios.get('service/fetchall',{ headers: authHeader()});
      
    }

    g
    getServicesByOrganization(id) {
      return axios.get(`service/fetch/${id}`,{ headers: authHeader() });
    }


    getAll(params) { 
        return axios.get('service/all',{ params ,headers: authHeader()});
    }
 
     get(id) {
        return axios.get(`service/${id}`,{ headers: authHeader() });
    }
   
      create(data) {
        return axios.post("service/add", data,{ headers: authHeader() });
      }
    
      updateService(id, data) {
        return axios.patch(`service/${id}`, data,{ headers:authHeader() });
      }
    
      deleteService(id) {
        return axios.delete(`service/remove/${id}`,{ headers:authHeader() });
      }
      
      deleteAll() {
        return axios.delete(`service/remove`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new SmsService();