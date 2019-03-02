<script >
import {scaleTime, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {axisBottom, axisLeft} from 'd3-axis';
import {timeFormat, timeParse} from 'd3-time-format';
import {select} from 'd3-selection';
import {afterUpdate} from 'svelte';

export let data = [];
export let width = 650;
export let height = 400;
const margin = {top: 20, right: 5, bottom: 20, left: 35};
const red = '#eb6a5b';
const blue = '#52b6ca';

let cleanedData = data.sort((a,b) => a.date - b.date);

const xScale = scaleTime()
                .domain([new Date(2000, 0, 1), new Date(2000, 11, 31)])
                .range([margin.left, width - margin.right]);

const yScale = scaleLinear()
                .domain([0, 5])
                .range([height - margin.bottom, margin.top]);

const xAxis = axisBottom().scale(xScale)
    .tickFormat(timeFormat('%b'));
const yAxis = axisLeft().scale(yScale);
const parse = timeParse("%Q");
const displayFormat = timeFormat("%d-%m");

const getDay = function(timestamp) {
    const day = parse(timestamp);
    day.setYear(2000);
    return day;
};
const format = timeFormat("%d-%m-2000");

const path = line().x(d => xScale(getDay(d.date)))
                   .y(d => yScale(d.level));


afterUpdate(() => {
    select('g[ref="xAxis"]').call(xAxis);
    select('g[ref="yAxis"]').call(yAxis);
});


</script>


<h2>Pollens</h2>
<svg width={width} height={height}>
        <path d='{path(cleanedData)}' fill='none' stroke={red} strokeWidth='2' />
        <g>
          <g ref='xAxis' transform={`translate(0, ${height - margin.bottom})`} />
          <g ref='yAxis' transform={`translate(${margin.left}, 0)`} />
        </g>
</svg>