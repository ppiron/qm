const fetch = require('node-fetch');
let _data

function makeRequest() {
  // const request = new Request('http://quotes.stormconsultancy.co.uk/random.json/', {
	//     method: 'GET', 
  //     headers: {
  //       "Content-type": "application/x-www-form-urlencoded"
  //     },
  //   })
  return fetch('http://quotes.stormconsultancy.co.uk/random.json/')
    .then( (response) => {
      //console.log(response);
      return response.json();
    })
    
} 

makeRequest().then(data => console.log(data));