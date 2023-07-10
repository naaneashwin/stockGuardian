import React, { Component } from "react";

class Brief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brief: [
        "Welcome to StockGuardian",
        "One stop to maintain all your stocks",
        "Please Login to use",
        "If this is the first time, then feel free to Register",
      ],
    };
  }
  render() {
    return(
        <div>
            <h1>{this.state.brief[0]}</h1>
            <h4>{this.state.brief[1]}</h4>
            <h3>{this.state.brief[2]}</h3>
            <h3>{this.state.brief[3]}</h3>
        </div>
    );
  }
}

export default Brief;
