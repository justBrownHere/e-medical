import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Loading from "../../utils/Loading/Loading";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { email, password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      setLoading(false);
      toast.success(res.data.msg);
      history.push("/");
    } catch (err) {
      setLoading(false);
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };

  const responseGoogle = async (response) => {
    setLoading(true);
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      toast.success(res.data.msg);
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };

  const responseFacebook = async (response) => {
    setLoading(true);
    try {
      const { accessToken, userID } = response;
      console.log(response);
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      toast.success(res.data.msg);
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      err.response.data.msg && toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      {loading && <Loading />}
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
                    Login to <strong>E-Medical</strong>
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group first">
                      <label htmlFor="username">Email</label>
                      <input
                        value={email}
                        name="email"
                        onChange={handleChangeInput}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="d-sm-flex mb-5 align-items-center row">
                      <span className="col-6">
                        <Link to="/register" className="forgot-pass">
                          Create a new account
                        </Link>
                      </span>
                      <span className="col-6">
                        <Link to="/forgot_password">Forgot your password?</Link>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block py-2 btn-primary"
                    >
                      Login
                    </button>
                    <span className="text-center my-3 d-block">or</span>
                    <div className>
                      <div className="row">
                        <div className="col-6">
                          <FacebookLogin
                            appId="290059119258560"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                          />
                        </div>
                        <div className="col-6">
                          <GoogleLogin
                            clientId="856481487114-a5l7ot4ooenqavjt40mtk8enfafs6bmi.apps.googleusercontent.com"
                            buttonText="Login with google"
                            onSuccess={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                        </div>
                      </div>
                    </div>
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

export default Login;
