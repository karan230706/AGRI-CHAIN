// This function makes an API call to the backend
async function callApi() {
    try {
        // Define the API URL
        const apiUrl = '';
        
        // Set the options for the fetch request
        const response = await fetch(apiUrl, {
            method: 'GET', // Use 'POST' or other methods if necessary
            headers: {
                'Content-Type': 'application/json',
                // Add authorization token if needed
                'Authorization': 'Bearer your-auth-token'
            }
        });

        // Check if the response is okay (status 200)
        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);
            // You can manipulate or display the data here
        } else {
            console.error('Error: ', response.status);
        }
    } catch (error) {
        console.error('API Call Failed:', error);
    }
