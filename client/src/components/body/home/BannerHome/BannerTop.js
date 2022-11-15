import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class BannerTop extends Component {
  render() {
    return (
      <section className="banner-section home-4">
        <div className="banner-area">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-6 col-12">
                <div className="content-part">
                  <div className="banner-content">
                    <h2>
                      <span>COVID-19</span>
                    </h2>
                    <h2>
                      All <span>Live</span> Update
                    </h2>
                    <p>
                      Completely pontificate goal-oriented collaboration awesome
                      and idea-sharing Energisticaly corona and empowersr
                      turnkey testing procedures ratheri thanin Proactively
                      create disseminate multimedia.
                    </p>
                    <NavLink to="/all-doctor" className="lab-btn style-2">
                      <span>find a doctor</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="banner-round">
                  <img
                    src="http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/banner/home-4/01.png"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BannerTop;
