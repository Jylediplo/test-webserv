const fetch = require('cross-fetch');

async function testServer(url, options, description) {
    try {
        const response = await fetch(url, options);
        console.log(`${description} -> Status: ${response.status}`);
    } catch (error) {
        console.error(`${description} -> Error: ${error.message}`);
    }
}

async function runTests() {
    const url = 'http://localhost:8080/';

    await testServer(url, { method: 'GET' }, 'Basic GET request');
    await testServer(url, { method: 'POST', body: JSON.stringify({ key: 'value' }), headers: { 'Content-Type': 'application/json' } }, 'Basic POST on not allowed route');
    await testServer(url, { method: 'PUT', body: JSON.stringify({ key: 'newValue' }), headers: { 'Content-Type': 'application/json' } }, 'Basic PUT request');
    await testServer(url, { method: 'DELETE' }, 'Basic DELETE request on folder');
    await testServer(url + 'nonexistent', { method: 'GET' }, 'Request to a nonexistent route');
    await testServer(url, { method: 'GET', headers: { 'Invalid-Header': '\u0000' } }, 'Request with invalid headers');
    await testServer(url + 'login', { method: 'POST', body: 'wrong body', headers: { 'Content-Type': 'text/plain' } }, 'malformed body');
    await testServer(url, { method: 'invented' }, 'Unsupported HTTP method');
    await testServer(url + '.'.repeat(10 ** 4), { method: 'GET' }, 'URI too large');
	await testServer(url + 'user', { method: 'GET' }, 'user not connected');
    await testServer('http://localhost:1234/', { method: 'GET' }, 'Request to an invalid port');
    await testServer(url + 'files/quietxpm/folder.png', { method: 'DELETE' }, 'Test with DELETE METHOD on file');
}

runTests();