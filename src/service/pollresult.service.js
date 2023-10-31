import axios from 'axios';
import authHeader from './auth-header';

class PollResultService {

    getAllPollResult(params) {
      return axios.get('pollresult/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("pollresult/all",{ headers: authHeader() });
      }
 
      getById(id) {
        return axios.get(`pollresult/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post("pollresult/save", data,{ headers: authHeader()});
      }
    
      update(id, data){
        return axios.put(`pollresult/update/${id}`,data,{ headers: authHeader()});
      }
      getAllSC() {
        // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
        return axios.get('pollresult/fetchall', { headers: authHeader() });
    
      }
    
      getAllSCByOrg(id) {
        // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
        return axios.get(`pollresult/fetch/${id}`, { headers: authHeader() });
    
      }
    
      delete(id){
        return axios.delete(`pollresult/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`pollresult`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new PollResultService();