import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) toast.error("Invalid emails.");
    try {
      const res = await axios.post("/user/forgot", { email });

      toast.success(res.data.msg);
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };
  // <div className="fg_pass">
  //         <h2>Forgot Your Password?</h2>

  //         <div className="row">
  //             {err && showErrMsg(err)}
  //             {success && showSuccessMsg(success)}

  //             <label htmlFor="email">Enter your email address</label>
  //             <input type="email" name="email" id="email" value={email}
  //             onChange={handleChangeInput} />
  //             <button onClick={forgotPassword}>Verify your email</button>
  //         </div>
  //     </div>
  return (
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
                <h3 className="text-uppercase">Forgot Your Password?</h3>
                <form>
                  <div className="form-group first">
                    <label htmlFor="username">Email</label>
                    <input
                      value={email}
                      onChange={handleChangeInput}
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={forgotPassword}
                    className="btn btn-block py-2 btn-primary"
                  >
                    Verify your email
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

export default ForgotPassword;
