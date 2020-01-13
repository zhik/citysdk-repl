<script>
	import Input from './component/Input.svelte'
	import Output from './component/Output.svelte'

	import JSON5 from 'json5'
	import {
		censusPromise
	} from './utils.js'

	export let query = {}
	export let response = {}
	$: value = JSON5.stringify(query, null, 2)
	let loading = false;

	async function runQuery(event) {
		loading = true
		query = event.detail;
		response = await censusPromise(query).catch(error => error)
		loading = false
	}
</script>

<main>
	<Input {value} {loading} on:message={runQuery} />
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