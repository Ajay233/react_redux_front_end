module.exports = {
  get: jest.fn((url) => {
    if(url === "http://localhost:8080/answer/findByQuestionId"){
      return Promise.resolve({
        data: [
          {
            questionNumber: 1
          },
          {
            questionNumber: 2
          }
        ]
      })
    } else {
      return Promise.reject({
        data: "Error"
      })
    }
  }),
  post: jest.fn((url) => {
    if(url === "http://localhost:8080/auth/login"){
      return Promise.resolve({
        data: {
          user: {
            id: 1,
            forename: "Joe",
            surname: "Bloggs",
            email: "JoeBloggs@test.com",
            permission: "USER",
            verified: "true",
          },
          jwt: "jwtString"
        }
      })
    } else if(url === "http://localhost:8080/auth/loginUnverified"){
      return Promise.reject({
        response:{
          data: "NOT VERIFIED"
        }
      })
    } else if(url === "http://localhost:8080/auth/loginFailed"){
      return Promise.reject({
        response:{
          data: "Incorrect username or password"
        }
      })
    } else if(url === "http://localhost:8080/auth/verify"){
      return Promise.resolve({
        data: {
          completionStatus: "Verified"
        }
      })
    }else if(url === "http://localhost:8080/auth/verifyFailed"){
      return Promise.reject({
        response:{
          data: ""
        }
      })
    } else {
      return Promise.reject({
        data: "Error"
      })
    }
  }),
  put: jest.fn((url) => {}),
  delete: jest.fn((url) => {}),
  create: jest.fn(function () {
    return this;
  })
}
