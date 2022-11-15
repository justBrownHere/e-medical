import React, { Component } from "react";
import { connect } from "react-redux";
import { getInforDoctor } from "../../../../redux/actions/doctorAction";
import _ from 'lodash'
import axios from "axios";
import { withRouter } from "react-router";
class InforDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      price: '',
      payment: '',
      name: '',
      address: '',
      note: '',
      doctorId:this.props.match.params.id
    };
  }
  getInforDoctorByState = async (id) => {
    try {
      const response = await axios.get(`/user/get-infor-doctor/${id}`);
      if (response.data && response.data.length > 0) {
        this.setState({
          name: response.data[0].nameClinic,
          address: response.data[0].addressClinic,
          note: response.data[0].note,
        });
      }
      
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }
  getServiceDoctorByState = async (id) => {
    try {
      const response = await axios.get(`/user/get-infor-doctor/${id}`);
      console.log(response)
      if (response.data && response.data.length > 0) {
        this.setState({
          price: response.data[0].priceId.value,
          payment: response.data[0].paymentId.value,
        });
      }
      
    } catch (err) {
      console.log(err.response.data.msg)
    }
  }
  componentDidMount() {
    if (this.props.doctorId) {
      this.setState({
        doctorId: this.props.doctorId,
      });
    }

this.getInforDoctorByState(this.props.doctorId);
this.getInforDoctorByState(this.state.doctorId);
this.getServiceDoctorByState(this.state.doctorId);
this.getServiceDoctorByState(this.props.doctorId);
// this.getInforDoctorByState(this.props.h);
    }
  handleToggleShowDetailPrice = () => {
    this.setState({
      isShowDetailPrice: !this.state.isShowDetailPrice,
    });
    };
    componentDidUpdate(prevProps, prevState, snapShot) {
        // if (prevProps.data !== this.props.data) {
        //     let id = this.props.data[0].doctorId._id;
        //     this.props.getInforDoctor(id)
        // }
        // if (prevProps.priceId !== this.props.priceId) {
        //   if (!_.isEmpty(this.props.priceId)) {
        //     this.setState({
        //       price: this.props.priceId.value,
        //     });
        //   } else {
        //     this.setState({
        //       price:''
        //     })
        //   }
        // }
        // if (prevProps.paymentId !== this.props.paymentId) {
        //   if (!_.isEmpty(this.props.paymentId)) {
        //     this.setState({
        //        payment: this.props.paymentId.value
        //      })
        //   } else {
        //     this.setState({
        //       payment: ''
        //     })
        //    }
        // }
     }
  render() {
    let { isShowDetailPrice,price,payment,name,address,note } = this.state;
    return (
      <>
        <div
          style={{ width: "62%" }}
          className="address_clinic py-2 border-bottom col-12"
        >
          <h5 className="subcontent-title">Address clinic</h5>
          <p style={{ fontWeight: "bold" }}>{name}</p>
          <span>{address}</span>
        </div>
        <div className="price col-12 py-2">
          <h5 className="subcontent-title">
            Price: <span className="text-secondary">${price}</span>
          </h5>
          {isShowDetailPrice ? (
            <div className="detail-price">
              <ul class="list-group">
                <li class="list-group-item list-group-item-info">
                  <p style={{ fontSize: "16px" }}>
                    <span className="">Price:</span>
                    <span className="float-right">${price}</span>
                  </p>
                  <div style={{ width: "100%" }} className="text-secondary">
                    <span className=""> {note}</span>
                  </div>
                </li>
                <li class="list-group-item list-group-item-primary">
                  The clinic has to pay the cost in the form of {payment}
                </li>
              </ul>
              <a
                onClick={() => this.handleToggleShowDetailPrice()}
                style={{ cursor: "pointer" }}
                className="text-primary"
              >
                Hide detail
              </a>
            </div>
          ) : (
            <a
              onClick={() => this.handleToggleShowDetailPrice()}
              style={{ cursor: "pointer" }}
              className="text-primary pt-1"
            >
              Show detail
            </a>
          )}
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
  priceId: state.doctor.price,
  paymentId: state.doctor.payMethod,
  provinceId: state.doctor.province,
  addressClinic: state.doctor.addressClinic,
  nameClinic: state.doctor.nameClinic,
  note: state.doctor.note,
});

const mapDispatchToProps = {
  getInforDoctor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforDoctor));

