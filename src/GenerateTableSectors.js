import './App.css';
import React from "react";
import { useState, useRef ,useEffect } from "react";
import * as d3 from "d3";
import Axios from 'axios';
import ReactDOM from "react-dom";
import { schemeGnBu } from 'd3';

const margin = {top: 20, right: 50, left: 50, bottom: 10}
const width = 700 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;
const padding = 20;
const color = "lightblue";

function GenerateTableSectors(props) {

    const { dataPoints } = props;

    const [chartData,setChartData] = useState(dataPoints);
    const svgRef = useRef()

    const maxValue = d3.max(chartData, item => item.y);

    useEffect(() => {

        const xScale = d3.scalePoint()
            .domain(chartData.map( (d) => d.x ))
            .range([(0+padding),width - padding])

        const yScale = d3.scaleLinear()
            .domain([0, Math.ceil(d3.max( chartData, function (d) {return d.y}))])
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
            .attr("stroke-width", 1.5)

        d3.select(svgRef.current)
            .append("g")
            .selectAll("dot")
            .data(dataPoints)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.x)})
            .attr("cy", function(d) { return yScale(d.y)})
            .attr("r", 3)
            .attr("fill", "#0075C9")

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        d3.select('xaxis').remove()
        d3.select(svgRef.current)
            .append('g')
            .style("font", "8px times")
            .attr('transform',`translate(0,${height - padding})`)
            .attr('id','xaxis')
            .call(xAxis)

        d3.select('yaxis').remove()
        d3.select(svgRef.current)
            .append('g')
            .style("font", "8px times")
            .attr('transform',`translate(${padding},0)`)
            .attr('id','yaxis')
            .call(yAxis)

    }, [chartData])

    return (
        <div className='graph'>
            <svg id="chart" ref={svgRef} viewBox="0 0 600 200">

                <path d="" fill="none" stroke="white" strokeWidth="5" />

            </svg>
        </div>
    )

}

export default GenerateTableSectors;