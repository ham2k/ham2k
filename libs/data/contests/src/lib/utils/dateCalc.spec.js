const { lastFullWeekendInMonth, nthFullWeekendInMonth, roundDateToMonth } = require("./dateCalc")
const { DateTime } = require("luxon")

describe("nthFullWeekendInMonth", () => {
  it("should work", () => {
    const days = nthFullWeekendInMonth(DateTime.utc(2022, 1), 1)
    expect(days[0].toISO()).toEqual("2022-01-01T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2022-01-02T23:59:59.999Z")
  })

  it("should parse ISO dates", () => {
    const days = nthFullWeekendInMonth("2022-01-01", 1)
    expect(days[0].toISO()).toEqual("2022-01-01T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2022-01-02T23:59:59.999Z")
  })

  it("should work when the month starts on a Monday", () => {
    const days = nthFullWeekendInMonth("2021-11-01", 1)
    expect(days[0].toISO()).toEqual("2021-11-06T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-11-07T23:59:59.999Z")
  })

  it("should work when the month starts on a Tuesday", () => {
    const days = nthFullWeekendInMonth("2021-11-01", 1)
    expect(days[0].toISO()).toEqual("2021-11-06T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-11-07T23:59:59.999Z")
  })

  it("should work when the month starts on a Wednesday", () => {
    const days = nthFullWeekendInMonth("2021-12-01", 1)
    expect(days[0].toISO()).toEqual("2021-12-04T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-12-05T23:59:59.999Z")
  })

  it("should work when the month starts on a Thursday", () => {
    const days = nthFullWeekendInMonth("2021-04-01", 1)
    expect(days[0].toISO()).toEqual("2021-04-03T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-04-04T23:59:59.999Z")
  })

  it("should work when the month starts on a Friday", () => {
    const days = nthFullWeekendInMonth("2021-10-01", 1)
    expect(days[0].toISO()).toEqual("2021-10-02T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-10-03T23:59:59.999Z")
  })

  it("should work when the month starts on a Saturday", () => {
    const days = nthFullWeekendInMonth("2021-05-01", 1)
    expect(days[0].toISO()).toEqual("2021-05-01T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-05-02T23:59:59.999Z")
  })

  it("should work when the month starts on a Sunday", () => {
    const days = nthFullWeekendInMonth("2021-08-01", 1)
    expect(days[0].toISO()).toEqual("2021-08-07T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-08-08T23:59:59.999Z")
  })
})

describe("lastFullWeekendInMonth", () => {
  it("should work", () => {
    const days = lastFullWeekendInMonth(DateTime.utc(2022, 1))
    expect(days[0].toISO()).toEqual("2022-01-29T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2022-01-30T23:59:59.999Z")
  })

  it("should parse ISO dates", () => {
    const days = lastFullWeekendInMonth("2022-01-01")
    expect(days[0].toISO()).toEqual("2022-01-29T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2022-01-30T23:59:59.999Z")
  })

  it("should work when the month ends on a Monday", () => {
    const days = lastFullWeekendInMonth("2021-05-01")
    expect(days[0].toISO()).toEqual("2021-05-29T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-05-30T23:59:59.999Z")
  })

  it("should work when the month ends on a Tuesday", () => {
    const days = lastFullWeekendInMonth("2021-11-01")
    expect(days[0].toISO()).toEqual("2021-11-27T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-11-28T23:59:59.999Z")
  })

  it("should work when the month ends on a Wednesday", () => {
    const days = lastFullWeekendInMonth("2021-06-01")
    expect(days[0].toISO()).toEqual("2021-06-26T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-06-27T23:59:59.999Z")
  })

  it("should work when the month ends on a Thursday", () => {
    const days = lastFullWeekendInMonth("2021-09-01")
    expect(days[0].toISO()).toEqual("2021-09-25T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-09-26T23:59:59.999Z")
  })

  it("should work when the month ends on a Friday", () => {
    const days = lastFullWeekendInMonth("2021-12-01")
    expect(days[0].toISO()).toEqual("2021-12-25T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-12-26T23:59:59.999Z")
  })

  it("should work when the month ends on a Saturday", () => {
    const days = lastFullWeekendInMonth("2021-07-01")
    expect(days[0].toISO()).toEqual("2021-07-24T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-07-25T23:59:59.999Z")
  })

  it("should work when the month ends on a Sunday", () => {
    const days = lastFullWeekendInMonth("2021-10-01")
    expect(days[0].toISO()).toEqual("2021-10-30T00:00:00.000Z")
    expect(days[1].toISO()).toEqual("2021-10-31T23:59:59.999Z")
  })
})

describe("roundDateToMonth", () => {
  it("should work", () => {
    expect(roundDateToMonth("2022-03-01", 1).toISO()).toEqual("2022-01-01T00:00:00.000Z")
  })

  it("should work with days and times", () => {
    expect(roundDateToMonth("2022-02-15T13:00:15Z", 1).toISO()).toEqual("2022-01-15T13:15:00.000Z")
  })

  it("should work on edge cases", () => {
    expect(roundDateToMonth("2022-03-31", 2).toISO()).toEqual("2022-01-28T00:00:00.000Z")
  })

  it("should work across years", () => {
    expect(roundDateToMonth("2022-03-31", 1).toISO()).toEqual("2022-01-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 2).toISO()).toEqual("2022-02-28T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 3).toISO()).toEqual("2022-03-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 4).toISO()).toEqual("2022-04-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 5).toISO()).toEqual("2022-05-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 6).toISO()).toEqual("2022-06-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 7).toISO()).toEqual("2022-07-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 8).toISO()).toEqual("2022-08-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 9).toISO()).toEqual("2021-09-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 10).toISO()).toEqual("2021-10-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 11).toISO()).toEqual("2021-11-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-03-31", 12).toISO()).toEqual("2021-12-31T00:00:00.000Z")

    expect(roundDateToMonth("2022-08-31", 1).toISO()).toEqual("2023-01-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 2).toISO()).toEqual("2023-02-28T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 3).toISO()).toEqual("2022-03-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 4).toISO()).toEqual("2022-04-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 5).toISO()).toEqual("2022-05-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 6).toISO()).toEqual("2022-06-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 7).toISO()).toEqual("2022-07-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 8).toISO()).toEqual("2022-08-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 9).toISO()).toEqual("2022-09-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 10).toISO()).toEqual("2022-10-31T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 11).toISO()).toEqual("2022-11-30T00:00:00.000Z")
    expect(roundDateToMonth("2022-08-31", 12).toISO()).toEqual("2022-12-31T00:00:00.000Z")
  })
})
