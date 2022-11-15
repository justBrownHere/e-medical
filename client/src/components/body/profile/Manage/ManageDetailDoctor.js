import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { fetchAllDoctors } from "../../../../redux/actions/usersAction";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { connect } from "react-redux";
import {
  getDetailDoctor,
  getInforAllcode,
  getInforDoctor,
} from "../../../../redux/actions/doctorAction";
import { getAllSpecialty } from "../../../../redux/actions/specialtyAction";
import { getAllClinic } from "../../../../redux/actions/clinicAction";
import { Link } from "react-router-dom";

class ManageDetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: null,
      listDoctor: [],
      idMark: "",
      selectedPrice: null,
      selectedPayMethod: null,
      selectedProvince: null,
      selectedSpecialty: null,
      selectedClinic: null,
      listDoctor: [],
      listPrice: [],
      listPayMethod: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount = () => {
    this.props.getInforAllcode();
    this.getAllDoctors();
    this.props.getAllSpecialty();
    this.props.getAllClinic();
    if (this.props.match.params) {
      this.setState({
        selectedDoctor: {
          label: this.props.match.params.label,
          value: this.props.match.params.value,
        },
      });
      this.getDetailDoctor(this.props.match.params.value);
      this.getInforDoctor(this.props.match.params.value);
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.users !== this.props.users) {
      let data = this.buildingInput(this.props.users);
      this.setState({
        listDoctor: data,
      });
    }
    if (prevProps.price !== this.props.price) {
      let data = this.buildingInputInfor(this.props.price);
      console.log(data);
      this.setState({
        listPrice: data,
      });
    }
    if (prevProps.payMethod !== this.props.payMethod) {
      let data = this.buildingInputInfor(this.props.payMethod);
      console.log(data);
      this.setState({
        listPayMethod: data,
      });
    }
    if (prevProps.province !== this.props.province) {
      let data = this.buildingInputInfor(this.props.province);
      console.log(data);
      this.setState({
        listProvince: data,
      });
    }
    if (prevProps.specialties !== this.props.specialties) {
      let data = this.buildingInputSpecialty(this.props.specialties);
      this.setState({
        listSpecialty: data,
      });
    }
    if (prevProps.clinics !== this.props.clinics) {
      let data = this.buildingInputSpecialty(this.props.clinics);
      this.setState({
        listClinic: data,
      });
    }
    if (
      prevProps.priceId !== this.props.priceId ||
      prevProps.paymentId !== this.props.paymentId ||
      prevProps.provinceId !== this.props.provinceId ||
      prevProps.addressClinic !== this.props.addressClinic ||
      prevProps.nameClinic !== this.props.nameClinic ||
      prevProps.note !== this.props.note
    ) {
      if (this.props.priceId) {
        let selectedPrice = {
          label: this.props.priceId.value,
          value: this.props.priceId._id,
        };
        let selectedPayMethod = {
          label: this.props.paymentId.value,
          value: this.props.paymentId._id,
        };
        let selectedProvince = {
          label: this.props.provinceId.value,
          value: this.props.provinceId._id,
        };
        this.setState({
          selectedPrice,
          selectedPayMethod,
          selectedProvince,
          addressClinic: this.props.addressClinic,
          nameClinic: this.props.nameClinic,
          note: this.props.note,
        });
      } else {
        this.setState({
          selectedPrice: "",
          selectedPayMethod: "",
          selectedProvince: "",
          addressClinic: "",
          nameClinic: "",
          note: "",
        });
      }
    }
    if (prevProps.data !== this.props.data) {
      if (!this.props.data[0]) {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          idMark: "",
        });
      } else {
        this.setState({
          contentMarkdown: this.props.data[0].contentMarkdown,
          contentHTML: this.props.data[0].contentHTML,
          description: this.props.data[0].description,
          idMark: this.props.data[0]._id,
        });
      }
    }
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
  buildingInputSpecialty = (input) => {
    let result = [];
    if (input && input.length > 0) {
      input.map((item) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item._id;
        result.push(obj);
      });
    }
    return result;
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
  mdParser = new MarkdownIt(/* Markdown-it options */);

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChange = (selectedDoctor) => {
    this.getDetailDoctor(selectedDoctor.value);
    this.getInforDoctor(selectedDoctor.value);

    this.setState({
      selectedDoctor,
    });
  };
  handleChangePrice = (selectedPrice) => {

    this.setState({
      selectedPrice,
    });
  };
  handleChangePay = (selectedPayMethod) => {

    this.setState({
      selectedPayMethod,
    });
  };
  handleChangeProvince = (selectedProvince) => {

    this.setState({
      selectedProvince,
    });
  };
  handleChangeSpecialty = (selectedSpecialty) => {
    this.setState({
      selectedSpecialty,
    });
  }
  handleChangeClinic = (selectedClinic) => {
    this.setState({
      selectedClinic,
    });
  }
  handleOnChangeDESC = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  getDetailDoctor = (id) => {
    this.props.getDetailDoctor(id);
    //  let res = await axios.get(`/user/get-detail-doctor/${id}`)
  };
  getInforDoctor = (id) => {
    this.props.getInforDoctor(id);
  };
  handleChangeInput = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveDetail = async () => {
    try {
      let res = await axios.post(
        "/user/save-details-doctor",
        {
          contentMarkdown: this.state.contentMarkdown,
          contentHTML: this.state.contentHTML,
          description: this.state.description,
          doctorId: this.state.selectedDoctor.value,
        },
        {
          headers: { Authorization: this.props.token },
        }
      );
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    try {
      let res = await axios.post(
        "/user/save-infor-doctor",
        {
          doctorId: this.state.selectedDoctor.value,
          priceId: this.state.selectedPrice.value,
          paymentId: this.state.selectedPayMethod.value,
          provinceId: this.state.selectedProvince.value,
          addressClinic: this.state.addressClinic,
          nameClinic: this.state.nameClinic,
          note: this.state.note,
          specialtyId : this.state.selectedSpecialty.value,
          clinicId : this.state.selectedClinic.value
        },
        {
          headers: { Authorization: this.props.token },
        }
      );
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  render() {
    const {
      selectedDoctor,
      selectedPrice,
      selectedPayMethod,
      selectedProvince,
      addressClinic,
      nameClinic,
      note,
      selectedSpecialty,
      selectedClinic,
    } = this.state;
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
        <Link to="/manage-user" className="btn btn-info my-4 ml-5">
          Back
        </Link>
        <div className="select-doctor">
          <div className="row px-3">
            <div className="left col-6">
              <label htmlFor="text-left">Information doctor :</label>
              <textarea
                onChange={(e) => this.handleOnChangeDESC(e)}
                value={this.state.description}
                id="text-left"
                rows="2"
              ></textarea>
            </div>
            <div className="right col-6">
              <label htmlFor="select-right">Select doctor :</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                id="select-right"
              />
            </div>
          </div>
        </div>
        <div className="row pt-3 px-3">
          <div className="col-4">
            <label htmlFor="select-right">Select Price :</label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangePrice}
              options={this.state.listPrice}
              id="select-right"
            />
          </div>
          <div className="col-4">
            <label htmlFor="select-right">Select Pay Method :</label>
            <Select
              value={selectedPayMethod}
              onChange={this.handleChangePay}
              options={this.state.listPayMethod}
              id="select-right"
            />
          </div>
          <div className="col-4">
            <label htmlFor="select-right">Select Province :</label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeProvince}
              options={this.state.listProvince}
              id="select-right"
            />
          </div>
        </div>
        <div className="row py-3 px-3">
          <div className="col-4">
            <label htmlFor="input">Clinic's name</label>
            <input
              onChange={(e) => this.handleChangeInput(e)}
              value={nameClinic}
              name="nameClinic"
              type="text"
              id="input"
            />
          </div>
          <div className="col-4">
            <label htmlFor="input">Clinic's address</label>
            <input
              onChange={(e) => this.handleChangeInput(e)}
              value={addressClinic}
              name="addressClinic"
              type="text"
              id="input"
            />
          </div>
          <div className="col-4">
            <label htmlFor="input">Note</label>
            <input
              onChange={(e) => this.handleChangeInput(e)}
              value={note}
              name="note"
              type="text"
              id="input"
            />
          </div>
        </div>
        <div className="row py-3 px-3">
          <div className="col-6">
            <label htmlFor="select-right">Select Specialty :</label>
            <Select
              value={selectedSpecialty}
              onChange={this.handleChangeSpecialty}
              options={this.state.listSpecialty}
              id="select-right"
            />
          </div>
          <div className="col-6">
            <label htmlFor="select-right">Select Clinic :</label>
            <Select
              value={selectedClinic}
              onChange={this.handleChangeClinic}
              options={this.state.listClinic}
              id="select-right"
            />
          </div>
        </div>
        <MdEditor
          style={{ height: "500px", padding: "0 5px 50px 5px " }}
          value={this.state.contentMarkdown}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        <button
          onClick={() => this.handleSaveDetail()}
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
  price: state.allcode.price,
  payMethod: state.allcode.payMethod,
  province: state.allcode.province,
  priceId: state.doctor.price,
  paymentId: state.doctor.payMethod,
  provinceId: state.doctor.province,
  addressClinic: state.doctor.addressClinic,
  nameClinic: state.doctor.nameClinic,
  note: state.doctor.note,
  specialties: state.specialty.specialties,
  clinics: state.clinic.clinics,
});

const mapDispatchToProps = {
  fetchAllDoctors,
  getDetailDoctor,
  getInforAllcode,
  getInforDoctor,
  getAllSpecialty,
  getAllClinic,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailDoctor);
