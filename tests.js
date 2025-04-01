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
    await testServer(url, { method: 'POST', body: JSON.stringify({ key: 'value' }), headers: { 'Content-Type': 'application/json' } }, 'Basic POST request with JSON body');
    await testServer(url, { method: 'PUT', body: JSON.stringify({ key: 'newValue' }), headers: { 'Content-Type': 'application/json' } }, 'Basic PUT request');
    await testServer(url, { method: 'DELETE' }, 'Basic DELETE request');
    await testServer(url + 'nonexistent', { method: 'GET' }, 'Request to a nonexistent route');
    await testServer(url, { method: 'GET', headers: { 'Invalid-Header': '\u0000' } }, 'Request with invalid headers');
    await testServer(url, { method: 'POST', body: 'A'.repeat(10 ** 6), headers: { 'Content-Type': 'text/plain' } }, 'POST large payload');
    await testServer(url, { method: 'PATCH' }, 'Unsupported HTTP method');
    await testServer(url + 'POL'.repeat(10 ** 7), { method: 'GET' }, 'URI too large');
    await testServer('http://localhost:1234/', { method: 'GET' }, 'Request to an invalid port');
}

runTests();