import React, { Component } from 'react'

class NewLetter extends Component {
    render() {
        return (
          <section className="space">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="news-img-block">
                    <img
                      src="https://demo.web3canvas.com/themeforest/medenin/images/play-img.png"
                      className="img-fluid w-100"
                      alt="#"
                    />
                    <a
                      className="video-play-button popup-youtube"
                      href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                    >
                      <span />
                    </a>
                    <div id="video-overlay" className="video-overlay">
                      <a className="video-overlay-close">×</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="video-play-text">
                    <span>Who we are -----</span>
                    <h2>We Have Advanced Technologies</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eius mod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eius mod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                    <hr />
                    <div className="newsletter-subscribe">
                      <h4>Subscribe to our Newsletter</h4>
                      <div className="newsletter-subscribe_form">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Email"
                        />
                        <a href="#">
                          <i className="fas fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
}

export default NewLetter
