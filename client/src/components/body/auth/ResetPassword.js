import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const initialState = {
  password: "",
  cf_password: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const history = useHistory();
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      toast.error("Password must be at least 6 characters.");
    if (!isMatch(password, cf_password)) toast.error("Password did not match.");
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);
      setTimeout(function () {
        history.push("/login");
      }, 2000);
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };

  return (
    // <div className="fg_pass">
    //     <h2>Reset Your Password</h2>

    //     <div className="row">
    //         {err && showErrMsg(err)}
    //         {success && showSuccessMsg(success)}

    //         <label htmlFor="password">Password</label>
    //         <input type="password" name="password" id="password" value={password}
    //         onChange={handleChangeInput} />

    //         <label htmlFor="cf_password">Confirm Password</label>
    //         <input type="password" name="cf_password" id="cf_password" value={cf_password}
    //         onChange={handleChangeInput} />

    //         <button onClick={handleResetPass}>Reset Password</button>
    //     </div>
    // </div>
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
                <h3 className="text-uppercase">Reset Your Password</h3>
                <form>
                  <div className="form-group first">
                    <label htmlFor="username">Password</label>
                    <input
                      name="password"
                      value={password}
                      onChange={handleChangeInput}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group first">
                    <label htmlFor="username">Confirm password</label>
                    <input
                      name="cf_password"
                      value={cf_password}
                      onChange={handleChangeInput}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleResetPass}
                    className="btn btn-block py-2 btn-primary"
                  >
                    Reset Password
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
  );
}

export default ResetPassword;
