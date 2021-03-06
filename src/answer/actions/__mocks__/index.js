export const getAnswers = jest.fn()

export const setCurrentAnswer = jest.fn()

export const deleteAnswer = jest.fn(() => { return { type: "DELETE_ANSWER", payload: {} } })

export const addAnswer = jest.fn(() => { return { type: "ADD_ANSWER", payload: {} } })

export const updateAnswer = jest.fn(() => { return { type: "UPDATE_ANSWER", payload: {} } })
