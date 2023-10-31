import axios from 'axios';
import authHeader from './auth-header';

class GeneralInfoService {

    getGeneralList(params) {
      return axios.get( 'generalInfo/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get(`generalInfo/all`,{ headers: authHeader() });
      }
 
      getById(id) {
        return axios.get(`generalInfo/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post( "generalInfo/save", data,{ headers: authHeader()});
      }
    
      update(id, data){
        return axios.put(`generalInfo/update/${id}`,data,{ headers: authHeader()});
      }
    
      delete(id){
        return axios.delete(`generalInfo/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`generalInfo`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new GeneralInfoService();