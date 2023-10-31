import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
// const API_URL = 'http://localhost:8080/api/v1/';

// eslint-disable-next-line no-unused-vars
class OrganizationService {

  getOrganizationStats(params) { 
    const url = `orgs/stats/${params.year}/${params.month}`;
    const headers = authHeader();
  return axios.get(url, { headers }); 
  }
    getOrganizations() {
      return axios.get( 'all');
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

    deleteOrg(id)  {
      return axios.delete(`orgs/remove/${id}`, { headers: authHeader() });
  }

    getAll(params) {
      const headers = authHeader();
      headers['X-API-KEY'] = 'cbtkey';
      headers['X-API-SECRET'] = 's3cr3t'; 
        return axios.get("orgs/all",{ headers ,  params: params});
      }
 
      get(id) {
        return axios.get(`orgs/${id}`,{ headers: authHeader() });
      } 

      create(data) {
        return axios.post("orgs/create", data,{ headers: authHeader() });
      }

      update(id, data){
        return axios.patch(`orgs/${id}`, data,{ headers: authHeader() });
      }
    
      delete(id){
        return axios.delete(`orgs/${id}`);
      }
    
      deleteAll() {
        return axios.delete(`/tutorials`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new OrganizationService();