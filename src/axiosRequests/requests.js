import axios from 'axios';

export const setHeader = (token) => {
  console.log(token)
  let options = {headers: {'Content-Type': 'application/json'}};
  if (token !== null) {
    options.headers.Authorization = `Bearer ${token}`;
    console.log(options)
  }
  return options;
}

// instead of return I need to unset the authorization header
export const setDefault = (token) => {
  if (token !== null){
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const post = (endpoint, data={}, token=null) => {
  setDefault(token);
  return axios.post(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const get = (endpoint, token=null) => {
  setDefault(token);
  return axios.get(
    `http://localhost:8080/${endpoint}`
  );
}

export const getUsingParams = (endpoint, customParams, token=null) => {
  setDefault(token);
  return axios.get(
    `http://localhost:8080/${endpoint}`,
    { params: customParams }
  );
}

export const put = (endpoint, data={}, token=null) => {
  setDefault(token);
  return axios.put(
    `http://localhost:8080/${endpoint}`,
    data
  );
}

export const del = (endpoint, data={}, token=null) => {
  setDefault(token);
  return axios.delete(
    `http://localhost:8080/${endpoint}`,
    data
  );
}
