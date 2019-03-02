import App from './App.svelte';
import pollens from '../assets/paris-graminees-2017.json';

var app = new App({
	target: document.body,
	props: pollens,
});

export default app;