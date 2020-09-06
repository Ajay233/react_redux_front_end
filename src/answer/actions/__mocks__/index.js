export const getAnswers = jest.fn()

export const setCurrentAnswer = jest.fn()

export const deleteAnswer = jest.fn()

export const addAnswer = jest.fn(() => { return { type: "ADD_ANSWER", payload: {} } })

export const updateAnswer = jest.fn()
