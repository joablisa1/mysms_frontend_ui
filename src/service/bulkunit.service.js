import axios from 'axios';
import authHeader from './auth-header';

class BulkUnitService {

    getBulkUnitContent(params) {
      return axios.get( `bulkunit/all/page`,{ params ,headers: authHeader()});
    }
  
    getAll() {
        return axios.get("bulkunit/all",{ headers: authHeader() });
      }

      fetchBulkUniType(){
        return axios.get(`bulkunit/unitType`,{headers:authHeader()})
    }
 
      getBulkUnitById(id) {
        return axios.get(`bulkunit/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data) {
        return axios.post( "bulkunit/save", data,{ headers: authHeader() });
      }
    
      update(id, newdata) {
        return axios.put(`bulkunit/update/${id}`, newdata,{ headers: authHeader() });
      }
    
      deleteBulkUint(id) {
        return axios.delete(`bulkunit/remove/${id}`,{ headers: authHeader() });
      }
    
      deleteAll() {
        return axios.delete(`bulkunit`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new BulkUnitService();