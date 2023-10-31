import http from "../common/http-common";
//const API_URL = 'http://localhost:8080/api/v1/bulksms';
const API_URL = 'http://143.198.76.119:8080/api/v1/';

class UploadFilesService {
  

  upload(file, onUploadProgress) {
    let formData = new FormData();
    
    formData.append("file", file);

    return http.post(API_URL+"/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
