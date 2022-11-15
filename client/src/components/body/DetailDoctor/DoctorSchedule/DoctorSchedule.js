import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import {
  getSchedule,
  getDetailDoctor,
  getInforDoctor,
} from "../../../../redux/actions/doctorAction";
import { withRouter } from "react-router";
import { getAllTime } from "../../../../redux/actions/allcodesAction";
import axios from "axios";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUser } from "../../../../redux/actions/authAction";
import Loading from "../../../utils/Loading/Loading";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDate: [],
      dateSelect: moment(new Date()).format("DD-MM-YY"),
      doctorId: this.props.match.params.id,
      allTime: [],
      doctor: {},
      price: "",
      bookingSelect: "",
      dateSelectModal: moment(new Date()).locale("en").format("ddd - DD/MM"),
      startDate: new Date(),
      newTime: "",
      // state booking
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      reason: "",
      gender: "M",
      time: "",
      patientId: "",

      loading: false,
    };
  }
  getInforDoctorByState = async (id) => {
    try {
      const response = await axios.get(`/user/get-infor-doctor/${id}`);
      console.log(response);
      if (response.data && response.data.length > 0) {
        this.setState({
          doctor: response.data[0].doctorId,
          price: response.data[0].priceId.value,
        });
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };
  validateInput = () => {
    let { fullName, email, phoneNumber, address, reason, gender } = this.state;
    if (!fullName || !email || !phoneNumber || !address || !reason || !gender) {
      toast.error("Missing parameters require! ");
    }
    if (!this.props.user._id) {
      toast.error("Please login to E-Medical!");
    }
  };
  getScheduleByState = async (id) => {
    try {
      const response = await axios.post("/api/get-schedule", {
        doctorId: id,
      });
      this.setState({
        allTime: response.data,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevState.dateSelect !== this.state.dateSelect) {
      // this.props.getSchedule(this.state.doctorId);
      // this.getScheduleByState(this.props.doctorId);
      this.getScheduleByState(this.state.doctorId);
    }
    // if(prevProps.doc)
    // if (prevProps.allTime !== this.props.allTime) {
    //   this.setState({
    //     allTime: this.props.allTime,
    //   });
    // }
    // if (prevProps.data !== this.props.data) {
    //   if (this.props.data && this.props.data.length > 0) {
    //     this.setState({
    //       doctor: this.props.data[0].doctorId,
    //     });
    //   }
    // }
    if (prevProps.priceId !== this.props.priceId) {
      if (!_.isEmpty(this.props.priceId)) {
        this.setState({
          price: this.props.priceId.value,
        });
      } else {
        this.setState({
          price: "",
        });
      }
    }
    if (prevProps.user !== this.props.user) {
      this.setState({
        patientId: this.props.user,
      });
    }
  }
  handleSelectBooking = (item) => [
    this.setState({
      bookingSelect: item.value,
      time: item._id,
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      reason: "",
      gender: "M",
    }),
  ];
  handleChangeDate = (e) => {
    this.setState({
      dateSelect: e.target.value,
      dateSelectModal: moment(e.target.value)
        .locale("en")
        .format("ddd - DD/MM"),
    });
  };
  componentDidMount() {
    if (this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }
    this.getScheduleByState(this.state.doctorId);
    this.getInforDoctorByState(this.state.doctorId);
    this.getScheduleByState(this.props.doctorId);
    this.getInforDoctorByState(this.props.doctorId);

    let startDate = moment(this.state.startDate).format("DD-MM-YY");
    // this.props.getSchedule(this.state.doctorId);
    // this.props.getSchedule(this.props.doctorId);
    let listDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date())
        .add(i, "days")
        .locale("en")
        .format("ddd - DD/MM");

      obj.value = moment(new Date())
        .add(i, "days")
        .startOf("day")
        .format("DD-MM-YY")
        .valueOf();
      listDate.push(obj);
    }
    this.setState({
      listDate: listDate,
      newTime: startDate,
    });
  }
  onChangeDatePicker = (date) => {
    const NewDate = moment(date).format("DD-MM-YY");
    console.log(NewDate);
    this.setState({
      startDate: date,
      newTime: NewDate,
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };
  handleSaveBooking = async () => {
    this.setState({
      loading: true,
    });
    this.validateInput();
    let {
      fullName,
      email,
      address,
      gender,
      phoneNumber,
      newTime,
      dateSelect,
      time,
      doctorId,
      reason,
    } = this.state;
    let patientId = this.props.user._id;
    try {
      const res = await axios.post("/api/create-booking", {
        fullName,
        email,
        address,
        gender,
        phoneNumber,
        dateOfBirth: newTime,
        date: dateSelect,
        time,
        doctorId,
        patientId,
        reason,
      });
      this.setState({
        loading: false,
      });
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    let {
      listDate,
      dateSelect,
      allTime,
      doctor,
      price,
      bookingSelect,
      dateSelectModal,
      fullName,
      email,
      phoneNumber,
      address,
      reason,
      gender,
      loading
    } = this.state;
    let idModal = "abc" + doctor._id;
    let i = 0;
    console.log(doctor);
    return (
      <>
        {loading && <Loading/>}
        <div>
          {/* Modal */}
          <div
            className="modal fade"
            id={idModal}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Medical appointment booking information
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row introduc-doctor">
                    <div className="col-2">
                      <img
                        style={{ width: 75, height: 75 }}
                        src={doctor.avatar}
                        className="rounded-circle mb-2"
                      />
                      <p>Price: ${price}</p>
                    </div>
                    <div className="col-10">
                      <h6>
                        {doctor.position === "P0"
                          ? "None"
                          : doctor.position === "P1"
                          ? "Master"
                          : doctor.position === "P2"
                          ? "Doctor"
                          : doctor.position === "P3"
                          ? "Associate Professor"
                          : "Professor"}{" "}
                        : {doctor.firstName} {doctor.lastName}
                      </h6>
                      <p>
                        {bookingSelect} {dateSelectModal}
                      </p>
                      <p>Free booking</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Full name</label>
                      <input
                        value={fullName}
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Full name"
                        name="fullName"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">Phone number</label>
                      <input
                        value={phoneNumber}
                        type="text"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Phone number"
                        name="phoneNumber"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        value={email}
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">Address</label>
                      <input
                        value={address}
                        type="text"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Address"
                        name="address"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">Reason</label>
                    <input
                      value={reason}
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Reason"
                      name="reason"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Date of birth</label>
                      <DatePicker
                        style={{ height: "20px" }}
                        selected={this.state.startDate}
                        onChange={(date) => this.onChangeDatePicker(date)}
                      />
                    </div>
                    <div className="form-group last mb-3 col-6">
                      <label>Gender</label>
                      <select
                        value={gender}
                        name="gender"
                        onChange={(e) => this.handleChange(e)}
                        class="form-control"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => this.handleSaveBooking()}
                    type="button"
                    className="btn btn-info"
                    data-dismiss="modal"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //////Modal */}

        <div className="mb-3">
          <FormControl width={120}>
            <InputLabel htnlFor="date-selector" shrink>
              Date
            </InputLabel>
            <NativeSelect
              value={dateSelect}
              onChange={(e) => this.handleChangeDate(e)}
              inputProps={{
                name: "date",
                id: "date-selector",
              }}
            >
              {listDate &&
                listDate.length > 0 &&
                listDate.map((item, index) => {
                  return (
                    <option name={item.label} value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </NativeSelect>
          </FormControl>
        </div>
        <div className="list-schedules" style={{ width: "100%" }}>
          {allTime &&
            allTime.length > 0 &&
            allTime.map((item, index) => {
              if (item.date === dateSelect) {
                i++;
                return (
                  <button
                    key={item._id}
                    className="btn btn-outline-primary mr-2 mb-2 "
                    data-toggle="modal"
                    data-target={`#${idModal}`}
                    style={{ width: "212px" }}
                    onClick={() => this.handleSelectBooking(item.time)}
                  >
                    {item.time.value}
                  </button>
                );
              }
            })}
          {i === 0 && (
            <p>
              Doctor hasn't schedules.Please select date other or wait for
              doctor set schedule.Thanks!
            </p>
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.auth.user,
  data: state.doctor.data,
  allcode: state.allcode.data,
  allTime: state.doctor.schedule,
  priceId: state.doctor.price,
});

const mapDispatchToProps = {
  getSchedule,
  getAllTime,
  getInforDoctor,
  getDetailDoctor,
  fetchUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DoctorSchedule));
