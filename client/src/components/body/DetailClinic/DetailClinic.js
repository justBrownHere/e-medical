import React, { Component } from "react";
import DoctorSchedule from "../DetailDoctor/DoctorSchedule/DoctorSchedule";
import InforDoctor from "../DetailDoctor/InforDoctor/InforDoctor";
import { connect } from "react-redux";
import { getDetailDoctor } from "../../../redux/actions/doctorAction";
import DescDoctor from "../DetailSpecialty/DescDoctor/DescDoctor";
import {
  getDetailClinic,
  fetchAllDoctorsByClinic,
} from "../../../redux/actions/clinicAction";
import { getInforAllcode } from "../../../redux/actions/doctorAction";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinic: "",
      doctor: [],
    };
  }
  buildingInputInfor = (input) => {
    let result = [];
    if (input && input.length > 0) {
      input.map((item) => {
        let obj = {};
        obj.label = item.value;
        obj.value = item._id;
        result.push(obj);
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.getInforAllcode();
    this.props.getDetailClinic(this.props.match.params.id);
    this.props.fetchAllDoctorsByClinic(this.props.match.params.id);
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.clinic !== this.props.clinic) {
      if (this.props.clinic) {
        this.setState({
          clinic: this.props.clinic,
        });
      }
    }
    if (prevProps.doctor !== this.props.doctor) {
      this.setState({
        doctor: this.props.doctor,
      });
    }
  }
  render() {
    let { clinic } = this.state;
    let { doctor } = this.props;
    return (
      <>
        <section
          className="space sub-header"
          // style={{
          //   background: `url(${specialty.image}) no-repeat`,
          // }}
        >
          <div className="container container-custom">
            <div className="row">
              <div className="col-md-6">
                <div className="sub-header_content"></div>
              </div>
              <div className="col-md-6">
                <div className="sub-header_main">
                  <h2>{clinic.name}</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container container-custom">
          <div className="row">
            <div className="col-12">
              <div className="service-detail_wrap">
                <div className="service-detail_img">
                  <img
                    src={clinic.image}
                    className="img-fluid m-auto pb-5"
                    alt="#"
                    style={{ width: "60%", display: "block" }}
                  />
                  <h2>{clinic.name}</h2>
                  <div>
                    <i class="fa fa-map-marker" aria-hidden="true">
                      {" "}
                      {clinic.address}
                    </i>
                  </div>
                  <hr />
                  <h5>Introduce</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: clinic.descriptionHTML && clinic.descriptionHTML,
                    }}
                  ></div>
                  <hr />
                </div>

                <div className="our-dental-service">
                  {doctor && doctor.length > 0 ? (
                    doctor.map((item, index) => {
                      return (
                        <div className="row py-3">
                          <div className="col-6 detail-doctor border-right">
                            <DescDoctor
                              key={index}
                              doctorId={item.doctorId._id}
                            />
                          </div>

                          <div className="col-6 detail-schedule">
                            <div className="row schedule px-3">
                              <DoctorSchedule
                                key={index}
                                doctorId={item.doctorId._id}
                              />
                            </div>
                            <div className="infor">
                              <InforDoctor
                                key={index}
                                doctorId={item.doctorId._id}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h5>
                      Clinic doesn't has doctor.Please choose another
                      clinic.Thanks!
                    </h5>
                  )}
                </div>
                <hr />
              </div>
            </div>
          </div>
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
  specialty: state.specialty.specialty,
  doctor: state.clinic.doctor,
  clinic: state.clinic.clinic,
});

const mapDispatchToProps = {
  // fetchAllUsers,
  getDetailDoctor,
  getDetailClinic,
  fetchAllDoctorsByClinic,
  getInforAllcode,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
