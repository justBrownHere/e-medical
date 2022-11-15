import React, { Component } from "react";
import "./DetailDoctor.scss";
import { connect } from "react-redux";
// import { fetchAllUsers } from "../../../redux/actions/usersAction";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { Link } from "react-router-dom";
import { getDetailDoctor } from "../../../redux/actions/doctorAction";
import DoctorSchedule from "./DoctorSchedule/DoctorSchedule";
import InforDoctor from "./InforDoctor/InforDoctor";
import LikeAndShare from "../../utils/SocialPlugin/LikeAndShare";
import CommentFB from "../../utils/SocialPlugin/CommentFB";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      doctor: {},
    };
  }
  componentDidMount = () => {
    this.getDetailDoctor(this.props.match.params.id);
    window.scrollTo(0, 0);
  };
  getDetailDoctor = (id) => {
    this.props.getDetailDoctor(id);
  };

  componentDidUpdate(prevProps, prevState, snapShot) {
    // if (prevProps.users !== this.props.users) {
    //   let data = this.buildingInput(this.props.users)
    //   this.setState({
    //     listDoctor : data
    //   })
    // }
    if (prevProps.data !== this.props.data) {
      if (!this.props.data[0]) {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          doctor: {},
        });
      } else {
        this.setState({
          contentMarkdown: this.props.data[0].contentMarkdown,
          contentHTML: this.props.data[0].contentHTML,
          description: this.props.data[0].description,
          doctor: this.props.data[0].doctorId,
        });
      }
    }
  }
  render() {
    let currentLink = `https://e-medical.herokuapp.com/${this.props.location.pathname}`;
    let { avatar, firstName, lastName } = this.state.doctor;
    return (
      <>
        <div className="container-sm doctor-detailed-section ">
          <div className="row border-bottom py-2 ">
            <div className="col-lg-7 offset-lg-0 order-lg-1 col-sm-8 offset-sm-2 col-10 offset-1 order-2">
              <div className="banner-content">
                <h2 className="banner-title">
                  {firstName} {lastName}
                </h2>
                <LikeAndShare currentLink={currentLink} />
                <p className="banner-desc">{this.state.description}</p>
                <div className="banner-subcontent ls-20">
                  <h4 className="subcontent-title ls-n-20">Schedules</h4>
                  <DoctorSchedule />
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-0 order-lg-2 col-sm-8 offset-sm-2 col-10 offset-1 order-1 pl-5">
              <div className="doctor-detailed-image row">
                <figure>
                  <img
                    src={avatar}
                    className="img-aside"
                    alt="Banner-aside"
                    width={250}
                    height={447}
                  />
                </figure>
              </div>
              <div className="row infor-doctor border-left py-3 px-3">
                <InforDoctor />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 offset-lg-0 col-sm-8 offset-sm-2 col-10 offset-1">
              <h3 className="subcontent-title ls-n-20 mt-4">Details</h3>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.contentHTML && this.state.contentHTML,
            }}
          ></div>
          <CommentFB currentLink={currentLink} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.user,
  data: state.doctor.data,
});

const mapDispatchToProps = {
  // fetchAllUsers,
  getDetailDoctor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
