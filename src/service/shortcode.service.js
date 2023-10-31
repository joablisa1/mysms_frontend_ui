import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/v1/';
//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
// eslint-disable-next-line no-unused-vars
class ShortcodeService {

  getOrganizations() {
    return axios.get('all');
  }

  getUserBoard() {
    return axios.get('user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get('mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get('admin', { headers: authHeader() });
  }

  getAll(params) {
    // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
    return axios.get('shortcode/all', { params, headers: authHeader() });

  }

  getAllSC() {
    // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
    return axios.get('shortcode/fetchall', { headers: authHeader() });

  }

  getAllSCByOrg(id) {
    // return axios.get(API_URL+"shortcode/all",{ headers: authHeader() });        
    return axios.get(`shortcode/fetch/${id}`, { headers: authHeader() });

  }

  getShortCodeByOrgId(id) {
    return axios.get(`shortcode/${id}`, { headers: authHeader() });
  }
  getShortCodeType() {
    return axios.get(`shortcode/shortCodeType`, { headers: authHeader() })
  }
  getShortCodeCategory() {
    return axios.get(`shortcode/shortCodeCategory`, { headers: authHeader() })
  }
  getTelcoType() {
    return axios.get(`shortcode/telcoType`, { headers: authHeader() })
  }
  getShortCodeById(id) {
    return axios.get(`shortcode/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post("shortcode/add", data, { headers: authHeader() });
  }

  updateShortCode(id, data) {
    return axios.patch(`shortcode/${id}`, data, { headers: authHeader() });
  }

  deleteShortCode(id) {
    return axios.delete(`shortcode/remove/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(`shortcode`, { headers: authHeader() });
  }

  findByTitle(title) {
    return axios.get(`/tutorials?title=${title}`);
  }
}
export default new ShortcodeService();
