import React, { useEffect, useRef } from "react"
import { ResponsiveLine } from "@nivo/line"
import { fmtContestTimestampZulu } from "../../utils/format/dateTime"

export function ChartQSOs({ analysis }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const width = 400
  const height = 100
  const margin = { top: 10, right: 80, bottom: 40, left: 60 }

  if (!analysis?.qsos?.slices || !analysis.rates?.all) {
    return null
  }

  const slices = Object.values(analysis.qsos.slices)
  const rates = Object.values(analysis.rates.all)

  const chartData = [
    // {
    //   id: "QSOs",
    //   data: slices.map((slice, i) => ({ x: new Date(slice.startMillis), y: slice.qsos.all * 4, slice })),
    // },
    {
      id: "Rates",
      data: rates.map((entry, i) => ({ x: new Date(entry.qso.startMillis), y: entry.rate, entry })),
    },
  ]

  return (
    <div style={{ height: 200 }}>
      <ResponsiveLine
        curve="monotoneX"
        data={chartData}
        margin={margin}
        xScale={{ type: "time" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 8,
          format: (d) => fmtContestTimestampZulu(d.valueOf()),
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "QSO/h",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={({ point }) => {
          return (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}
            >
              <div>
                <b>
                  {point.data.y} {point.serieId}
                </b>
              </div>
              <div>{point?.data?.slice ? fmtContestTimestampZulu(point.data.slice.startMillis) : "?"}</div>
            </div>
          )
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
  // useEffect(() => {
  //   const svgElement = d3.select(svgRef.current)
  //   svgElement
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //   svgElement.selectAll("*").remove()

  //   const xScale = d3
  //     .scaleTime()
  //     .domain(d3.extent(slices, (slice) => new Date(slice.startMilis)))
  //     .range([0, width])

  //   const yScale = d3
  //     .scaleLinear()
  //     .domain(d3.extent(slices, (slice) => slice.qsos.all))
  //     .range([0, height])

  //   const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(-height)
  //   svgElement
  //     .append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(xAxis))
  // })

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef} />
    </div>
  )
}
