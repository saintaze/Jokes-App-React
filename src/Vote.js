import React, { Component } from 'react';

class Vote extends Component {
  state = {
    count: 0
  }

  // handleUpClick = () => {
  //   this.setState(st => {
  //     return { count: st.count + 1 }
  //   });
  // }


  // handleDownClick = () => {
  //   this.setState(st => {
  //     return { count: st.count - 1 }
  //   });
  // }

  handleClick = (dir) => {
    this.setState(st => {
      const amount = dir === 'up' ? +1 : -1
      return { count: st.count + amount } 
    });
  }

  render() { 
    return ( 
      <div className="Vote">
        <i className="fas fa-arrow-up" onClick={() => { this.handleClick('up') }}></i>
        <span>{this.state.count}</span>
        <i className="fas fa-arrow-down" onClick={() => { this.handleClick('down')} }></i>
      </div>
     );
  }
}
 
export default Vote;