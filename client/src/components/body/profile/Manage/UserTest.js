import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../../redux/actions/usersAction";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class UserTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      id: "",
    };
  }
  updateUser = () => {
    try {
      axios.patch(
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
  getUser = (user) => {
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      gender: user.gender,
      position: user.position,
      role: user.role,
      avatar: user.avatar,
      id: user._id,
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
  getAllUser = () => {
    this.props.fetchAllUsers(this.props.token);
  };
  componentDidMount() {
    this.getAllUser();
  }
  render() {
    let { email, firstName, lastName, address, gender, position, role } =
      this.state;
    let { users } = this.props;
    return (
      <>
        <div className="container">
          <div>
            <div classname="row ">
              <h1 style={{ textAlign: "center", padding: "50px 0px" }}>
                Manage User
              </h1>
            </div>
            {/* Button trigger modal */}

            {/* Modal */}
          </div>

          <div className="row">
            <table class="table table-hover table-bordered table-responsive mb-5">
              <thead class="thead-light">
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
                  if (item.role === "R2") {
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
                          <button
                            type="button"
                            className="btn btn-warning manage mb-3"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => this.getUser(item)}
                          >
                            Edit user
                          </button>
                          <button
                            onClick={() => this.handleDelete(item._id)}
                            className="btn manage btn-danger"
                          >
                            Delete
                          </button>
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
  user: state.user,
});

const mapDispatchToProps = {
  fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTest);
