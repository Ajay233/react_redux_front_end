import axios from 'axios';
import { setDefault } from './axiosUtil'

export const post = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.post(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const postUsingParams = (endpoint, params, token=null) => {
  setDefault(token, axios);
  return axios.post(
    `http://localhost:8080/${endpoint}`,
    null,
    { params: params }
  );
}

export const get = (endpoint, token=null) => {
  setDefault(token, axios);
  return axios.get(
    `http://localhost:8080/${endpoint}`
  );
}

export const getUsingParams = (endpoint, customParams, token=null) => {
  setDefault(token, axios);
  return axios.get(
    `http://localhost:8080/${endpoint}`,
    { params: customParams }
  );
}

export const asyncGetUsingParams = async (endpoint, customParams, token=null) => {
  setDefault(token, axios);
  const response = await axios.get(
    `http://localhost:8080/${endpoint}`,
    { params: customParams }
  )
  return response
}

export const put = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.put(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const del = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.delete(
    `http://localhost:8080/${endpoint}`,
    data
  );
}
