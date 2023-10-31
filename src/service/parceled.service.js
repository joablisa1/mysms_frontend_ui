import axios from 'axios';
import authHeader from './auth-header';

class ParcelService {

    getAllParcels(params) {
      return axios.get( 'parcel/fetch/page',{ params ,headers: authHeader()});
    }
   
    getAll(){
        return axios.get("parcel/all",{ headers: authHeader() });
      }
 
      getById(id) {
        return axios.get(`parcel/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data){
        return axios.post( "parcel/save", data,{ headers: authHeader()});
      }
    
      update(id, data){
        return axios.put(`parcel/update/${id}`,data,{ headers: authHeader()});
      }
    
      delete(id){
        return axios.delete(`parcel/remove/${id}`,{ headers: authHeader()});
      }
    
      deleteAll() {
        return axios.delete(`parcel`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new ParcelService();