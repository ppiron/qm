import React, { Component } from 'react';
import { render } from 'react-dom';
// import Transition from 'react-transition-group/Transition'

const colorList = [
'#DAD7DE',
'#A08FB6',
'#B9ADC9',
'#AAA5B1',
'#96909E',
'#F5ECEF',
'#E8B2C2',
'#EECBD5',
'#E7D6DB',
'#D2BDC3',
'#EEF3EB',
'#C7E5B0',
'#D8ECC9',
'#DAE4D3',
'#C3CFBB',
'#FFFEF6',
'#FFFAC4',
'#FFFCD9',
'#FFFDEC',
'#E9E7D3'
]

function makeRequest() {
  const request = new Request('http://quotes.stormconsultancy.co.uk/random.json/', {
	    method: 'GET', 
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
  return fetch(request)
    .then( (response) => {
      return response.json();
    })
} 

function fade(elt, duration, mode) {
  let start = null
  let progress
  
  function step(time, elt, duration, mode) {
    if (!start) start = time
    progress = time - start
    elt.style.opacity = mode === 'out' ? 1 - progress/duration : progress/duration
    if (progress < duration) {
      window.requestAnimationFrame(function(time) {
        return step(time, elt, duration, mode)
      })
    } else {
      start = null
    }
  }
  function bar() {
    window.requestAnimationFrame(function(time) {
      return step(time, elt, duration, mode)
    })
  }
  return bar
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      quote: '',
      author: '',
      bgColor: colorList[Math.floor(Math.random() * 20)],
      // in: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const box = document.getElementById('quote-box');
    box.style.backgroundColor = this.state.bgColor;
    window.setTimeout(() => {
      makeRequest().then( (data) => {
        this.setState( (prevState) => {
          return(
            {
              isLoading: false,
              quote: data.quote,
              author: data.author,
              bgColor: colorList[Math.floor(Math.random() * 20)]
            }
          )
        }, () => {
          const el = document.getElementById('quot');        
          fade(el, 800, 'in')()
          const box = document.getElementById('quote-box');
          box.style.backgroundColor = this.state.bgColor;
        })
      })
    }, 50)
  }

  handleClick(event) {
    const el = document.getElementById('quot');
    fade(el, 200, 'out')()
    window.setTimeout(() => {
      makeRequest().then( data => {
        console.log(data);
        this.setState( (prevState) => {
          return(
            {
              isLoading: false,
              quote: data.quote,
              author: data.author,
              bgColor: colorList[Math.floor(Math.random() * 20)],
              // in: true,
            }
          )
        }, fade(el, 800, 'in')())
      })
    }, 200)
  }

  render() {
    
    const styles = {
      backgroundColor: this.state.bgColor,
    };

    if (this.state.isLoading) {
      return (
        <div>
          <div id='quote-box'>
            Loading...
            <div id='quot'>
                <div id='text' className='quote'>
                  <span>{this.state.quote}</ span>
                </div>
                <div id='author' className='quote'>{this.state.author}</div>
              </div>
          </div>
        </div>
      )
    } 

    return (
      <div>
        <div style={styles} id='quote-box'>
            <div id='quot'>
              <div id='text' className='quote'>
                <span>{this.state.quote}</ span>
              </div>
              <div id='author' className='quote'>- {this.state.author}</div>
            </div>
            <div className='buttons' >
              <div id='new-quote' onClick={this.handleClick}>New Quote</div>
              <a href={`https://twitter.com/intent/tweet?text=${this.state.quote}`} id='tweet-quote' 
              className='twitter-share-button' target='_blank'>Tweet This Quote</a>
            </div>
          </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));