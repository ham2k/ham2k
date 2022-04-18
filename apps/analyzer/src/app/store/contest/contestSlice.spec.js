import contestReducer, { selectContestQSOs, setQSOs } from "./contestSlice"

describe("contest reducer", () => {
  const initialState = {
    qsos: undefined,
    refs: undefined,
    status: "idle",
  }

  it("should handle initial state", () => {
    expect(contestReducer(undefined, { type: "unknown" })).toEqual({
      qsos: undefined,
      refs: undefined,
      status: "idle",
    })
  })

  it("should handle setQSOs", () => {
    const actual = contestReducer(initialState, setQSOs([]))
    expect(actual.qsos).toEqual([])
  })
})
