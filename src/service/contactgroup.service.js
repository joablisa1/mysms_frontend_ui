import axios from 'axios';
import authHeader from './auth-header';


class ContactGroupService {


    getAllContactGroup(params) {
      return axios.get( 'group/all/page',{ params ,headers: authHeader()});
    }
  
    getAll() {
        return axios.get("group/all",{ headers: authHeader() });
      }
 
      getContactGroupById(id) {
        return axios.get(`group/${id}`,{ headers: authHeader() });
      }
    //POST /api/v1/orgs/create
      create(data) {
        return axios.post( 'group/save', data,{ headers: authHeader() });
      }
    
      update(id, data) {
        return axios.put(`group/update/${id}`,data,{ headers: authHeader() });
      }
    
      deleteContactGroup(id) {
        return axios.delete(`group/remove/${id}`,{ headers: authHeader() });
      }
    
      deleteAll() {
        return axios.delete(`group`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }

      getContactGroupsByOrganization(params) {
        return axios.get( 'group/organization/'+params.organizationId,{ params ,headers: authHeader()});
      }
  }

  export default new ContactGroupService();