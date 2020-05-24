import { getCategories } from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { sessionExpired } from "../../utils/session"
import mockAxios from 'jest-mock-axios'

jest.mock("../../axiosRequests/axiosUtil")
jest.mock("../../utils/session")

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("getCategories", () => {

  afterEach(() => {
    mockAxios.reset()
  })

  it("should return an action to set the list state", () => {
    const store = mockStore({})

    const expectedAction = {
      type: "SET_CATEGORIES",
      payload: [ "item1", "item2", "item3" ]
    }

    const requestResponse = {
      data: [ "item1", "item2", "item3" ]
    }

    store.dispatch(getCategories("lookup/quizCategories", "jwt"))
    mockAxios.mockResponse(requestResponse)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(store.getActions()[0]).toEqual(expectedAction)

  })

  it("should call session expired if a 403 status error is recieved", () => {
    const store = mockStore({})

    const errorResponse = {
      response: {
        status: 403
      }
    }

    store.dispatch(getCategories("sessionExpired", "jwt"))
    mockAxios.mockError(errorResponse)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(sessionExpired).toHaveBeenCalledTimes(1);
  })
})
