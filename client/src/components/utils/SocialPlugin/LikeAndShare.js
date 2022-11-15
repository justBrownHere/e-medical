import React, { Component } from 'react'

class LikeAndShare extends Component {
  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }


    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FB_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/en_GB/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
    render() {
      this.initFacebookSDK()
    return (
      <div
        class="fb-like"
        data-href={this.props.currentLink}
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="true"
      ></div>
    );
  }
}

export default LikeAndShare
