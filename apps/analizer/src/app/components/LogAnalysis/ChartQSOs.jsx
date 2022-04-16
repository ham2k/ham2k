import React, { useEffect, useRef } from "react"
import { Bar } from "@nivo/bar"
import { fmtContestTimestampZulu } from "../../utils/format/dateTime"

export function ChartQSOs({ analysis }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const width = 1600
  const height = 300
  const margin = { top: 10, right: 80, bottom: 40, left: 60 }

  if (!analysis?.qsos?.bins || !analysis.rates?.all) {
    return null
  }

  const bins = Object.values(analysis.qsos.bins)
  const rates = Object.values(analysis.rates.all)

  const chartData = bins.map((bin, i) => ({ i, date: new Date(bin.startMillis), all: bin.qsos.all, bin }))

  return (
    <div style={{ height }}>
      <Bar
        width={width}
        height={height}
        margin={margin}
        keys={["all"]}
        curve="monotoneX"
        data={chartData}
        indexBy="i"
        xScale={{ type: "time" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          // type: "time",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 8,
          format: (d) => String(d), //fmtContestTimestampZulu(d.valueOf()),
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
        enableLabel={false}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={(args) => {
          console.log(args)
          const { point } = args
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
                  {point?.data?.y} {point?.serieId}
                </b>
              </div>
              <div>{point?.data?.bin ? fmtContestTimestampZulu(point?.data?.bin?.startMillis) : "?"}</div>
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
  //     .domain(d3.extent(bins, (bin) => new Date(bin.startMilis)))
  //     .range([0, width])

  //   const yScale = d3
  //     .scaleLinear()
  //     .domain(d3.extent(bins, (bin) => bin.qsos.all))
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
