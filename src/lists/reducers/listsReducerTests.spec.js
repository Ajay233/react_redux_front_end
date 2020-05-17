import { getCategories } from '../actions'
import { setListsReducer } from './index'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock("../../axiosRequests/axiosUtil")

describe("setListsReducer", () => {
  it("should update the lists store when the action from getCategories is passed in", () => {
    const store = mockStore({})

    const initialState = {
      categories: []
    }

    const expectedState = {
      categories: [ "item1", "item2", "item3" ]
    }


    return store.dispatch(getCategories("lookup/quizCategories", "jwt")).then(() => {
      const newState = setListsReducer(initialState, store.getActions()[0])
      return newState
    })

    expect(newState).toEqual(expectedState)
  })

  it("should return the initialState when no actions are recognised", () => {
    const store = mockStore({})

    const initialState = {
      categories: []
    }

    const action = {
      type: "UNRECOGNISED_TYPE"
    }

    const newState = setListsReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
