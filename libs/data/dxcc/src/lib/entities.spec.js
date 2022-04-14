import { ENTITIES } from "./entities"
describe("CONTINENTS", () => {
  it("should have a list of continents", () => {
    expect(Object.keys(ENTITIES).length).toEqual(340)
  })
})
