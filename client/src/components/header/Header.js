import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../utils/Loading/Loading";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged, isAdmin } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <NavLink activeClassName="active" to="#" className="avatar">
          <img
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={user.avatar}
          />{" "}
          {user.firstName}
          {isAdmin ? " - Admin" : ""}
          <i className="fas fa-angle-down"></i>
        </NavLink>
        <ul className="dropdown">
          <li
            style={{ float: "none", fontWeight: 0 }}
            className=" header-bar close"
          >
            <NavLink activeClassName="active" to="/profile">
              Profile
            </NavLink>
          </li>

          {isAdmin && (
            <li
              style={{ float: "none", fontWeight: 0 }}
              className=" header-bar close"
            >
              <NavLink activeClassName="active" to="/manage-user">
                Manage user
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li
              style={{ float: "none", fontWeight: 0 }}
              className=" header-bar close"
            >
              <NavLink activeClassName="active" to="/manage-specialty">
                Manage specialty
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li
              style={{ float: "none", fontWeight: 0 }}
              className=" header-bar close"
            >
              <NavLink activeClassName="active" to="/manage-clinic">
                Manage clinic
              </NavLink>
            </li>
          )}
          {user.role === "R2" && (
            <li
              style={{ float: "none", fontWeight: 0 }}
              className=" header-bar close"
            >
              <NavLink
                activeClassName="active"
                to={`/manage-booking/${user._id}`}
              >
                Manage booking
              </NavLink>
            </li>
          )}
          {user.role !== "R3" && (
            <li
              style={{ float: "none", fontWeight: 0 }}
              className=" header-bar close"
            >
              <NavLink activeClassName="active" to="/manage-schedule">
                Manage Schedule
              </NavLink>
            </li>
          )}
          <li
            style={{ float: "none", fontWeight: 0 }}
            className=" header-bar close"
          >
            <NavLink activeClassName="active" to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <>
      <div>
        {/* Mobile Menu Start Here */}
        <div className="mobile-menu">
          <nav className="mobile-header">
            <div className="header-logo">
              <NavLink activeClassName="active" to="/">
                <img
                  src="http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/logo/04.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="header-bar">
              <span />
              <span />
              <span />
            </div>
          </nav>
          <nav className="mobile-menu">
            <div className="mobile-menu-area">
              <div className="mobile-menu-area-inner">
                <ul className="lab-ul">
                  <li className="header-bar close">
                    <NavLink activeClassName="active" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li
                    style={{ float: "none", fontWeight: 0 }}
                    className=" header-bar close"
                  >
                    <NavLink activeClassName="active" to="/all-specialty">
                      Specialties
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/all-clinic">
                      Clinics
                    </NavLink>
                  </li>
                  {isLogged && (
                    <li
                      style={{ float: "none", fontWeight: 0 }}
                      className=" header-bar close"
                    >
                      <NavLink activeClassName="active" to="/my-booking">
                        My Booking
                      </NavLink>
                    </li>
                  )}

                  {isLogged ? (
                    userLink()
                  ) : (
                    <li className="header-bar close">
                      <NavLink activeClassName="active" to="/login">
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* Mobile Menu Ending Here */}
        {/* desktop menu start here */}
        <header className="header-section home-4">
          <div className="header-area ">
            <div className="container">
              <div className="primary-menu">
                <div className="logo">
                  <NavLink to="/">
                    <img
                      src="http://demos.codexcoder.com/labartisan/html/covid-19/assets/images/logo/04.png"
                      alt="logo"
                    />
                  </NavLink>
                </div>
                <div className="main-area">
                  <div className="main-menu">
                    <ul className="lab-ul">
                      <li className="">
                        <NavLink activeClassName="active" to="/">
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to="/all-specialty">
                          Specialties
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to="/all-clinic">
                          Clinics
                        </NavLink>
                      </li>
                      {isLogged && (
                        <li className="">
                          <NavLink activeClassName="active" to="/my-booking">
                            My Booking
                          </NavLink>
                        </li>
                      )}
                      {isLogged ? (
                        userLink()
                      ) : (
                        <li>
                          <NavLink activeClassName="active" to="/login">
                            Login
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="header-btn">
                    <NavLink to="/all-doctor" className="lab-btn style-2">
                      <span>find a doctor</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* desktop menu ending here */}
      </div>
    </>
  );
}

export default Header;
