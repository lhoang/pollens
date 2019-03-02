import App from './App.svelte';
import pollens from '../assets/pollens.json';

var app = new App({
	target: document.body,
	props: pollens,
});

export default app;