import { fadeOut, timedFunc } from './display'

describe("timedFunc", () => {
  it("can call a passed in function after a set time", () => {

    jest.useFakeTimers()

    timedFunc(1000)

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

  })
})

describe("fadeOut", () => {
  it("can call a passed in function after a set time", () => {

    jest.useFakeTimers()

    fadeOut("someElement")

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);

  })
})
