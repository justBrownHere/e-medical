import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import moment from "moment";
import { connect } from "react-redux";
import { getBookingDoctor } from "../../../../redux/actions/doctorAction";
import Loading from "../../../utils/Loading/Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelect: moment(new Date()).format("DD-MM-YY"),
      newTime: "",
      listDate: [],
      startDate: new Date(),
      doctorId: this.props.match.params.id,
      listBooking: "",
      loading: false,
      fileUrl: "",
      email: "",
      fullName: "",
      date: "",
      time: "",
      idBooking: "",
    };
  }
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };
  changeImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) toast.error("No files were uploaded.");

      if (file.size > 1024 * 1024) toast.error("Size too large.");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        toast.error("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      this.setState({
        loading: true,
      });
      const res = await axios.post("/api/upload_image", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: this.props.token,
        },
      });

      this.setState({
        loading: false,
        fileUrl: res.data.url,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  getBookingDoctor = () => {
    this.props.getBookingDoctor(
      this.state.doctorId,
      this.state.dateSelect,
      this.props.token
    );
  };
  handleSendRecepit = async (e) => {
    // this.validate();
    this.setState({
      loading: true,
    });
    let { email, fullName, date, time, doctorId, fileUrl, idBooking } =
      this.state;
    try {
      const res = await axios.post(
        "/user/send-receipt",
        { idBooking, email, fullName, date, time, doctorId, img: fileUrl },
        {
          headers: { Authorization: this.props.token },
        }
      );
      toast.success(res.data.msg);
      this.setState({
       loading: false
     })
    } catch (err) {
      toast.error(err.response.data.msg);
      this.setState({
        loading: false,
      });
      e.preventDefault()
    }
    this.getBookingDoctor();
  };
  componentDidMount() {
    this.getBookingDoctor();
    let startDate = moment(this.state.startDate).format("DD-MM-YY");
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
  handleChangeDate = (e) => {
    this.setState({
      dateSelect: e.target.value,
    });
    this.setState({
      loading: true,
    });
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevState.dateSelect !== this.state.dateSelect) {
      this.getBookingDoctor();
    }
    if (prevProps.listBooking !== this.props.listBooking) {
      this.setState({
        listBooking: this.props.listBooking,
        loading: false,
      });
    }
  }
  getDetail = (item) => {
    this.setState({
      idBooking: item._id,
      email: item.email,
      fullName: item.fullName,
      date: item.date,
      time: item.time._id,
    });
  };

  cancelBookingHandle = async (e) => {
    this.setState({
       loading: true
     })
    try {
      let res = await axios.post(
        "/api/cancel-booking",
        { id: this.state.idBooking },
        {
          headers: { Authorization: this.props.token },
        }
      );
      toast.success(res.data.msg)
      this.getBookingDoctor();
      this.setState({
        loading: false,
      });
    } catch (err) {
      
      toast.error(err.response.data.msg)
      this.setState({
        loading: false,
      });
      e.preventDefault();
      this.getBookingDoctor();

    }
  }

  render() {
    let { dateSelect, listDate, listBooking, loading, fileUrl } = this.state;
    return (
      <>
        {loading && <Loading />}
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

        <div>
          {/* Modal */}
          <div
            className="modal fade"
            id="modelId"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm booking</h5>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-6">
                        <div class="form-group">
                          <div>
                            <label htmlFor="email">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              value={this.state.email}
                              onChange={(e) => this.handleChangeDate(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="right col-6">
                        <label htmlFor="select-right">Image specialty :</label>
                        <input
                          onChange={(e) => this.changeImage(e)}
                          type="file"
                          name="file"
                          id="select-right"
                        />
                        {fileUrl && (
                          <img
                            style={{ width: "150px", height: "100px" }}
                            src={fileUrl}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => this.handleSendRecepit()}
                    type="button"
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row py-5 justify-align-center">
            <h2>Manage booking</h2>
          </div>
          <div className="row py-5">
            <div className="col-3">
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
          <div className="row py-3">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Time</th>
                  <th>Full name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listBooking &&
                  listBooking.length > 0 &&
                  listBooking.map((item, index) => {
                    return (
                      <tr>
                        <td scope="row">{index}</td>
                        <td>{item.time.value}</td>
                        <td>{item.fullName}</td>
                        <td>{item.address}</td>
                        <td>
                          {item.gender === "M"
                            ? "Male"
                            : item.gender === "F"
                            ? "Female"
                            : "Other"}
                        </td>
                        <td>{item.reason}</td>
                        <td>
                          <div className="row">
                            <div className="col-6">
                              <button
                                data-toggle="modal"
                                data-target="#modelId"
                                className="btn btn-warning"
                                onClick={() => this.getDetail(item)}
                              >
                                Confirm
                              </button>
                            </div>
                            <div className="col-6">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-toggle="modal"
                                data-target="#modelCancel"
                                onClick={() => this.getDetail(item)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal cancel */}
        <div>
          {/* Button trigger modal */}

          {/* Modal */}
          <div
            className="modal fade"
            id="modelCancel"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cancel Booking</h5>
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
                  <h5>Are you want cancel booking ?</h5>
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
                    onClick={(e) => this.cancelBookingHandle(e)}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
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
  user: state.auth.user,
  data: state.doctor.data,
  allcode: state.allcode.data,
  allTime: state.doctor.schedule,
  priceId: state.doctor.price,
  listBooking: state.doctor.booking,
});

const mapDispatchToProps = {
  // getSchedule,
  // getAllTime,
  // getInforDoctor,
  // getDetailDoctor,
  // fetchUser,
  getBookingDoctor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
