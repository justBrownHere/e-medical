import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
          <footer
            style={{
              backgroundImage:
                "url(http://demos.codexcoder.com/labartisan/html/covid-19/assets/css/bg-image/footer-bg-4.jpg)",
            }}
          >
            <div className="footer-top padding-tb">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-item first-set">
                      <div className="footer-inner">
                        <div className="footer-content">
                          <div className="title">
                            <h6>About Covid-19</h6>
                          </div>
                          <div className="content">
                            <p>
                              We believe in Simple Creative and Flexible Design
                              Standards.
                            </p>
                            <h6>Headquarters:</h6>
                            <p>
                              795 Folsom Ave, Suite 600 San Francisco, CA 94107
                            </p>
                            <ul className="lab-ul">
                              <li>
                                <p>
                                  <span>Phone:</span>(91) 8547 632521
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span>Email:</span>
                                  <a href="#">info@covid-19.com</a>
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-item">
                      <div className="footer-inner">
                        <div className="footer-content">
                          <div className="title">
                            <h6>Navigate</h6>
                          </div>
                          <div className="content">
                            <ul className="lab-ul">
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Advertisers
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Developers
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Resources
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Company
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Connect
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-item">
                      <div className="footer-inner">
                        <div className="footer-content">
                          <div className="title">
                            <h6>Social Contact</h6>
                          </div>
                          <div className="content">
                            <ul className="lab-ul">
                              <li>
                                <a href="#">
                                  <i className="icofont-facebook" />
                                  Facebook
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-twitter" />
                                  Twitter
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-instagram" />
                                  Instagram
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-youtube" />
                                  YouTube
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-xing" />
                                  Xing
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="footer-item">
                      <div className="footer-inner">
                        <div className="footer-content">
                          <div className="title">
                            <h6>Privacy And Tos</h6>
                          </div>
                          <div className="content">
                            <ul className="lab-ul">
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Advertiser Agreement
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Acceptable Use Policy
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Privacy Policy
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Technology Privacy
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="icofont-caret-right" />
                                  Developer Agreement
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom" style={{ borderColor: "#ffffff40" }}>
              <div className="container">
                <div className="section-wrapper">
                  <p>
                    © 2020 All Rights Reserved. Designed by{"{"}" "{"}"}
                    <a href="https://themeforest.net/user/codexcoder">
                      CodexCoder
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        );
    }
}

export default Footer
