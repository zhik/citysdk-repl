import App from './App.svelte';
import {
	examples
} from './examples';

const app = new App({
	target: document.getElementById('app'),
	props: {
		query: examples[0].query,
		response: examples[0].response
	}
});

export default app;