import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { getAllClinic } from "../../../../redux/actions/clinicAction";
import { Link } from "react-router-dom";

class ClinicHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    };
  }
  componentDidMount() {
    this.props.getAllClinic();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.clinics !== this.props.clinics) {
      if (this.props.clinics && this.props.clinics.length > 0) {
        this.setState({
          clinics: this.props.clinics,
        });
      }
    }
  }
  render() {
    var settings = {
      dots: false,
      speed: 300,
      slidesToShow: 3,
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
    let { clinics } = this.state;
    return (
      <section className="space light">
        <div className="container container-custom">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-style1">
                <span>Our Clinic</span>
                <h2>High Quality Services for You</h2>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <Slider {...settings}>
              {clinics &&
                clinics.length > 0 &&
                clinics.map((item, index) => {
                  return (
                    <>
                      <Link to={`/detail-clinic/${item._id}`}>
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
                    </>
                  );
                })}
            </Slider>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p className="text-center service-help_link">
                Contact us for better help and services.
                <a href="#">Let’s get started</a>
              </p>
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
  data: state.doctor.data,
  specialties: state.specialty.specialties,
  clinics: state.clinic.clinics,
});

const mapDispatchToProps = { getAllClinic };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicHome);
