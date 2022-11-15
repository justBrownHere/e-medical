import React, { Component } from "react";

class ScrollTop extends Component {
  render() {
    return (
      <a
        href="#"
        className="scrollToTop"
        style={{ bottom: "2%", opacity: 1, transition: "all 0.5s ease 0s" }}
      >
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
        <span className="pluse_1" />
        <span className="pluse_2" />
      </a>
    );
  }
}

export default ScrollTop;
