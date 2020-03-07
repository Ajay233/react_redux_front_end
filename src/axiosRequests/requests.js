import axios from 'axios';

export const post = (endpoint, data) => {
  return axios.post(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const get = (endpoint, data) => {
  return axios.get(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const put = (endpoint, data) => {
  return axios.put(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const del = (endpoint, data) => {
  return axios.delete(
    `http://localhost:8080/${endpoint}`,
    data
  );
}
