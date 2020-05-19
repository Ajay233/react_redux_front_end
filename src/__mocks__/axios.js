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
    } else if(url === "http://localhost:8080/quiz/getAll"){
      return Promise.resolve({
        data: [
          {
            category: "cat1",
            quizes: [
              {id: 1, name: "test1"},
              {id: 2, name: "test2"}
            ]
          },
          {
            category: "cat2",
            quizes: [
              {id: 3, name: "test3"},
              {id: 4, name: "test4"}
            ]
          }
        ]
      })
    } else if(url === "http://localhost:8080/quiz/findByName"){
        return Promise.resolve({
          data: [
            {id: 1, name: "test1", status: "DRAFT"},
            {id: 2, name: "test2", status: "DRAFT"},
            {id: 3, name: "test3", status: "DRAFT"}
          ]
        })
    } else if(url === "http://localhost:8080/quiz/findByCategory"){
        return Promise.resolve({
          data: [
            {id: 1, name: "test1", status: "READY"},
            {id: 2, name: "test2", status: "DRAFT"},
            {id: 3, name: "test3", status: "READY"}
          ]
        })
    } else if(url === "http://localhost:8080/users"){
        return Promise.resolve({
          data: [
            { id: 1, forename: "test" },
            { id: 2, forename: "test2" }
          ]
        })
    } else if(url === "http://localhost:8080/sessionExpired"){
        return Promise.reject({
          response: {
            status: 403
          }
        })
    } else {
      return Promise.reject({
        response:{
          status: 404,
          data: "Error"
        }
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
    console.log(url)
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
    } else if(url === "http://localhost:8080/users/updatePassword") {
      console.log("used axios fake put")
      return Promise.resolve({
          data: "UPDATED"
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
