// prep for eventual switch from mocked axios requests to
// mocks of my custom axios request wrapper functions

export const put = jest.fn((endpoint, data=null, jwt=null) => {
  console.log(endpoint)
  console.log(data)
  console.log(jwt)
  if(endpoint === "quiz/updateStatus" && jwt === "Jwt"){
    return Promise.resolve({
      data: {
        id: "1",
        name: "Test",
        description: "Test description",
        category: "Test category",
        status: "READY"
      }
    })
  } else if(endpoint === "users/updatePassword"){
    return Promise.resolve({
      data: "UPDATED"
    }).catch(() => { return })
  } else if(jwt === "expiredJwt"){
    return Promise.reject({
      response: {
        status: 403
      }
    })
  } else {
    return Promise.reject({
      response: {
        data: "Error"
      }
    })
  }
})
