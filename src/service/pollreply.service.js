import axios from 'axios';
import authHeader from './auth-header';

class PollReplyService {

  getAllPollReply(params) {
    return axios.get(`pollreply/fetch/page`, { params, headers: authHeader() });
  }

  getAll() {
    return axios.get("pollreply/all", { headers: authHeader() });
  }

  getById(id) {
    return axios.get(`pollreply/${id}`, { headers: authHeader() });
  }
  //POST /api/v1/orgs/create
  create(data) {
    return axios.post("pollreply/save", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(`pollreply/update/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(`pollreply/remove/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(`pollreply`);
  }

  findByTitle(title) {
    return axios.get(`/tutorials?title=${title}`);
  }
}

export default new PollReplyService();