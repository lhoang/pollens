<script>
import Viz from './viz/Viz.svelte';
export let data = [];
</script>

<h1>Technozaure Zebra</h1>
<Viz height="300" width="500" data="{data}"></Viz>

