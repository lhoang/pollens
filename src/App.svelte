<script>
import Viz from './viz/Viz.svelte';
import CircularViz from './viz/VizCircular.svelte';
export let datasets = [];

let index = 0;
let currentdata = {};
const selectData = () => currentdata = datasets[index];
selectData();
</script>

<h1>Technozaure Zebra</h1>
<select name="index" id="index" bind:value={index} on:click="{selectData}">
    {#each datasets as {city, pollen, year}, i}
    <option value="{i}">{city} - {pollen} - {year}</option>
    {/each}
</select>
<div class="group-viz">
    <Viz height="300" width="500" data="{currentdata}"></Viz>
    <CircularViz width="300" data="{currentdata}"></CircularViz>
</div>


