import React, { Component } from 'react';
import { render } from 'react-dom';

function makeRequest() {
  const request = new Request('http://quotes.stormconsultancy.co.uk/random.json/', {
	    method: 'GET', 
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
  fetch(request)
    .then( (response) => {
      console.log(response.json());
      return response.json();
    })
    .then( (data) => {
      return data;
    })
} 

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      quote: '',
      author: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    
  }
  
  componentDidMount() {

    makeRequest().then( (data) => {
      this.setState( (prevState) => {
        return(
          {
            isLoading: false,
            quote: data.quote,
            author: data.author,
          }
        )
      })
    })
  }

  render() {
    
    if (this.state.isLoading) {
      return (
        <div id='quote-box'>
          Loading...
        </div>
      )
    }

    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>
        <div id='quote-box'>
          <div id='text'>{this.state.quote}</div>
          <div id='author'>{this.state.author}</div>
          <div id='new-quote' onClick={this.handleClick}>New Quote</div>
          <div id='tweet-quote'>Tweet This Quote</div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));