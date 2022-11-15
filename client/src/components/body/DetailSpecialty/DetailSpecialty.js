import React, { Component } from "react";
import DoctorSchedule from "../DetailDoctor/DoctorSchedule/DoctorSchedule";
import InforDoctor from "../DetailDoctor/InforDoctor/InforDoctor";
import { connect } from "react-redux";
import { getDetailDoctor } from "../../../redux/actions/doctorAction";
import DescDoctor from "./DescDoctor/DescDoctor";
import {
  getDetailSpecialty,
  fetchAllDoctorsBySpecialty,
} from "../../../redux/actions/specialtyAction";
import { getInforAllcode } from "../../../redux/actions/doctorAction";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: "",
      doctor: [],
      provinceSelected: "All",
      listProvince: "",
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
    this.props.getDetailSpecialty(this.props.match.params.id);
    this.props.fetchAllDoctorsBySpecialty(this.props.match.params.id);
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.specialty !== this.props.specialty) {
      if (this.props.specialty) {
        this.setState({
          specialty: this.props.specialty,
        });
      }
    }
    if (prevProps.province !== this.props.province) {
      let data = this.buildingInputInfor(this.props.province);
      console.log(data);
      this.setState({
        listProvince: data,
      });
    }
    if (prevState.provinceSelected !== this.state.provinceSelected) {
      let doctor = this.state.doctor.filter(
        (item) => item.provinceId === this.state.provinceSelected
      );
      this.setState({
        doctor,
      });
    }
    if (prevProps.doctor !== this.props.doctor) {
      this.setState({
        doctor: this.props.doctor,
      });
    }
  }
  handleChangeProvince = (e) => {
    this.setState({
      provinceSelected: e.target.value,
    });
  };
  render() {
    let { specialty, provinceSelected, listProvince } = this.state;
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
                  <h2>{specialty.name}</h2>
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
                    src={specialty.image}
                    className="img-fluid m-auto pb-5"
                    alt="#"
                    style={{ width: "60%", display: "block" }}
                  />
                  <h2>{specialty.name}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        specialty.descriptionHTML && specialty.descriptionHTML,
                    }}
                  ></div>
                  <hr />
                </div>
                <div className="our-dental-service">
                  <div className="our-dental-service border-bottom py-3">
                    <FormControl width={120}>
                      <InputLabel htnlFor="date-selector" shrink>
                        Province
                      </InputLabel>
                      <NativeSelect
                        value={provinceSelected}
                        onChange={(e) => this.handleChangeProvince(e)}
                        inputProps={{
                          name: "date",
                          id: "date-selector",
                        }}
                      >
                        <option value={"All"}>All</option>
                        {listProvince &&
                          listProvince.length > 0 &&
                          listProvince.map((item, index) => {
                            return (
                              <option
                                name={item.label}
                                value={item.value}
                                key={index}
                              >
                                {item.label}
                              </option>
                            );
                          })}
                      </NativeSelect>
                    </FormControl>
                  </div>
                </div>

                <div className="our-dental-service">
                  {this.state.provinceSelected === "All" &&
                    doctor &&
                    doctor.length > 0 &&
                    doctor &&
                    doctor.length > 0 &&
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
                    })}
                  {doctor && doctor.length > 0 ? (
                    doctor.map((item, index) => {
                      if (item.provinceId === this.state.provinceSelected) {
                        return (
                          <div className="row">
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
                      }
                    })
                  ) : (
                    <h5>
                      Specialty doesn't has doctor.Please choose another
                      specialty.Thanks!
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
  doctor: state.specialty.doctor,
  province: state.allcode.province,
});

const mapDispatchToProps = {
  // fetchAllUsers,
  getDetailDoctor,
  getDetailSpecialty,
  fetchAllDoctorsBySpecialty,
  getInforAllcode,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
