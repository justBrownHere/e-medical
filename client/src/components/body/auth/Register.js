import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty, isEmail, isLength } from "../../utils/validation/Validation";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  gender: "M",
};

function Register() {
  const [user, setUser] = useState(initialState);

  const { email, password, firstName, lastName, address, gender } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(firstName) ||
      isEmpty(password) ||
      isEmpty(lastName) ||
      isEmpty(address) ||
      isEmpty(gender)
    ) {
      toast.error("Please fill in all fields.");
    }

    if (!isEmail(email)) toast.error("Invalid emails.");
    if (isLength(password))
      toast.error("Password must be at least 6 characters.");

    try {
      const res = await axios.post("/user/register", {
        firstName,
        lastName,
        address,
        gender,
        email,
        password,
      });

      toast.success(res.data.msg);
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="d-md-flex half">
        <div
          className="bg"
          style={{
            backgroundImage: `url(https://mumbaimirror.indiatimes.com/photo/77794977.cms)`,
          }}
        />
        <div className="contents">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="form-block mx-auto">
                  <h3 className="text-uppercase">
                    Register to <strong>E-Medical</strong>
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group input-group-sm last mb-3 col-6">
                        <label htmlFor="password">First name</label>
                        <input
                          value={firstName}
                          onChange={handleChangeInput}
                          type="text"
                          name="firstName"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group last mb-3 col-6">
                        <label htmlFor="password">Last name</label>
                        <input
                          value={lastName}
                          onChange={handleChangeInput}
                          type="text"
                          name="lastName"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group first">
                      <label htmlFor="username">Email</label>
                      <input
                        name="email"
                        value={email}
                        onChange={handleChangeInput}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        value={password}
                        onChange={handleChangeInput}
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label htmlFor="password">Address</label>
                      <input
                        name="address"
                        value={address}
                        onChange={handleChangeInput}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={gender}
                        onChange={handleChangeInput}
                        class="form-control"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>

                    <div className="d-sm-flex mb-5 align-items-center row">
                      <span className="col-6">
                        <Link to="/login" className="forgot-pass">
                          Login now
                        </Link>
                      </span>
                      <span className="col-6">
                        <a href="#" className="forgot-pass">
                          Forgot Password
                        </a>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block py-2 btn-primary"
                    >
                      Register
                    </button>
                  </form>
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
      </div>
    </>
  );
}

export default Register;
