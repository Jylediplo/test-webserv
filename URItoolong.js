const fetch = require('cross-fetch')


const x = ".".repeat(10)
async function run()
{
	const rawResponse = await fetch(`http://localhost:8080/${}`, {
		method: 'GET'
	})
	const response = await rawResponse.status;
	console.log(response);
	
}
run()