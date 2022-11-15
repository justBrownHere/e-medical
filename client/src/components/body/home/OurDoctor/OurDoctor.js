import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../../redux/actions/usersAction";
import axios from "axios";
import { Link } from "react-router-dom";

class OurDoctor extends Component {
  render() {
    var settings = {
      dots: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,

            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    };

    let { doctor } = this.props;

    return (
      <section className="our-team">
        <div className="container container-custom">
          <div className="row">
            <div className="col-md-12">
              <div className="sub-title_center">
                <span>---- Our Team ----</span>
                <h2>Our Dedicated Doctors</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Slider {...settings}>
                {doctor.map((item, index) => {
                  if (item.role === "R2") {
                    return (
                      <>
                      <Link to={`/detail-doctor/${item._id}`} >
                        <div
                          className="team-img_block blue slick-slide slick-cloned"
                          tabIndex={-1}
                          style={{ width: 250, height: 355}}
                          data-slick-index={-4}
                          id
                          aria-hidden="true"
                        >
                          <div className="team-img-socila-block">
                            <img
                              src={item.avatar}
                              className="img-fluid"
                              alt="#"
                            />
                            <ul className="social-icons">
                              <li>
                                <a href="#" tabIndex={-1}>
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </li>
                              <li>
                                <a href="#" tabIndex={-1}>
                                  <i className="fab fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a href="#" tabIndex={-1}>
                                  <i className="fab fa-instagram" />
                                </a>
                              </li>
                              <li>
                                <a href="#" tabIndex={-1}>
                                  <i className="fab fa-google-plus-g" />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <h6>
                            {item.position === "P0"
                              ? "None"
                              : item.position === "P1"
                              ? "Master"
                              : item.position === "P2"
                              ? "Doctor"
                              : item.position === "P3"
                              ? "Associate Professor"
                                    : "Professor"} : {item.firstName} {item.lastName}
                          </h6>
                          <p>XaoLol Specialty</p>
                        </div>
                        </Link>
                      </>
                    );
                  }
                })}

                <button
                  className="slick-next slick-arrow"
                  aria-label="Next"
                  type="button"
                  style={{}}
                >
                  Next
                </button>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.user,
});

const mapDispatchToProps = {
  fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(OurDoctor);
