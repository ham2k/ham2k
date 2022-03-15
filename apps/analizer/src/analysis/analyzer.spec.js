import analyzeAll from "./analyzer"
import fs from "fs"
import path from "path"
import { cabrilloToQSON } from "@ham2k/qson/cabrillo"

const iaru = fs.readFileSync(
  path.join(__dirname, "../../../../libs/qson/cabrillo/src/lib/samples/arrldx-cw.log"),
  "utf8",
  (err, data) => data
)
const qson = cabrilloToQSON(iaru)

describe("analyzeAll", () => {
  it("should analyze a contest", () => {
    const results = analyzeAll(qson)
    expect(results.times.periods.length).toEqual(3)
    expect(results.times.periods[0].start).toEqual("2022-02-19 13:07Z")
    expect(results.times.periods[0].end).toEqual("2022-02-19 13:26Z")
    expect(results.times.periods[0].endMillis - results.times.periods[0].startMillis).toEqual(19 * 60 * 1000)
    expect(results.times.periods[0].activeMinutes).toEqual(20)
    expect(results.times.periods[0].inactiveMinutes).toEqual(66)
    expect(results.times.periods[0].qsos.length).toEqual(8)

    expect(results.times.periods[1].start).toEqual("2022-02-19 14:33Z")
    expect(results.times.periods[1].end).toEqual("2022-02-19 14:33Z")
    expect(results.times.periods[1].endMillis - results.times.periods[1].startMillis).toEqual(0)
    expect(results.times.periods[1].activeMinutes).toEqual(1)
    expect(results.times.periods[1].inactiveMinutes).toEqual(519)
    expect(results.times.periods[1].qsos.length).toEqual(1)

    expect(results.times.periods[2].start).toEqual("2022-02-19 23:13Z")
    expect(results.times.periods[2].end).toEqual("2022-02-19 23:42Z")
    expect(results.times.periods[2].endMillis - results.times.periods[2].startMillis).toEqual(29 * 60 * 1000)
    expect(results.times.periods[2].activeMinutes).toEqual(30)
    expect(results.times.periods[2].qsos.length).toEqual(16)

    expect(results.times.activeMinutes).toEqual(51)
    expect(results.times.inactiveMinutes).toEqual(66 + 519)
  })
})
