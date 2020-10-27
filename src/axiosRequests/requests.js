import axios from 'axios';
import { setDefault } from './axiosUtil'
// const url = "https://quiz-manager-api.herokuapp.com"
const url = "http://localhost:8080"

export const post = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.post(
    `${url}/${endpoint}`,
    data
  );
}

export const postUsingParams = (endpoint, params, token=null) => {
  setDefault(token, axios);
  return axios.post(
    `${url}/${endpoint}`,
    null,
    { params: params }
  );
}

export const get = (endpoint, token=null) => {
  setDefault(token, axios);
  return axios.get(
    `${url}/${endpoint}`
  );
}

export const getUsingParams = (endpoint, customParams, token=null) => {
  setDefault(token, axios);
  return axios.get(
    `${url}/${endpoint}`,
    { params: customParams }
  );
}

export const asyncGetUsingParams = async (endpoint, customParams, token=null) => {
  setDefault(token, axios);
  const response = await axios.get(
    `${url}/${endpoint}`,
    { params: customParams }
  )
  return response
}

export const put = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.put(
    `${url}/${endpoint}`,
    data
  );
}

export const del = (endpoint, data={}, token=null) => {
  setDefault(token, axios);
  return axios.delete(
    `${url}/${endpoint}`,
    data
  );
}
