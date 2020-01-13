<script>
	import Input from './component/Input.svelte'
	import Output from './component/Output.svelte'

	import JSON5 from 'json5'
	import {
		censusPromise
	} from './utils.js'

	export let query = {}
	$: value = JSON5.stringify(query, null, 2)
	export let response = {}

	async function runQuery(event) {
		const query = event.detail;
		//todo- wait for citysdk load
		response = await censusPromise(query).catch(error => error)
	}
</script>

<main>
	<Input {value} on:message={runQuery} />
	<Output {response} />
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		box-shadow: 2px 3px;
		border: 1px solid;
		position: relative;
	}
</style>