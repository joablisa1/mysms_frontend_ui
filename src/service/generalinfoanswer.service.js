import axios from 'axios';
import authHeader from './auth-header';

class GeneralInfoAnswerService {

    getGeneralAnswer(params) {
      return axios.get('generalanswer/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("generalanswer/all",{ headers: authHeader() });
      }
 
      getById(id) {
        return axios.get(`generalanswer/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post( "generalanswer/save", data,{ headers: authHeader()});
      }

      update(id, data){
        return axios.put(`generalanswer/update/${id}`,data,{ headers: authHeader()});
      }
    
      delete(id){
        return axios.delete(`generalanswer/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`generalanswer`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new GeneralInfoAnswerService();