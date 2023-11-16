const apiKey = process.env.REACT_APP_ADDRESS_API;
const apiUrl = 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws';

export const getAddress = async (query) => {

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(apiKey + ':')}`,
      },
      body: new URLSearchParams({
        'Key': apiKey,
        'SearchTerm': query,
        'Country': 'CAN',
        // Add other parameters as needed
      }),
    });

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching address:', error);
  }
};

