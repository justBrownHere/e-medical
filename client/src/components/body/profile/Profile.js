import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { fetchAllUsers } from "../../../redux/actions/usersAction";
import { dispatchGetUser, fetchUser } from "../../../redux/actions/authAction";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../utils/Loading/Loading";

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  address: "",
  gender: "",
  cf_password: "",
  position: "",
};

const Profile = ({ fetchAllUsers, token, dispatchGetUser, fetchUser }) => {
  const auth = useSelector((state) => state.auth);
  // const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { firstName, lastName, password, cf_password, address, gender } = data;
  const [display, setDisplay] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllUsers(token);
  }, []);
  // useEffect(() => {

  //   if (isAdmin === true) {
  //      fetchAllUsers(token)
  //   }
  // }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const toggleChangePassword = () => {
    setDisplay(!display);
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) toast.error("No files were uploaded.");

      if (file.size > 1024 * 1024) toast.error("Size too large.");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        toast.error("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const updateInfor = async () => {
    try {
      axios.patch(
        "/user/update",
        {
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
          gender: gender ? gender : user.gender,
          address: address ? address : user.address,
          avatar: avatar ? avatar : user.avatar,
          role: user.role,
          position: user.position,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (token) {
        const res = await axios.get("/user/infor", {
          headers: { Authorization: token },
        });
        dispatch(dispatchGetUser(res));
      }

      toast.success("Updated Success!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      toast.error("Password must be at least 6 characters.");

    if (!isMatch(password, cf_password)) toast.error("Password did not match.");
    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Updated Success!");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleUpdate = () => {
    if (firstName || lastName || avatar || address || gender) updateInfor();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      {/* <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Admin Profile": "User Profile"}</h2>

                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.firstName}
                    placeholder="Your name" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.lastName}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChange} />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>

            <div className="col-right">
                <h2>{isAdmin ? "Users" : "My Orders"}</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div> */}
      {loading && <Loading />}
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="avatar_profile">
                <img
                  className="rounded-circle"
                  width="150px"
                  src={avatar ? avatar : user.avatar}
                />

                <span>
                  <i className="fas fa-camera"></i>
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                  />
                </span>
              </div>

              <span className="font-weight-bold">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-black-50">{user.email}</span>
            </div>
          </div>
          <div className="col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right text-default">
                  {isAdmin ? "Admin Profile" : "User Profile"}
                </h4>
              </div>
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.firstName}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.lastName}
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  placeholder="Your email address"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Address</label>
                <input
                  type="text"
                  name="address"
                  id="email"
                  defaultValue={user.address}
                  placeholder="Your address"
                />
              </div>
              <div className="form-group last mb-3">
                <label>Gender</label>
                <select
                  name="gender"
                  defaultValue={user.gender}
                  onChange={handleChange}
                  class="form-control default"
                >
                  <option
                    selected={user.gender === "M" ? true : false}
                    value="M"
                  >
                    Male
                  </option>
                  <option
                    selected={user.gender === "F" ? true : false}
                    value="F"
                  >
                    Female
                  </option>
                  <option
                    selected={user.gender === "O" ? true : false}
                    value="O"
                  >
                    Other
                  </option>
                </select>
              </div>

              {display && (
                <>
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      value={password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input
                      type="password"
                      name="cf_password"
                      id="cf_password"
                      placeholder="Confirm password"
                      value={cf_password}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <em style={{ color: "crimson" }}>
                      * If you update your password here, you will not be able
                      to login quickly using google and facebook.
                    </em>
                  </div>
                </>
              )}

              <div className="mt-5">
                <button
                  className="btn btn-default profile-button mr-5"
                  type="button"
                  disabled={loading}
                  onClick={toggleChangePassword}
                >
                  {display ? "Cancel" : "Change password"}
                </button>
                <button
                  className="btn btn-default profile-button"
                  type="button"
                  disabled={loading}
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
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
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, {
  fetchAllUsers,
  dispatchGetUser,
  fetchUser,
})(Profile);
