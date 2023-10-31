import axios from 'axios';
import authHeader from './auth-header';

class MessagesService {

    getAllMessage(params) {
      return axios.get('message/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("message/all",{ headers: authHeader() });
      }

      fetchTelcoType(){
        return axios.get(`message/telcoType`,{headers:authHeader()})
    }
 
      getById(id) {
        return axios.get(`message/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post("message/save", data,{ headers: authHeader()});
      }
    
      update(id, data){
        return axios.put(`message/update/${id}`,data,{ headers: authHeader()});
      }
    
      delete(id){
        return axios.delete(`message/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`message`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new  MessagesService();