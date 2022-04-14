import { CONTINENTS } from "./continents"
describe("CONTINENTS", () => {
  it("should have a list of continents", () => {
    expect(Object.keys(CONTINENTS)).toEqual(["AF", "AS", "EU", "NA", "OC", "SA", "AN"])
    expect(CONTINENTS["AS"]).toEqual("Asia")
  })
})
