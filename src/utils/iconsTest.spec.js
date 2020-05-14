import { isIconRequired, iconPicker } from './icons'

describe("isIconRequired", () => {
  it("can return true if the given name matches", () => {
    expect(isIconRequired("verifyProcess")).toEqual(true)
    expect(isIconRequired("verifySuccess")).toEqual(true)
    expect(isIconRequired("verifyError")).toEqual(true)
    expect(isIconRequired("nonMatchingName")).toEqual(false)
  })
})

describe("iconPicker", () => {
  it("can return the corresponding icon filename", () => {
    expect(iconPicker("verifyProcess")).toEqual("mail-sent.png")
    expect(iconPicker("verifySuccess")).toEqual("mail-success.png")
    expect(iconPicker("verifyError")).toEqual("mail-error.png")
    expect(iconPicker("nonMatchingName")).toEqual(null)
  })
})
