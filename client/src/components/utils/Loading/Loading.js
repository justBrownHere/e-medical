import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="parents">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loading;
