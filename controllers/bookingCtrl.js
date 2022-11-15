const emailService = require("../services/emailService");
const Schedule = require("../models/scheduleModel");
const _ = require("lodash");
const Users = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Allcode = require("../models/allcodesModel");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;




const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;
const bookingCtrl = {
  createBooking: async (req, res) => {
    try {
      const {
        fullName,
        phoneNumber,
        email,
        address,
        dateOfBirth,
        gender,
        date,
        time,
        doctorId,
        patientId,
        reason
      } = req.body;
      if (
        !fullName ||
        !phoneNumber ||
        !gender ||
        !email ||
        !dateOfBirth ||
        !address ||
        !date ||
        !time ||
        !doctorId ||
        !patientId ||
        !reason
      ) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email !" });

      const newBooking = {
        fullName,
        phoneNumber,
        email,
        address,
        dateOfBirth,
        gender,
        date,
        time,
        doctorId,
        patientId,
        reason
      };
      const patient = await Users.findById(patientId).select("-password");
      const doctor = await Users.findById(doctorId).select("-password");
      const timeSelect = await Allcode.findById(time);
      const timeSend = timeSelect.value + " " + date;
      const patientName = patient.firstName + " " + patient.lastName;
      const nameDoctor = doctor.firstName + " " + doctor.lastName;

      const activation_token = createActivationToken(newBooking);

      const url = `${CLIENT_URL}/api/activate-booking/${activation_token}`;
      await emailService.sendSimpleEmail(
        email,
        url,
        "Active Your Appointment",
        fullName,
        patientName,
        timeSend,
        nameDoctor,
        reason
      );


      res.json({
        msg: "Please activate boongking in your email to start!",
      }); 
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const booking = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const {
        fullName,
        phoneNumber,
        email,
        address,
        dateOfBirth,
        gender,
        date,
        time,
        doctorId,
        patientId,
        reason
      } = booking;

      const newBooking = new Booking({
        fullName,
        phoneNumber,
        email,
        address,
        dateOfBirth,
        gender,
        date,
        time,
        doctorId,
        patientId,
        reason
      });

      await newBooking.save();

      res.json({ msg: "Booking has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  cancelBooking: async (req, res) => {
    try {
      let booking = await Booking.findById(req.body.id);
      booking.statusId = '61526e6993e8d31f90e6f763'
      await booking.save()
      res.status(200).json({ msg: "Canceled booking Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = bookingCtrl;
