const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log('Function called with:', event.queryStringParameters);
  
  try {
    const { 
      category = 'general', 
      country = 'us', 
      max = 10,
      t = Date.now() // Timestamp to prevent caching
    } = event.queryStringParameters;
    
    const apiKey = '2becb17373ed0b0feb31c026c1ab9f81';
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${max}&apikey=${apiKey}`;
    
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    console.log('Response status:', response.status);
    
    // First, get the response as text to check if it's HTML
    const responseText = await response.text();
    
    // Check if the response is HTML (which would indicate an error page)
    if (responseText.trim().startsWith('<!DOCTYPE') || 
        responseText.trim().startsWith('<!doctype') || 
        responseText.trim().startsWith('<html')) {
      throw new Error('Received HTML response instead of JSON. The API might be down or the endpoint has changed.');
    }
    
    // If not HTML, try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Invalid JSON response from the server');
    }
    
    if (!response.ok) {
      console.error('Error response:', data);
      throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(data)}`);
    }
    
    console.log('Data received:', data ? 'Data received' : 'No data');
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error in fetchNews:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: error.message || 'Internal Server Error'
      })
    };
  }
};