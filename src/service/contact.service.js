import axios from 'axios';
import authHeader from './auth-header';

class ContactService {

    getContact(params) {
      return axios.get( 'contact/all/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("contact/all",{ headers: authHeader() });
      }
 
      getContactById(id) {
        return axios.get(`contact/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post( "contact/save", data,{ headers: authHeader()});
      }
    
      update(id, contact){
        return axios.put(`contact/update/${id}`,contact,{ headers: authHeader()});
      }
    
      deleteContact(id){
        return axios.delete(`contact/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`contact`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }

      getOneContact(params) {
        return axios.get( 'contact/fetchcontact',{ params ,headers: authHeader()});
      }
  }

  export default new ContactService();