import axios from 'axios';
import authHeader from './auth-header'; 
 
//const API_URL = 'http://localhost:8080/api/v1/';
//const API_URL = process.env.VUE_APP_API_URL;

// eslint-disable-next-line no-unused-vars
class BulksmsService {
  
   async createBulkSMS(bulksms, onUploadProgress) {
   
    const formData = new FormData();
    formData.append('bulksms', JSON.stringify(bulksms));
    formData.append('file', bulksms.file);
  
    const config = {
      headers: {
        ...authHeader() ,
        'Content-Type': 'multipart/form-data',},
      onUploadProgress
    };
  
    const { data } =  await axios.post(`bulksms/sendbulksms`, formData, config);
    console.log(data);
    return data;
  }

  // async createBulkSMS1(bulksms, onUploadProgress) {
   
  //   const formData = new FormData();
  //   formData.append('bulksms', bulksms);
  //   formData.append('file', bulksms.files[0]);
    
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Bearer ' + token, // Replace 'token' with your actual token
  //     },
  //     body: formData
  //   };
    
  //   fetch('http://localhost:8080/api/v1/bulksms/create', options)
  //     .then(response => {
  //       // ...
  //     })
  //     .catch(error => {
  //       // ...
  //     });
  // }

  getXRSF() {
    let formData = new FormData();

    formData.append("test", "test");

    // return axios.post(API_URL+"bulksms/all", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //  });
     return axios.post( "bulksms/all", formData,{ headers: authHeader() });

   }
    
   getUploadFile(file,xmatching,onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return axios.post( "bulksms/upload1", formData, {
       headers: {
        withCredentials:false,
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "multipart/form-data",
        ...authHeader()
       // "X-MATCHI_ID": xmatching
      },
      onUploadProgress
     });
    //  return axios.post(API_URL+ "bulksms/all", formData,{ headers: authHeader() });

   }

   createBulkSmsWithUpload(file,payload,onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("bulksms",payload);

    return axios.post( "bulksms/sendbulksms1", formData, {
       headers: {
        withCredentials:false,
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "multipart/form-data",
        ...authHeader()
      },
      onUploadProgress
     });
    //  return axios.post(API_URL+ "bulksms/all", formData,{ headers: authHeader() });

   }

   createBulkWithGroup(bulksms){
    return axios.post( "bulksms/group/send", bulksms,{ headers: authHeader() });
   }

   createBulkWithContacts(bulksms){
    return axios.post( "bulksms/contact/send", bulksms,{ headers: authHeader() });

    }

    getBillings() {
      return axios.get( 'billing/all',{ headers: authHeader() });
    }
  
    getUserBoard() {
      return axios.get( 'user', { headers: authHeader() });
    }
  
    getModeratorBoard() {
      return axios.get( 'mod', { headers: authHeader() });
    }
  
    getAdminBoard() {
      return axios.get( 'admin', { headers: authHeader() });
    }

    getAll(params) {
        // return axios.get(API_URL+"bulksms/all",{ headers: authHeader() });
        return axios.get( 'bulksms/all',{ params ,headers: authHeader()});
      }
 
      get(id) {
        return axios.get(`/tutorials/${id}`);
      }

    //POST /api/v1/orgs/create
      create(data) {
        return axios.post( "bulksms/sendbulksms1", data,{ headers: authHeader(),'Content-Type': 'multipart/form-data' });
      }
    
      update(id, data) {
        return axios.put(`/tutorials/${id}`, data);
      }
    
      delete(id) {
        return axios.delete(`/tutorials/${id}`);
      }
    
      deleteAll() {
        return axios.delete(`/tutorials`);
      }
    
      findByTitle(title) {
        return axios.get(`/tutorials?title=${title}`);
      }
  }

  export default new BulksmsService();