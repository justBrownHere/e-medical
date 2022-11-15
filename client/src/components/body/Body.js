import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";

import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";
import UserTest from "./profile/Manage/UserTest";
import UserManage from "./Admin/UserManage";
import ManageDetailDoctor from "./profile/Manage/ManageDetailDoctor";
import DetailDoctor from "./DetailDoctor/DetailDoctor";
import ManageSchedule from "./Admin/ManageSchedule/ManageSchedule";
import ActivationBooking from "./auth/ActivationBooking";
import Home from "../body/home/Home";
import ManageSpecialty from "./Admin/ManageSpecialty/ManageSpecialty";
import ManageClinic from "./Admin/ManageClinic/ManageClinic";
import DetailSpecialty from './DetailSpecialty/DetailSpecialty'
import DetailClinic from './DetailClinic/DetailClinic'
import ManageBooking from './Admin/ManageBooking/ManageBooking'
import ManageBookingUser from './User/ManageBookingUser/ManageBookingUser'
import AllDoctor from "./AllDoctor/AllDoctor";
import AllSpecialty from "./AllSpecialty/AllSpecialty";
import AllClinic from './AllClinic/AllClinic'

import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/login" component={isLogged ? Home : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />

        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPass}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPass}
          exact
        />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route
          path="/api/activate-booking/:activation_token"
          component={ActivationBooking}
          exact
        />

        <Route
          path="/profile"
          component={isLogged ? Profile : NotFound}
          exact
        />

        <Route
          path="/manage-user"
          component={isLogged && isAdmin ? UserManage : NotFound}
          exact
        />
        <Route
          path="/manage-detail-doctor/:label/:value"
          component={isLogged && isAdmin ? ManageDetailDoctor : NotFound}
          exact
        />

        <Route
          path="/edit_user/:id"
          component={isAdmin && isLogged ? EditUser : NotFound}
          exact
        />
        <Route
          path="/manage-detail-doctor"
          component={isAdmin && isLogged ? ManageDetailDoctor : NotFound}
          exact
        />

        <Route path="/detail-doctor/:id" component={DetailDoctor} exact />

        <Route path="/detail-specialty/:id" component={DetailSpecialty} exact />

        <Route path="/detail-clinic/:id" component={DetailClinic} exact />

        <Route
          path="/manage-schedule"
          component={isLogged ? ManageSchedule : NotFound}
          exact
        />
        <Route
          path="/manage-specialty"
          component={isAdmin && isLogged ? ManageSpecialty : NotFound}
          exact
        />
        <Route
          path="/manage-clinic"
          component={isAdmin && isLogged ? ManageClinic : NotFound}
          exact
        />
        <Route
          path="/manage-booking/:id"
          component={isLogged ? ManageBooking : NotFound}
          exact
        />
        <Route
          path="/my-booking"
          component={isLogged ? ManageBookingUser : NotFound}
          exact
        />
        <Route
          path="/all-doctor"
          component={AllDoctor}
          exact
        />

        <Route
          path="/all-specialty"
          component={AllSpecialty}
          exact
        />
        <Route
          path="/all-clinic"
          component={AllClinic}
          exact
        />
      </Switch>
    </section>
  );
}

export default Body;
