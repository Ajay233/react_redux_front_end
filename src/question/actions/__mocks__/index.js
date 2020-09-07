export const getQuestions = jest.fn()

export const setCurrentQuestion = jest.fn()

export const deleteQuestion = jest.fn()

export const addQuestion = jest.fn(() => {return { type: "ADD_QUESTION", payload:{} }})

export const updateQuestion = jest.fn(() => {return { type: "UPDATE_QUESTION", payload:{} }})

export const clearQuestions = jest.fn()
