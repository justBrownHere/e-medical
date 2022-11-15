import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../redux/actions/usersAction";
import { Link } from "react-router-dom";

class AllDoctor extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  render() {
    let { users } = this.props;
    return (
      <>
        <div>
          <section className="space sub-header">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-6">
                  <div className="sub-header_content">
                    <p>ABOUT US</p>
                    <h3>
                      Lorem ipsum dolor sit ametco nse
                      <br /> ctetur adipisicing elitsed.
                    </h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="sub-header_main">
                    <h2>Doctors</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space">
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
                {users.map((item, index) => {
                  if (item.role === "R2") {
                    return (
                      <div key={index} className="col-md-3">
                        <Link to={`/detail-doctor/${item._id}`}>
                          <div className="doctors-box3">
                            <img src={item.avatar} className="img-fluid" />
                            <div className="doctors-plus-icon">
                              <i className="fas fa-plus" />
                            </div>
                            <h4>
                              {item.position === "P0"
                                ? "None"
                                : item.position === "P1"
                                ? "Master"
                                : item.position === "P2"
                                ? "Doctor"
                                : item.position === "P3"
                                ? "Associate Professor"
                                : "Professor"}{" "}
                              : {item.firstName} {item.lastName}
                            </h4>
                            <p>SURGEON</p>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>
          {/*//End Our Doctors */}
          {/*==================== Get a Consultant ====================*/}
          <section className="bg-img3">
            <div className="container container-custom">
              <div className="row">
                <div className="col-md-5 offset-md-7">
                  <div className="consultant-content">
                    <h2>We Believe in a Healthier You</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eius mod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                    <p>
                      Adipisicing elit, sed do eius mod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam,
                    </p>
                    <a href="#" className="btn btn-success">
                      Get a Consultant
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=pBFQdxA-apI"
                      className="popup-youtube"
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*//End Get a Consultant */}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
