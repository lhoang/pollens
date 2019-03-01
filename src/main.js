import App from './App.svelte';

var app = new App({
	target: document.body,
	props: {
		"cats": [
			{
				"name": "Keyboard Cat",
				"video": "https://www.youtube.com/watch?v=J---aiyznGQ"
			},
			{
				"name": "Maru",
				"video": "https://www.youtube.com/watch?v=z_AbfPXTKms"
			},
			{
				"name": "Henri The Existential Cat",
				"video": "https://www.youtube.com/watch?v=OUtn3pvWmpg"
			}
		]
	}
});

export default app;