import axios from "axios";
import {config} from "../Constants"

const axiosClient = axios.create({
  baseURL: config.url.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 2000

});

axiosClient.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    'Authorization': sessionStorage.getItem('jwt-token') ? `Bearer ${sessionStorage.getItem('jwt-token')}` : null
  };
  return request;
});

axiosClient.interceptors.response.use(response => response, (error) => {
  if (!error?.response) {
    console.log('Unexpected Server Error')
  }
  if (error.response?.status === 404) {
    console.log("Cannot find the resource")
  } else if (error.response?.status === 401)  {
    console.log("Bad credentials - Unauthorized")
  } else if (error.response?.status === 409) {
    console.log('Resource already exists')
  } else {
    console.log('Bad request')
  }
});

export default axiosClient;
