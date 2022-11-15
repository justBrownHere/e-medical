import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { getAllSpecialty } from '../../../../redux/actions/specialtyAction'
import {Link} from 'react-router-dom'

class SpecialtyClinicHome extends Component {
  constructor(props) {
    super(props)
    this.state= {
      specialties:[]
    }
  }
  componentDidMount() {
    this.props.getAllSpecialty()
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.specialties !== this.props.specialties) {
      if (this.props.specialties && this.props.specialties.length > 0) {
        this.setState({
          specialties: this.props.specialties,
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
    let {specialties} = this.state
    return (
      <section className="space light">
        <div className="container container-custom">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-style1">
                <span>Our Services</span>
                <h2>High Quality Services for You</h2>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <Slider {...settings}>
              {specialties && specialties.length > 0 && 
                specialties.map((item, index) => {
                  return (
                    <>
                      <Link to={`/detail-specialty/${item._id}`} >
                      <div className="service-block blue" style={{height: '435px'}}>
                        <img
                          style={{width: '100%'}}
                          src={item.image}
                          alt="#"
                        />
                        <h5>{ item.name }</h5>
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
              })
              }
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
  
});

const mapDispatchToProps = {getAllSpecialty};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyClinicHome);

