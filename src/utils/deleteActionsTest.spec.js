import { deleteQuizFromCategory } from './deleteActions'

describe("deleteQuizFromCategory", () => {
  it("should find the category and delete a quiz from that category's quizlist", () => {
    let state = [
      {
        category: "test1",
        quizList: [
          {id: 1, name: "testQuiz1", description: "quiz1", category: "test1", status: "DRAFT"},
          {id: 2, name: "testQuiz2", description: "quiz2", category: "test1", status: "DRAFT"},
          {id: 3, name: "testQuiz3", description: "quiz3", category: "test1", status: "DRAFT"}
        ]
      },
      {
        category: "test2",
        quizList: [
          {id: 4, name: "testQuiz1", description: "quiz1", category: "test2", status: "DRAFT"},
          {id: 5, name: "testQuiz2", description: "quiz2", category: "test2", status: "DRAFT"},
          {id: 6, name: "testQuiz3", description: "quiz3", category: "test2", status: "DRAFT"}
        ]
      },
      {
        category: "test3",
        quizList: [
          {id: 7, name: "testQuiz1", description: "quiz1", category: "test3", status: "DRAFT"},
          {id: 8, name: "testQuiz2", description: "quiz2", category: "test3", status: "DRAFT"},
          {id: 9, name: "testQuiz3", description: "quiz3", category: "test3", status: "DRAFT"}
        ]
      }
    ]

    let expectedResult = [
      {
        category: "test1",
        quizList: [
          {id: 1, name: "testQuiz1", description: "quiz1", category: "test1", status: "DRAFT"},
          {id: 2, name: "testQuiz2", description: "quiz2", category: "test1", status: "DRAFT"},
          {id: 3, name: "testQuiz3", description: "quiz3", category: "test1", status: "DRAFT"}
        ]
      },
      {
        category: "test2",
        quizList: [
          {id: 4, name: "testQuiz1", description: "quiz1", category: "test2", status: "DRAFT"},
          {id: 6, name: "testQuiz3", description: "quiz3", category: "test2", status: "DRAFT"}
        ]
      },
      {
        category: "test3",
        quizList: [
          {id: 7, name: "testQuiz1", description: "quiz1", category: "test3", status: "DRAFT"},
          {id: 8, name: "testQuiz2", description: "quiz2", category: "test3", status: "DRAFT"},
          {id: 9, name: "testQuiz3", description: "quiz3", category: "test3", status: "DRAFT"}
        ]
      }
    ]

    const result = deleteQuizFromCategory(state, state[1].quizList[1])
    expect(result).toEqual(expectedResult)
  })
})
