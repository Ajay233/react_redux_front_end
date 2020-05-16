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
  post: jest.fn((url) => {}),
  put: jest.fn((url) => {}),
  delete: jest.fn((url) => {}),
  create: jest.fn(function () {
    return this;
  })
}
