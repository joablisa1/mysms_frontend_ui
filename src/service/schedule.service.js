import axios from 'axios';
import authHeader from './auth-header';

//  const API_URL = 'http://143.198.76.119:8080/api/v1/';
//const API_URL = 'http://localhost:8080/api/v1/';
// eslint-disable-next-line no-unused-vars
/**
 * GET
/api/v1/scheduler/jobs
 *///api/v1/scheduler/jobs
class ScheduleService {

  getSchedlues() {
    return axios.get('scheduler/jobs',{ headers: authHeader() });
  }

  createSchedule(data) {
     return axios.post("scheduler/schedule", data,{ headers: authHeader() });
  }
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
  }

  export default new ScheduleService();