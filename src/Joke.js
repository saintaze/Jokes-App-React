import React, { Component } from 'react';

import './Joke.css';

class Joke extends Component {

  getColor  = () => {
    if(this.props.votes >= 15) return '#4caf50';
    if(this.props.votes >= 12) return '#85c34a';
    if(this.props.votes >= 9) return '#cddc39';
    if(this.props.votes >= 6) return '#ffeb3b';
    if(this.props.votes >= 3) return '#ffc107';
    if(this.props.votes >= 0) return '#ff9800';
    return '#f44336';
  }
  getMojey = () => {
    if (this.props.votes >= 15) return 'em em-rolling_on_the_floor_laughing';
    if (this.props.votes >= 12) return 'em em-laughing';
    if (this.props.votes >= 9) return 'em em-smiley';
    if (this.props.votes >= 6) return 'em em-slightly_smiling_face';
    if (this.props.votes >= 3) return 'em em-neutral_face';
    if (this.props.votes >= 0) return 'em em-confused';
    return 'em em-angry';
  }

  render() { 
    return ( 
      <div className="Joke">
        <div className="Joke-vote">
          <i className="fas fa-arrow-up" onClick={this.props.upVote}></i>
          <span style={{borderColor: this.getColor()}}>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.props.downVote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={this.getMojey()}></i>
        </div>
      </div>
     );
  }
}
 
export default Joke;