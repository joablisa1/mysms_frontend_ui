import axios from 'axios';
import authHeader from './auth-header';
 
//const API_URL = 'http://localhost:8080/api/v1/';
//const API_URL = 'http://143.198.76.119:8080/api/v1/'; 
class SummaryService {


    getTotalSubscriptionsAvg(startMonth,endMonth,year) {
        const URL = `subscription/countSubscriptions/${year}/${startMonth}/${endMonth}`;
        // return axios.get(API_URL + 'subscription/countSubscriptions', { headers: authHeader() });      
        return axios.get(URL, { headers: authHeader() });
      }

      getTotalSmsSummaryAvg(startMonth,organization,year) {
        const URL = `summary/outbox/stats/${year}/${startMonth}/${organization}`;   
        return axios.get(URL, { headers: authHeader() });
      }

      //move this to outbox service
      getTotalRevenue(params) { 
        return axios.get('outbox/revenue-summary-month-year', { params ,headers: authHeader() });
      }
  
      //move this to outbox service
      getTotalRevenueOrgsSummary(params) { 
        return axios.get('outbox/revenue-summary-year-month', { params ,headers: authHeader() });
      }

      getTotalsmsTraffics(){
        return axios.get('summary/countInbox', { headers: authHeader() });
      }

      getTotalServices(){
        return axios.get('summary/countSmsService', { headers: authHeader() });
      }


}
export default new SummaryService();