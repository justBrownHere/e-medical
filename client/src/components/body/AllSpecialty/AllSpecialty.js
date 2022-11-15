import React, { Component } from "react";
import { getAllSpecialty } from "../../../redux/actions/specialtyAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AllSpecialty extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getAllSpecialty()
    }
    render() {
      let {specialties} = this.props
    return (
      <>
        <div>
          <section className="space sub-header">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-6">
                  <div className="sub-header_content">
                    <p>OUR SERVICES</p>
                    <h3>
                      Lorem ipsum dolor sit ametco nse
                      <br /> ctetur adipisicing elitsed.
                    </h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="sub-header_main">
                    <h2>Specialties</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*//End Sub header */}
          {/*//End Header */}
          {/*==================== Pricing ====================*/}
          <section className="space light">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-12">
                  <div className="sub-title_center">
                    <span>---- Our Services ----</span>
                    <h2>High Quality Services for You</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                {specialties.map((item, index) => {
                  return (
                    <div className="col-md-4">
                      <Link to={`/detail-specialty/${item._id}`}>
                        <div
                          className="service-block blue"
                          style={{ height: "435px" }}
                        >
                          <img
                            style={{ width: "100%" }}
                            src={item.image}
                            alt="#"
                          />
                          <h5>{item.name}</h5>
                          <a href="#" className="btn btn-dark">
                            VIEW
                          </a>
                          <div className="service-bg-icon">
                            <img
                              src="https://demo.web3canvas.com/themeforest/medenin/images/services-bg1.png"
                              className="img-fluid"
                              alt="#"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/*//End Pricing */}
          {/*==================== Appointment ====================*/}
          <section className="space background-bg4">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="appointment-form_wrap">
                    <div className="heading-style1">
                      <span>Online Booking</span>
                      <h2>Make an Appointment</h2>
                    </div>
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="email"
                              className="form-control form-custom"
                              placeholder="Enter Your Name"
                            />
                            <i className="far fa-user" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="number"
                              className="form-control form-custom"
                              placeholder="Date and time"
                            />
                            <i className="far fa-clock" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="number"
                              className="form-control form-custom"
                              placeholder="Enter phone number"
                            />
                            <i className="fas fa-phone" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="text"
                              className="form-control form-custom"
                              placeholder="Select location"
                            />
                            <i className="fas fa-map-marker-alt" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="text"
                              className="form-control form-custom"
                              placeholder="Choose department"
                            />
                            <i className="far fa-circle" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-group-cutom">
                            <input
                              type="text"
                              className="form-control form-custom"
                              placeholder="Select doctor"
                            />
                            <i className="far fa-user" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group form-group-cutom">
                            <label htmlFor="exampleFormControlTextarea1">
                              Your Message
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <a href="#" className="btn btn-success">
                            BOOK NOW
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="why-choose_block">
                    <div className="heading-style1 mb-0">
                      <span>Why Us</span>
                      <h2>Why Choose Us</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing{" "}
                        <br /> elit, sed do eius mod tempor inc ididuntut
                      </p>
                      <hr />
                    </div>
                    <div className="whychoose-wrap">
                      <img
                        src="https://demo.web3canvas.com/themeforest/medenin/images/icon1.png"
                        alt="#"
                      />
                      <div className="whychoose-text_block">
                        <h4>Fastest Growing Clinic</h4>
                        <p>
                          Excepteur sint occaecat cupidatat non proident, su
                        </p>
                      </div>
                    </div>
                    <div className="whychoose-wrap">
                      <img
                        src="https://demo.web3canvas.com/themeforest/medenin/images/icon2.png"
                        alt="#"
                      />
                      <div className="whychoose-text_block">
                        <h4>Free Ambulance Servcice</h4>
                        <p>Ut enim ad minim veniam, quis nostrud exercitati</p>
                      </div>
                    </div>
                    <div className="whychoose-wrap">
                      <img
                        src="https://demo.web3canvas.com/themeforest/medenin/images/icon3.png"
                        alt="#"
                      />
                      <div className="whychoose-text_block">
                        <h4>24/7 Working Time</h4>
                        <p>
                          Duis aute irure dolor in repr ehenderit in voluptate.
                        </p>
                      </div>
                    </div>
                    <div className="whychoose-wrap mb-0">
                      <img
                        src="https://demo.web3canvas.com/themeforest/medenin/images/icon4.png"
                        alt="#"
                      />
                      <div className="whychoose-text_block">
                        <h4>5 Star Customer Rating </h4>
                        <p>Excepteur sint occaecat cupidatat non proident,</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  specialties: state.specialty.specialties,
});

const mapDispatchToProps = {
    getAllSpecialty
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
