import axios from 'axios';
import authHeader from './auth-header';

class PollChoiceService {

  getAllPollChoice(params){
    return axios.get('pollchoice/fetch/page',{params, headers: authHeader()});
  }

  getAll() {
    return axios.get("pollchoice/all", {headers: authHeader() });
  }

  getById(id) {
    return axios.get(`pollchoice/${id}`, {headers: authHeader() });
  }
  //POST /api/v1/orgs/create
  create(data) {
    return axios.post("pollchoice/save", data, { headers: authHeader() });
  }

  getAllSC() {
    // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
    return axios.get('pollchoice/fetchall', { headers: authHeader() });

  }

  getAllSCByOrg(id) {
    // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
    return axios.get(`pollchoice/fetch/${id}`, { headers: authHeader() });

  }

  update(id, data) {
    return axios.put(`pollchoice/update/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(`pollchoice/remove/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(`pollchoice`);
  }

  findByTitle(title) {
    return axios.get(`/tutorials?title=${title}`);
  }
}

export default new PollChoiceService();