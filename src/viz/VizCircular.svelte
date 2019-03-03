<script >
import {scaleLinear} from 'd3-scale';
import {arc} from 'd3-shape';
import chroma from 'chroma-js';
import {afterUpdate} from 'svelte';

export let data = {};
export let width = 650;
const margin = {top: 20, right: 20, bottom: 20, left: 20};

let cleanedData = [];
let slices = [];

const radiusScale = scaleLinear()
                .domain([0, 5])
                .range([0, (width-margin.right) / 2]);
const colors = chroma.scale(['green', 'orange', 'red']);
const colorScale = scaleLinear()
                .domain([0, 5]);



const dayAngle =  2 * Math.PI / 365;


const months = ['jan', 'fev', 'mars', "avr", 'mai', 'juin', 'juil', 'aout', 'sep', 'oct', 'nov', 'dec'];
const monthAngle =  2 * Math.PI / 12;
const monthSlices = months.map((d, i) => {
            const shape = arc()
                            .startAngle(i * monthAngle)
                            .endAngle((i + 1) * monthAngle)
                            .innerRadius(radiusScale(0))
                            .outerRadius(radiusScale(5))();
            return {shape, name: d};
      });

afterUpdate(() => {
    cleanedData = data.hasOwnProperty('data')
                      ? data.data.sort((a,b) => a.date - b.date)
                      : [];
    slices = cleanedData.map((d, i) => {
          const shape = arc()
                          .startAngle(i * dayAngle)
                          .endAngle((i + 1) * dayAngle)
                          .innerRadius(radiusScale(0))
                          .outerRadius(radiusScale(d.level))();

          return {shape, fill: colors(colorScale(d.level))};
    });
});
</script>
<style>
    .months path {
        fill:none;
        stroke: lightgray;
        stroke-width: 1px;
        stroke-dasharray: 5 2;
    }
    .levels circle {
        fill: none;
        stroke: lightblue;
        stroke-width: 1px;
        stroke-dasharray: 5;
    }
</style>

<div>
    <h2>Pollens de {data.pollen} à {data.city} ({data.year})</h2>
    <svg width={width} height={width}>
        <g transform="translate({width/2}, {width/2})">
            <g class="data">
            {#each slices as {shape, fill}, i}
                <path key={i} d={shape} fill={fill} />
            {/each}
            </g>
            <g class="months">
            {#each monthSlices as {shape, name}, i}
                <path id="month{i}" d="{shape}"/>
                <text>
                    <textPath href="#month{i}" startOffset="7%">
                        {name}
                    </textPath>
                </text>
            {/each}
            </g>
            <g class="levels">
            {#each [1,2,3,4] as level }
                <circle cx="0" cy="0" r="{radiusScale(level)}"/>
                <text x="0" y={-radiusScale(level)}>{level}</text>
            {/each}
            </g>
        </g>
    </svg>
</div>