import axios from 'axios';
import authHeader from './auth-header';

class PollService {

    getAllPolls(params) {
      return axios.get( 'poll/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("poll/all",{ headers: authHeader() });
      }
 
      getById(id) {
        return axios.get(`poll/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post( "poll/save", data,{ headers: authHeader()});
      }
    
      update(id, data){
        return axios.put(`poll/update/${id}`,data,{ headers: authHeader()});
      }
    
      delete(id){
        return axios.delete(`poll/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`poll`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new PollService();