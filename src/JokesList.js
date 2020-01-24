import React, { Component } from 'react';

import './JokesList.css';
import Joke from './Joke';
import smiley from './smiley.svg'

class JokesList extends Component {

  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props) {
    super(props);
    this.state = { 
      jokes: JSON.parse(localStorage.getItem('jokes') || '[]'), 
      loading: false 
    }
    this._seenJokes = new Set(this.state.jokes.map(j => j.id));
  }

  componentDidMount = () => {
    if(this.state.jokes.length === 0) this.getJokes();
  }

  getJokes = async () => {
    try{
      const jokes = [];
      while (jokes.length < this.props.numJokesToGet){
        const joke = await this.getAJoke();
        if(!this._seenJokes.has(joke.id)){
          this._seenJokes.add(joke.id);
          jokes.push({...joke, votes: 0});
        }
      }
      this.setState(st => ({
        loading: false,
        jokes: [...st.jokes, ...jokes]
      }), () => localStorage.setItem('jokes', JSON.stringify(this.state.jokes)))
  }catch(e){
      alert('Network Error');
      this.setState({loading: false})
    }
  } 

  getAJoke = async () => {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const res = await fetch(`${cors}https://icanhazdadjoke.com/`, {headers});
    return await res.json();
  }

  handleVote = (id, delta) => {
    this.setState(st => ({
      jokes: st.jokes.map(j => 
        j.id === id ? {...j, votes: j.votes + delta} : j
      )
    }), () => localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
  }

  renderJokes = () => {
    const sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return sortedJokes.map(j => 
      <Joke
        key={j.id}
        text={j.joke}
        votes={j.votes}
        upVote={()=>{this.handleVote(j.id, 1)}}
        downVote={()=>{this.handleVote(j.id, -1)}}
        />
    );
  }

  renderLoader = () => {
    return (
      <div className="loader">
        <i className="far fa-laugh fa-8x fa-spin"></i>
        <h1 className="JokesList-title">Loading...</h1>
      </div>
    )
  }

  handleClick = () => {
    this.setState({loading: true});
    this.getJokes();
  }

  render() {
    if(this.state.loading) return this.renderLoader()
    return ( 
      <div className="JokesList">
        <div className="JokesList-sidebar">
          <h1 className="JokesList-title"><span>Dad</span> jokes</h1>
          <img src={smiley} alt=""/>
          <button className="JokesList-btn" onClick={this.handleClick}>Fetch Jokes</button>
        </div>
        <div className="JokesList-jokes">
          {this.renderJokes()}
        </div>
      </div>
     );
  }
}
 
export default JokesList;

