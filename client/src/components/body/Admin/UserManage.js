import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../redux/actions/usersAction";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      id: "",
      typeSelect: "All",
      typeButton: "",
      doctorSelect: {},
    };
  }
  onChangeGetUser = (e) => {
    this.setState({
      typeSelect: e.target.value,
    });
  };
  updateUser = async (e) => {
    if (e.target.name === "update") {
      try {
        await axios.patch(
          "user/update_role/",
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            address: this.state.address,
            position: this.state.position,
            role: this.state.role,
            id: this.state.id,
          },
          {
            headers: { Authorization: this.props.token },
          }
        );

        this.getAllUser();
        toast.success("Updated Success!");
      } catch (err) {
        this.getAllUser();
        toast.error(err.response.data.msg);
      }
    } else {
      try {
        await axios.post(
          "user/create-user/",
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            gender: this.state.gender,
            address: this.state.address,
            position: this.state.position,
            role: this.state.role,
            email: this.state.email,
          },
          {
            headers: { Authorization: this.props.token },
          }
        );

        this.getAllUser();
        toast.success("Account has been created!");
      } catch (err) {
        this.getAllUser();
        toast.error(err.response.data.msg);
      }
    }
  };
  handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        const res = await axios.delete(`/user/delete/${id}`, {
          headers: { Authorization: this.props.token },
        });
        toast.error(res.data.msg);
      }

      this.getAllUser();
    } catch (err) {
      this.getAllUser();
      toast.error(err.response.data.msg);
    }
  };
  getUser = (e, user) => {
    if (e.target.name === "Update") {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        gender: user.gender,
        position: user.position,
        role: user.role,
        avatar: user.avatar,
        id: user._id,
        typeButton: "Save changes",
      });
    } else {
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        gender: "M",
        position: "P0",
        role: "R3",
        avatar: "",
        id: "",
        typeButton: "Add",
      });
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    let copyState = { ...this.state };
    copyState[name] = value;
    this.setState({
      ...copyState,
    });
  };
  getAllUser = () => {
    this.props.fetchAllUsers(this.props.token);
  };
  componentDidMount() {
    this.getAllUser();
  }
  setDefaultSelect = (item) => {
    let label = `${item.firstName} ${item.lastName}`;
    this.setState({
      doctorSelect: {
        label,
        value: item._id,
      },
    });
  };
  render() {
    let {
      email,
      firstName,
      lastName,
      address,
      gender,
      position,
      role,
      typeButton,
    } = this.state;
    let { users } = this.props;
    return (
      <section id="main-content" style={{ padding: "3% 5%" }}>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {typeButton === "Add" ? "Create user" : "Update user"}
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
                <div className="container py-2">
                  <div className="row my-2">
                    <div className="col-lg-12 order-lg-1 personal-info">
                      <form role="form">
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Email
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="email"
                              defaultValue={email}
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                              disabled={typeButton === "Add" ? false : true}
                            />
                          </div>
                        </div>
                        {typeButton === "Add" ? (
                          <>
                            <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">
                                Password
                              </label>
                              <div className="col-lg-9">
                                <input
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            First name
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={firstName}
                              name="firstName"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Last name
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={lastName}
                              name="lastName"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Address
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={address}
                              name="address"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="form-group last mb-3">
                          <label>Gender</label>
                          <select
                            name="gender"
                            onChange={(e) => this.handleChange(e)}
                            class="form-control"
                          >
                            <option
                              selected={gender === "M" ? true : false}
                              value="M"
                            >
                              Male
                            </option>
                            <option
                              selected={gender === "F" ? true : false}
                              value="F"
                            >
                              Female
                            </option>
                            <option
                              selected={gender === "O" ? true : false}
                              value="O"
                            >
                              Other
                            </option>
                          </select>
                        </div>
                        <div className="form-group last mb-3">
                          <label>Position</label>
                          <select
                            name="position"
                            onChange={(e) => this.handleChange(e)}
                            class="form-control"
                          >
                            <option
                              selected={position === "P0" ? true : false}
                              value="P0"
                            >
                              None
                            </option>
                            <option
                              selected={position === "P1" ? true : false}
                              value="P1"
                            >
                              Master
                            </option>
                            <option
                              selected={position === "P2" ? true : false}
                              value="P2"
                            >
                              Doctor
                            </option>
                            <option
                              selected={position === "P3" ? true : false}
                              value="P3"
                            >
                              Associate Professor
                            </option>
                            <option
                              selected={position === "P4" ? true : false}
                              value="P4"
                            >
                              Professor
                            </option>
                          </select>
                        </div>
                        <div className="form-group last mb-3">
                          <label>Role</label>
                          <select
                            name="role"
                            onChange={(e) => this.handleChange(e)}
                            class="form-control"
                          >
                            <option
                              selected={role === "R1" ? true : false}
                              value="R1"
                            >
                              Admin
                            </option>
                            <option
                              selected={role === "R2" ? true : false}
                              value="R2"
                            >
                              Doctor
                            </option>
                            <option
                              selected={role === "R3" ? true : false}
                              value="R3"
                            >
                              User
                            </option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={(e) => this.updateUser(e)}
                  type="button"
                  className="btn btn-primary"
                  name={typeButton === "Save changes" ? "update" : "add"}
                >
                  {typeButton}
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="wrapper">
          <div className="table-agile-info">
            <div className="panel panel-default">
              <div className="panel-heading">Manage User</div>
              <div className="row w3-res-tb">
                <div className="col-sm-5 m-b-xs">
                  <div className="row">
                    <div className="col-7">
                      <select
                        onChange={(e) => this.onChangeGetUser(e)}
                        className="input-sm form-control w-sm inline v-middle mr-3"
                      >
                        <option value={"All"}>All</option>
                        <option value={"R3"}>User</option>
                        <option value={"R2"}>Doctor</option>
                        <option value={"R1"}>Admin</option>
                      </select>
                    </div>
                    <div className="col-5">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        name="add"
                        onClick={(e) => this.getUser(e, null)}
                      >
                        Add new user
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className=" form-control mr-2"
                      placeholder="Search"
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-sm btn-primary" type="button">
                        Search
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped b-t b-light">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Avatar</th>
                      <th scope="col">First name</th>
                      <th scope="col">Last name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Address</th>
                      <th scope="col">Position</th>
                      <th scope="col">Role</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => {
                      if (
                        this.state.typeSelect === "All"
                          ? item.role !== "R0"
                          : item.role === this.state.typeSelect
                      ) {
                        return (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <img
                                src={item.avatar}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>
                              {item.gender === "M"
                                ? "Male"
                                : item.gender === "F"
                                ? "Female"
                                : "Other"}
                            </td>
                            <td>{item.address}</td>
                            <td>
                              {item.position === "P0"
                                ? "None"
                                : item.position === "P1"
                                ? "Master"
                                : item.position === "P2"
                                ? "Doctor"
                                : item.position === "P3"
                                ? "Associate Professor"
                                : item.position === "P4"
                                ? "Professor"
                                : "None"}
                            </td>
                            <td>
                              {item.role === "R1"
                                ? "Admin"
                                : item.role === "R2"
                                ? "Doctor"
                                : "User"}
                            </td>
                            <td>
                              <div className="row mb-2 justify-content-center">
                                {item.role === "R2" ? (
                                  <>
                                    <Link
                                      type="button"
                                      to={`/manage-detail-doctor/${item.firstName} ${item.lastName}/${item._id}`}
                                      className="btn btn-info"
                                      onClick={() =>
                                        this.setDefaultSelect(item)
                                      }
                                    >
                                      Manage Detail
                                    </Link>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="row px-2">
                                <div className="col-6">
                                  <button
                                    type="button"
                                    className="btn btn-warning manage"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    name="Update"
                                    onClick={(e) => this.getUser(e, item)}
                                  >
                                    Edit user
                                  </button>
                                </div>
                                <div className="col-6">
                                  <button
                                    onClick={() => this.handleDelete(item._id)}
                                    className="btn manage btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
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
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  users: state.users,
  user: state.user,
});

const mapDispatchToProps = {
  fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
