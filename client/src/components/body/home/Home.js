import React from "react";
import BannerTop from "./BannerHome/BannerTop";
import CovidTracker from "./CovidTracker/CovidTracker";
import SpecialtyClinicHome from "./SpecialtyClinicHome/SpecialtyClinicHome";
import WhyChoose from "./WhyChoose/WhyChoose";
import NewLetter from "./NewLetter/NewLetter";
import OurDoctor from "./OurDoctor/OurDoctor";
import NewsHome from "./NewsHome/NewsHome";
import Slider from "react-slick";
import { connect } from "react-redux";
import { fetchAllUsers } from "../../../redux/actions/usersAction";
import axios from "axios";
import ClinicHome from "./ClinicHome/ClinicHome";

class Home extends React.Component {
  getAllUser = () => {
    this.props.fetchAllUsers(this.props.token);
  };
  componentDidMount() {
    this.getAllUser();
  }
  render() {
    
    return (
      <>
        <BannerTop />
        <CovidTracker />
        <SpecialtyClinicHome />
        <WhyChoose />
        <ClinicHome/>
        <NewLetter />
        <OurDoctor doctor={this.props.users} />
        <NewsHome />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

