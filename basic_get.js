const fetch = require('cross-fetch')

async function run()
{
	const rawResponse = await fetch('http://localhost:8080', {
		method: 'GET'
	})
	const response = await rawResponse.status;
	console.log(response);
	
}
run()