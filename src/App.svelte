<script>
import Viz from './viz/Viz.svelte';
export let datasets = [];

let index = 0;
let currentdata = {};
const selectData = () => currentdata = datasets[index];
selectData();
</script>

<h1>Technozaure Zebra</h1>
<select name="index" id="index" bind:value={index}
on:click="{selectData}"
>
    {#each datasets as {city, pollen, year}, i}
    <option value="{i}">{city} - {pollen} - {year}</option>
    {/each}
</select>
<Viz height="300" width="500" data="{currentdata}"></Viz>

