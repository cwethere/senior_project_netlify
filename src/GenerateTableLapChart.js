import './App.css';
import React from "react";
import { useState, useRef ,useEffect } from "react";
import * as d3 from "d3";
import Axios from 'axios';
import ReactDOM from "react-dom";
import { schemeGnBu, svg } from 'd3';

const margin = {top: 20, right: 50, left: 30, bottom: 10}
const width = 50000 - margin.left - margin.right;
const height = 10000 - margin.top - margin.bottom;
const padding = 600;
const color = "lightblue";

function GenerateTableLapChart(props) {

    const { dataPoints, positionIndex } = props;

    const [chartData,setChartData] = useState(dataPoints);
    const svgRef = useRef()

    const maxValue = d3.max(chartData, item => item.y);

    useEffect(() => {

        const xScale = d3.scalePoint()
            .domain(chartData.map( (d) => d.x ))
            .range([(0+padding),width])

        const yScale = d3.scaleLinear()
            .domain([d3.max(positionIndex, function (d) {return d.PosID}),1])
            .range([(height - padding), (0+padding)])

        const line = d3.line()
            .x((d)=> xScale(d.x))
            .y((d)=>yScale(d.y))
            .curve(d3.curveMonotoneX)


        d3.select(svgRef.current)
            .select('path')
            .attr('d', (y) => line(chartData))
            .attr('fill','none')
            .attr('stroke', 'black')
            .attr("stroke-width", 40)

        d3.select(svgRef.current)
            .append("g")
            .selectAll("dot")
            .data(dataPoints)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.x)})
            .attr("cy", function(d) { return yScale(d.y)})
            .attr("r", 80)
            .attr("fill", "#0075C9")

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)
        const xAxisGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat('');
        const yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat('');

        d3.select(svgRef.current)
            .append('g')
            .attr('class','grid')
            .attr('transform',' translate(0,' + height + ')')
            .call(xAxisGrid)

        d3.select(svgRef.current)
            .append('g')
            .attr('class', 'grid')
            .attr("stroke-color","black")
            .call(yAxisGrid)

        d3.select('xaxis').remove()
        d3.select(svgRef.current)
            .append('g')
            .style("font", "448px times")
            .attr('transform',`translate(0,${height - padding})`)
            .attr('id','xaxis')
            .attr('stroke-width', 40)
            .call(xAxis)

        d3.select('yaxis').remove()
        d3.select(svgRef.current)
            .append('g')
            .style("font", "448px times")
            .attr('transform',`translate(${padding},0)`)
            .attr('id','yaxis')
            .attr('stroke-width', 40)
            .call(yAxis)

    }, [chartData])

    return (
        <div className='Graph'>
            <svg id="chart" ref={svgRef} viewBox="0 0 51000 10000">

                <path d="" fill="none" stroke="white" strokeWidth="5" />

            </svg>
        </div>
    )

}

export default GenerateTableLapChart;