import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
//const API_URL = 'http://localhost:8080/api/v1/';
// eslint-disable-next-line no-unused-vars
class SubscriptionService {
  
 
    getSubscriptionStats(params) { 
       const url = `subscription/stats/${params.year}/${params.month}`;
       const headers = authHeader();
     return axios.get(url, { headers }); 
    }
    getSubscriptions(params) {
      return axios.get('subscription/all',{ params ,headers: authHeader()});
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

    createSubscritpion(data){
      return axios.post("subscription/add", data,{ headers: authHeader() });
    }

    getTotalSubscriptions() {
      return axios.get('subscription/countSubscriptions', { headers: authHeader() });
    }
    getSubscriptionById(id){
      return axios.get(`subscription/${id}`,{ headers:authHeader() });
    }

    getSubscriptionByType(){
      return axios.get('subscription/subscriptionType',{headers: authHeader()});
    }

    updateSubscriptions(id, data) {
      return axios.patch(`subscription/${id}`, data,{ headers:authHeader() });
    }
  
    deleteSubscriptionById(id) {
      return axios.delete(`subscription/remove/${id}`,{ headers:authHeader() });
    }
  
    deleteAll() {
      return axios.delete(`subscription/remove`);
    }
  
    
    getTotalSubscriptionsAvg(startMonth,endMonth,year) {
      const URL = `subscription/countSubscriptions/${year}/${startMonth}/${endMonth}`;    
      return axios.get(URL, { headers: authHeader() });
    }
 
    getTotalRevenue(params) { 
      return axios.get('outbox/revenue-summary-month-year', { params ,headers: authHeader() });
    }

   
    getTotalRevenueOrgsSummary(params) { 
      return axios.get('outbox/revenue-summary-year-month', { params ,headers: authHeader() });
    }
    
  }

  export default new SubscriptionService();