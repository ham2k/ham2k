import React from "react"
import { fmtContestTimestampZulu } from "../../utils/format/dateTime"
import ApexChart from "react-apexcharts"
import SunCalc from "suncalc"
import Maidenhead from "maidenhead"

import { Typography } from "@mui/material"
import { BAND_COLORS } from "../../styles/bandColors"

export function ChartQSOs({ analysis, contest, qson, settings }) {
  const height = 300

  const grid = new Maidenhead()
  try {
    grid.locator = settings?.grid
  } catch (error) {
    // Ignore grid location
  }

  if (!analysis?.qsos?.bins || !analysis.rates?.all) {
    return null
  }
  const bins = Object.values(analysis.qsos.bins)

  const periods = contest.periods
  const completeBins = []
  let startMillis = periods && periods[0] ? new Date(periods[0][0]).valueOf() : bins[0].startMillis
  let lastMillis =
    periods && periods[0] ? new Date(periods[periods.length - 1][1]).valueOf() : bins[bins.length - 1].startMillis

  while (startMillis <= lastMillis) {
    completeBins.push({ startMillis, start: new Date(startMillis).toISOString() })
    startMillis += 15 * 60 * 1000
  }

  const maxQSOs = Math.max(...bins.map((bin) => bin.qsos.all || 0))

  const series = [
    {
      type: "column",
      name: "10m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["10m"] || null, bin })),
    },
    {
      type: "column",
      name: "15m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["15m"] || null, bin })),
    },
    {
      type: "column",
      name: "20m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["20m"] || null, bin })),
    },
    {
      type: "column",
      name: "40m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["40m"] || null, bin })),
    },
    {
      type: "column",
      name: "80m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["80m"] || null, bin })),
    },
    {
      type: "column",
      name: "160m",
      data: bins.map((bin, i) => ({ x: bin.startMillis, y: bin.qsos["160m"] || null, bin })),
    },
  ]

  const options = {
    chart: {
      type: "line",
      height,
      stacked: true,
      toolbar: {
        show: true,
        // tools: {
        //   download: false,
        //   selection: false,
        //   zoom: true,
        //   zoomin: true,
        //   zoomout: true,
        //   pan: true,
        //   reset: true,
        // },
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      width: [0, 0, 0, 0, 0, 0],
      curve: ["straight", "straight", "straight", "straight", "straight", "straight"],
    },
    fill: {
      opacity: [1, 1, 1, 1, 1, 1],
    },
    colors: [
      BAND_COLORS["10m"],
      BAND_COLORS["15m"],
      BAND_COLORS["20m"],
      BAND_COLORS["40m"],
      BAND_COLORS["80m"],
      BAND_COLORS["160m"],
    ],
    responsive: [
      {
        breakpoint: 800,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
      },
    },
    tooltip: {
      enabled: true,
      // shared: true,
      // intersect: false,
      followCursor: false,
      x: {
        formatter: (x) => fmtContestTimestampZulu(x),
      },
      y: {
        formatter: (y) => `${y} QSOs`,
      },
    },
    // title: {
    //   text: "QSOs by Band",
    // },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: (x) => fmtContestTimestampZulu(x),
      },
    },
    yaxis: [
      {
        seriesName: "10m",
        // title: { text: "QSOs in 15m intervals" },
        show: true,
        forceNiceScale: true,
        min: 0,
        max: maxQSOs,
      },
      { seriesName: "10m", show: false, min: 0, max: maxQSOs },
      { seriesName: "10m", show: false, min: 0, max: maxQSOs },
      { seriesName: "10m", show: false, min: 0, max: maxQSOs },
      { seriesName: "10m", show: false, min: 0, max: maxQSOs },
      { seriesName: "10m", show: false, min: 0, max: maxQSOs },
    ],
    legend: {
      position: "right",
      offsetY: 40,
      showForNullSeries: false,
      inverseOrder: true,
    },
  }

  if (grid.lat && grid.lon) {
    options.stroke.width.push(0)
    options.stroke.curve.push("straight")
    options.fill.opacity.push(0.5)
    options.colors.push("#C0C0C0")
    options.yaxis.push({ seriesName: "Night", opposite: true, show: false, min: 0, max: 100 })
    series.push({
      type: "area",
      name: "Night",
      data: completeBins.map((bin, i) => {
        const date = new Date(bin.startMillis)
        const sun = SunCalc.getTimes(date, grid.lat, grid.lon)
        const minutesToSunrise = (bin.startMillis - sun.sunrise.valueOf()) / (60 * 1000)
        const minutesToSunset = (bin.startMillis - sun.sunset.valueOf()) / (60 * 1000)

        if (minutesToSunset < minutesToSunrise && minutesToSunset > 0) {
          if (minutesToSunset <= -30) return { x: bin.startMillis, y: 0 }
          if (minutesToSunset <= 0) return { x: bin.startMillis, y: 5 }
          if (minutesToSunset <= 15) return { x: bin.startMillis, y: 20 }
          if (minutesToSunset <= 30) return { x: bin.startMillis, y: 40 }
          if (minutesToSunset <= 45) return { x: bin.startMillis, y: 60 }
          if (minutesToSunset <= 60) return { x: bin.startMillis, y: 80 }
          if (minutesToSunset <= 75) return { x: bin.startMillis, y: 95 }
          else return { x: bin.startMillis, y: 100 }
        } else {
          if (minutesToSunrise <= -75) return { x: bin.startMillis, y: 100 }
          if (minutesToSunrise <= -60) return { x: bin.startMillis, y: 95 }
          if (minutesToSunrise <= -45) return { x: bin.startMillis, y: 80 }
          if (minutesToSunrise <= -30) return { x: bin.startMillis, y: 60 }
          if (minutesToSunrise <= -15) return { x: bin.startMillis, y: 40 }
          if (minutesToSunrise <= 0) return { x: bin.startMillis, y: 20 }
          if (minutesToSunrise <= 15) return { x: bin.startMillis, y: 5 }
          else return { x: bin.startMillis, y: 0 }
        }
      }),
    })
  }

  return (
    <div>
      <Typography component="h2" variant="h5">
        QSOs in 15 minute intervals
      </Typography>

      <ApexChart options={options} series={series} type="bar" height={height} />
    </div>
  )
}
