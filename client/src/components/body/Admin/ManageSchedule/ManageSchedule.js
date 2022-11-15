import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchAllDoctors } from "../../../../redux/actions/usersAction";
import Select from "react-select";
import { connect } from "react-redux";
// import { getDetailDoctor} from '../../../../redux/actions/doctorAction'
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getAllTime } from "../../../../redux/actions/allcodesAction";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: null,
      listDoctor: [],
      startDate: new Date(),
      listTime: [],
      newTime: "",
    };
  }
  componentDidMount() {
    let startDate = moment(this.state.startDate).format("DD-MM-YY");
    this.getAllDoctors();
    this.props.getAllTime();
    this.setState({
      newTime: startDate,
    });
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.users !== this.props.users) {
      let data = this.buildingInput(this.props.users);
      this.setState({
        listDoctor: data,
      });
    }
    if (prevProps.allcode !== this.props.allcode) {
      let data = this.props.allcode;
      if (data && data.length > 0) {
        data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        listTime: data,
      });
    }
  }
  handleChange = (selectedDoctor) => {
    console.log(selectedDoctor);

    this.setState({
      selectedDoctor,
    });
  };
  getAllDoctors = () => {
    this.props.fetchAllDoctors(this.props.token);
  };
  buildingInput = (input) => {
    let result = [];
    if (input && input.length > 0) {
      input.map((item) => {
        let obj = {};
        let label = `${item.firstName} ${item.lastName}`;
        obj.label = label;
        obj.value = item._id;
        result.push(obj);
      });
    }
    return result;
  };
  getAllDoctors = () => {
    this.props.fetchAllDoctors(this.props.token);
  };

  onChangeDatePicker = (date) => {
    const NewDate = moment(date).format("DD-MM-YY");
    console.log(NewDate);
    this.setState({
      startDate: date,
      newTime: NewDate,
    });
  };
  handleSelectTime = (id) => {
    let data = this.state.listTime;
    var index = data.findIndex((item) => item._id == id);
    data[index].isSelected = !data[index].isSelected;
    this.setState({
      listTime: data,
    });
  };
  handleSaveSchedule = async () => {
    let data = [];
    let { newTime, listTime, selectedDoctor } = this.state;
    let listTimeSelect = listTime.filter((item) => item.isSelected === true);
    if (!newTime) return toast.error("Invalid time schedule!");
    if (!selectedDoctor) return toast.error("Invalid doctor selected!");
    let doctorId = selectedDoctor.value;
    if (listTimeSelect && listTimeSelect.length > 0) {
      listTimeSelect.map((item) => {
        let obj = {};
        obj.date = newTime;
        obj.doctorId = doctorId;
        obj.time = item._id;
        data.push(obj);
      });
    } else {
      return toast.error("Invalid time schedule!");
    }
    console.log(data);
    try {
      await axios.post("/api/create-schedule", data, {
        headers: { Authorization: this.props.token },
      });
      toast.success("Save schedule successly!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  render() {
    const { selectedDoctor } = this.state;
    let { allcode } = this.props;
    return (
      <>
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
        <h2 className="text-center pt-3">Manage detail doctor</h2>
        <Link to="/" className="btn btn-info my-4 ml-5">
          Back
        </Link>
        <div className="select-doctor mb-5">
          <div className="row px-3">
            <div className="left col-6">
              <label htmlFor="text-left">Select Day :</label>
              <DatePicker
                minDate={new Date()}
                selected={this.state.startDate}
                onChange={(date) => this.onChangeDatePicker(date)}
              />
            </div>
            <div className="right col-6">
              <label htmlFor="select-right">Select doctor :</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                id="select-right"
                format="DD-MM-YY"
              />
            </div>
          </div>
        </div>
        <div className="list-time px-5 justify-content-center">
          {allcode &&
            allcode.length > 0 &&
            allcode.map((item, index) => {
              return (
                <button
                  onClick={() => this.handleSelectTime(item._id)}
                  key={index}
                  className={`btn ${
                    item.isSelected ? "btn-warning" : "btn-outline-warning"
                  } mb-3 mr-3`}
                >
                  {item.value}
                </button>
              );
            })}
        </div>
        <button
          onClick={() => this.handleSaveSchedule()}
          className="btn btn-warning my-5 ml-5"
        >
          Save
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.user,
  data: state.doctor.data,
  allcode: state.allcode.data,
});

const mapDispatchToProps = {
  fetchAllDoctors,
  getAllTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
