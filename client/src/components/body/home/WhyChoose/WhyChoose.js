import React, { Component } from "react";

class WhyChoose extends Component {
  render() {
    return (
      <section className="space why-choose-block">
        <div className="container container-custom">
          <div className="row">
            <div className="col-md-12 col-lg-5">
              <h2>
                Why Choose
                <br /> Mededin Care?
              </h2>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <div className="why-choose_list why-choose_list-br">
                    <i className="fas fa-check" />
                    <div className="why-choose_list-content">
                      <h5>Advanced Care</h5>
                      <span>Lorem ipsum dolor sit</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="why-choose_list why-choose_list-br">
                    <i className="fas fa-check" />
                    <div className="why-choose_list-content">
                      <h5>Online Medicine</h5>
                      <span>Lorem ipsum dolor sit</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <div className="why-choose_list why-choose_list-br">
                    <i className="fas fa-check" />
                    <div className="why-choose_list-content">
                      <h5>Medical &amp; Surgical</h5>
                      <span>Lorem ipsum dolor sit</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="why-choose_list why-choose_list-br">
                    <i className="fas fa-check" />
                    <div className="why-choose_list-content">
                      <h5>Lab Tests</h5>
                      <span>Lorem ipsum dolor sit</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <a href="#" className="btn btn-dark" tabIndex={0}>
                    MAKE APPOINTMENT
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 offset-lg-1">
              <div className="why-choose_right">
                <h2>
                  Emergency?
                  <br /> Contact Us.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  <br /> sed do eius mod tempor incididunt ut labore et dolore
                  <br /> magna aliqua. Ut enim ad minim veniam
                </p>
                <div className="why-choose_list">
                  <div className="choose-icon">
                    <i className="fas fa-phone-volume" />
                  </div>
                  <div className="why-choose_list-content">
                    <span>Call us now</span>
                    <h3>+123 456 7890</h3>
                  </div>
                </div>
                <div className="why-choose_list">
                  <div className="choose-icon">
                    <i className="fas fa-envelope-open-text" />
                  </div>
                  <div className="why-choose_list-content">
                    <span>Mail us</span>
                    <h3>info@medenin.com</h3>
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

export default WhyChoose;
