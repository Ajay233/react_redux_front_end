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
    } else if(url === "http://localhost:8080/lookup/quizCategories"){
      return Promise.resolve({
        data: [ "item1", "item2", "item3" ]
      })
    } else if(url === "http://localhost:8080/question/findByQuizId"){
      return Promise.resolve({
        data: [{ id: 1, questionNumber: 1 }, { id: 2, questionNumber: 2 }, { id: 3, questionNumber: 3 }]
      })
    } else if(url === "http://localhost:8080/sessionExpired"){
        return Promise.reject({
          response: {
            status: 403
          }
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
  put: jest.fn((url) => {
    if(url === "http://localhost:8080/quiz/updateStatus"){
      return Promise.resolve({
        data: {
          id: "1",
          name: "Test",
          description: "Test description",
          category: "Test category",
          status: "READY"
        }
      })
    } else if(url === "http://localhost:8080/sessionExpired"){
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
  }),
  delete: jest.fn((url) => {}),
  create: jest.fn(function () {
    return this;
  })
}
