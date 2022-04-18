import analyzeAll from "./analyzer"
import fs from "fs"
import path from "path"
import { cabrilloToQSON } from "@ham2k/qson/cabrillo"

const cabrillo = fs.readFileSync(
  path.join(__dirname, "../../../../libs/qson/cabrillo/src/lib/samples/arrldx-cw.log"),
  "utf8",
  (err, data) => data
)
const qson = cabrilloToQSON(cabrillo)

describe("analyzeAll", () => {
  it("should analyze a contest", () => {
    const results = analyzeAll(qson)
    expect(results.times.periods.length).toEqual(3)
    expect(results.times.periods[0].start).toEqual("2022-02-19T13:07:00Z")
    expect(results.times.periods[0].end).toEqual("2022-02-19T13:26:00Z")
    expect(results.times.periods[0].endMillis - results.times.periods[0].startMillis).toEqual(19 * 60 * 1000)
    expect(results.times.periods[0].activeMinutes).toEqual(20)
    expect(results.times.periods[0].inactiveMinutes).toEqual(66)
    expect(results.times.periods[0].qsos.length).toEqual(8)

    expect(results.times.periods[1].start).toEqual("2022-02-19T14:33:00Z")
    expect(results.times.periods[1].end).toEqual("2022-02-19T14:33:00Z")
    expect(results.times.periods[1].endMillis - results.times.periods[1].startMillis).toEqual(0)
    expect(results.times.periods[1].activeMinutes).toEqual(1)
    expect(results.times.periods[1].inactiveMinutes).toEqual(519)
    expect(results.times.periods[1].qsos.length).toEqual(1)

    expect(results.times.periods[2].start).toEqual("2022-02-19T23:13:00Z")
    expect(results.times.periods[2].end).toEqual("2022-02-19T23:42:00Z")
    expect(results.times.periods[2].endMillis - results.times.periods[2].startMillis).toEqual(29 * 60 * 1000)
    expect(results.times.periods[2].activeMinutes).toEqual(30)
    expect(results.times.periods[2].qsos.length).toEqual(16)

    expect(results.times.activeMinutes).toEqual(51)
    expect(results.times.inactiveMinutes).toEqual(66 + 519)
  })

  it("should analyze qsos in slices", () => {
    const results = analyzeAll(qson)

    expect(results.qsos.totals).toEqual({
      all: 25,
      "10m": 1,
      "20m": 8,
      "40m": 16,
    })
    expect(results.qsos.slices).toEqual({
      "2022-02-19T13:00:00.000Z": {
        start: "2022-02-19T13:00:00.000Z",
        startMillis: new Date("2022-02-19T13:00:00.000Z").valueOf(),
        qsos: { all: 3, "20m": 3 },
      },
      "2022-02-19T13:15:00.000Z": {
        start: "2022-02-19T13:15:00.000Z",
        startMillis: new Date("2022-02-19T13:15:00.000Z").valueOf(),
        qsos: { all: 5, "20m": 5 },
      },
      "2022-02-19T14:30:00.000Z": {
        start: "2022-02-19T14:30:00.000Z",
        startMillis: new Date("2022-02-19T14:30:00.000Z").valueOf(),
        qsos: { all: 1, "10m": 1 },
      },
      "2022-02-19T23:00:00.000Z": {
        start: "2022-02-19T23:00:00.000Z",
        startMillis: new Date("2022-02-19T23:00:00.000Z").valueOf(),
        qsos: { all: 2, "40m": 2 },
      },
      "2022-02-19T23:15:00.000Z": {
        start: "2022-02-19T23:15:00.000Z",
        startMillis: new Date("2022-02-19T23:15:00.000Z").valueOf(),
        qsos: { all: 10, "40m": 10 },
      },
      "2022-02-19T23:30:00.000Z": {
        start: "2022-02-19T23:30:00.000Z",
        startMillis: new Date("2022-02-19T23:30:00.000Z").valueOf(),
        qsos: { all: 4, "40m": 4 },
      },
    })
  })

  it("should analyze rates", () => {
    const results = analyzeAll(qson, { rollingCount: 5 })

    expect(results.rates.all.map((r) => r.rate)).toEqual([
      1, 60, 30, 24, 21, 24, 23, 24, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 40, 40, 43, 29, 27, 27, 26,
    ])
    expect(results.rates["10m"].map((r) => r.rate)).toEqual([1])
    expect(results.rates["20m"].map((r) => r.rate)).toEqual([1, 60, 30, 24, 21, 24, 23, 24])
    expect(results.rates["40m"].map((r) => r.rate)).toEqual([
      1, 60, 45, 48, 60, 60, 53, 48, 36, 40, 40, 43, 29, 27, 27, 26,
    ])
    expect(results.rates["40m"].length).toEqual(16)
  })
})
