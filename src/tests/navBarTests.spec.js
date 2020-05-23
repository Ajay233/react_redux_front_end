import React from 'react'
import NavBar from '../navBar'
import DropdownList from '../dropdown/dropdownList'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import history from '../history'

const mockStore = configureStore({})

describe("NavBar", () => {
  it("should render with just the options home and menu", () => {
    const store = mockStore({})

    const component = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it("should render render the drop down whe menu button is clicked", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"}
    })

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )

    wrapper.find('button').simulate('click')
    expect(wrapper.find(DropdownList)).toHaveLength(1)
  })

  it("should add an event listener when menu is clicked and remove it when clicked again", () => {
    const store = mockStore({
      userData: { id: 1, loggedIn: true, permission: "ADMIN"}
    })

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <NavBar />
        </Router>
      </Provider>
    )
    document.addEventListener = jest.fn()
    document.removeEventListener = jest.fn()

    const menu = wrapper.find('button').simulate('click')
    menu.simulate('click')
    expect(document.addEventListener).toHaveBeenCalledTimes(1)
    menu.simulate('click')
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
