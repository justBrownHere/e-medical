import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailDoctor } from "../../../../redux/actions/doctorAction";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

class DescDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      doctor: {},
      doctorId: this.props.match.params.id,
      province: "",
    };
  }
  getInforDoctorByState = async (id) => {
    try {
      const response = await axios.get(`/user/get-detail-doctor/${id}`);
      if (response.data && response.data.length > 0) {
        this.setState({
          description: response.data[0].description,
          doctor: response.data[0].doctorId,
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  getServiceDoctorByState = async (id) => {
    try {
      const response = await axios.get(`/user/get-infor-doctor/${id}`);
      console.log(response);
      if (response.data && response.data.length > 0) {
        this.setState({
          province: response.data[0].provinceId.value,
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  componentDidMount = () => {
    if (this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }
    this.getInforDoctorByState(this.props.doctorId);
    this.getInforDoctorByState(this.state.doctorId);
    this.getServiceDoctorByState(this.props.doctorId);
    this.getServiceDoctorByState(this.state.doctorId);
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    // if (prevProps.users !== this.props.users) {
    //   let data = this.buildingInput(this.props.users)
    //   this.setState({
    //     listDoctor : data
    //   })
    // }
    // if (prevProps.data !== this.props.data) {
    //   if (!this.props.data[0]) {
    //     this.setState({
    //       description: "",
    //       doctor: {},
    //     });
    //   } else {
    //     this.setState({
    //       description: this.props.data[0].description,
    //       doctor: this.props.data[0].doctorId,
    //     });
    //   }
    // }
  }
  getDetailDoctor = (id) => {
    this.props.getDetailDoctor(id);
  };
  render() {
    let { avatar, firstName, lastName } = this.state.doctor;
    return (
      <div className="row">
        <div className="avatar-doctor col-3">
          <img
            style={{ width: 75, height: 75 }}
            src={avatar}
            className="rounded-circle mb-2"
          />
          <Link
            style={{ cursor: "pointer" }}
            className="view-more text-primary"
            to={`/detail-doctor/${this.props.doctorId}`}
          >
            View more
          </Link>
        </div>
        <div className="detai-right col-9">
          <h5>
            {firstName} {lastName}
          </h5>
          <p>{this.state.description}</p>
          <span><i class="fa fa-map-marker" aria-hidden="true"></i>  { this.state.province }</span>
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DescDoctor));
