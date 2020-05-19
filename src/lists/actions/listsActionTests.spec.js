import { getCategories } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from "../../utils/session"

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("getCategories", () => {

  it("should return an action to set the list state", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_CATEGORIES",
      payload: [ "item1", "item2", "item3" ]
    }

    return store.dispatch(getCategories("lookup/quizCategories", "jwt"))
      expect(store.getActions()[0]).toEqual(expectedAction)

  })

  it("should call session expired if a 403 status error is recieved", () => {
    const store = mockStore({})

    return store.dispatch(getCategories("sessionExpired", "jwt"))
    expect(sessionExpired).toHaveBeenCalledTimes(1);

  })
})
