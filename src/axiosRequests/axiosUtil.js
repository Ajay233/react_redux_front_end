export const setDefault = (token, axios) => {
  if (token !== null){
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
