import React, { Component } from "react";
import { connect } from "react-redux";
import { getMyBooking } from "../../../../redux/actions/doctorAction";
import Loading from "../../../utils/Loading/Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ManageBookingUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBooking: "",
      loading: false,
      idBooking: "",
      patientId: "",
    };
  }
  getMyBooking = () => {
    this.props.getMyBooking(this.props.user._id, this.props.token);
  };
  componentDidMount() {
    this.getMyBooking();
  }
  getDetail = (item) => {
    this.setState({
      idBooking: item._id,
    });
  };
  cancelBookingHandle = async (e) => {
    this.setState({
      loading: true,
    });
    try {
      let res = await axios.post(
        "/api/cancel-booking",
        { id: this.state.idBooking },
        {
          headers: { Authorization: this.props.token },
        }
      );
      toast.success(res.data.msg);
      this.getMyBooking();
      this.setState({
        loading: false,
      });
    } catch (err) {
      toast.error(err.response.data.msg);
      this.setState({
        loading: false,
      });
      e.preventDefault();
      this.getMyBooking();
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.user !== this.props.user) {
      this.getMyBooking();
    }
    if (prevProps.listBooking !== this.props.listBooking) {
      this.setState({
        listBooking: this.props.listBooking,
      });
    }
  }
  render() {
    let {  listBooking, loading } = this.state;
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

        <div className="container">
          <div className="row py-5 justify-align-center">
            <h2>My booking</h2>
          </div>
          <div className="row py-3">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Full name</th>
                  <th>Doctor</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listBooking &&
                  listBooking.length > 0 &&
                  listBooking.map((item, index) => {
                    return (
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td>{item.time.value}</td>
                        <td>{item.date}</td>
                        <td>{item.fullName}</td>
                        <td>
                          {item.doctorId.firstName} {item.doctorId.lastName}
                        </td>
                        <td>{item.address}</td>
                        <td>
                          {item.gender === "M"
                            ? "Male"
                            : item.gender === "F"
                            ? "Female"
                            : "Other"}
                        </td>
                        <td>{item.reason}</td>
                        <td
                          className={
                            item.statusId.value === "Done"
                              ? "text-success"
                              : item.statusId.value
                           === "Confirmed" ? 'text-warning' : 'text-danger' }
                        >
                          {item.statusId.value}
                        </td>
                        <td>
                          <div className="row">
                            <div className="col-12">
                              {item.statusId.value === "Confirmed" ? (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-toggle="modal"
                                  data-target="#modelCancel"
                                  onClick={() => this.getDetail(item)}
                                >
                                  Cancel
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-toggle="modal"
                                  data-target="#modelCancel"
                                  disabled
                                  // onClick={() => this.getDetail(item)}
                                >
                                  Cancel
                                </button>
                              )}
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
  getMyBooking,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookingUser);
