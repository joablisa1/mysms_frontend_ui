import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
//const API_URL = 'http://localhost:8080/api/v1/';
// eslint-disable-next-line no-unused-vars
class OutboxService {
  getRevenueStatsYear(params) {
    // const url = `outbox/stats/revenue/`;
  //   const headers = authHeader();
  //  return axios.get(url, { headers });

   const url = `outbox/stats/revenue`;
    const headers = authHeader();
    
    const queryParams = new URLSearchParams();
    queryParams.append('organizationId', params.organization);
    queryParams.append('targetYear', params.year);
    
    return axios.get(url + '?' + queryParams.toString(), { headers });
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
//GET
//api/v1/mt/all
    getAll(params) {
        // return axios.get(API_URL+"outbox/all",{ headers: authHeader() });
        // return axios.get(API_URL + 'outbox/all',{ params ,headers: authHeader()});
        return axios.get('outbox/all',{ params ,headers: authHeader()});
      }
 
      get(id) {
        return axios.get(`/tutorials/${id}`);
      }
    //POST /api/v1/orgs/create
      create(data) {
        return axios.post("orgs/create", data,{ headers: authHeader() });
      }
    
      update(id, data) {
        return axios.put(`outbox/${id}`, data);
      }
    
      delete(id) {
        return axios.delete(`outbox/remove/${id}`);
      }
    
      deleteAll() {
        return axios.delete(`outbox`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
//http://localhost:8080/api/v1/outbox/summary-organization-messagebox?page=1&size=2
      getOutboxesAllRoot(page = 1, size = 10) {
        const URL = `outbox/summary-organization-messagebox?page=${page}&size=${size}`;
        return axios.get(URL, { headers: authHeader() });
      }
  }

  export default new OutboxService();