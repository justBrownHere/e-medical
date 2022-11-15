const Users = require("../models/userModel");
const Markdown = require("../models/manageDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");
const DoctorInfor = require("../models/doctorInfor");
const emailService = require("../services/emailService");
const Specialty = require("../models/specialtyModel");
const Booking = require("../models/bookingModel");
const Allcode = require("../models/allcodesModel");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, gender, email, password, address } =
        req.body;
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !password ||
        !address
      ) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email !" });

      const user = await Users.findOne({ email });

      if (user)
        return res.status(400).json({ msg: "This email is already exist !" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters !" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        firstName,
        lastName,
        email,
        password: passwordHash,
        gender,
        address,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      // sendMail(email, url, "Verify your email address");
      await emailService.sendAuthEmail(email, url, "Verify your email address");

      res.json({
        msg: "Register success! Please activate your email to start!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createUserByAdmin: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        email,
        password,
        address,
        position,
        role,
      } = req.body;
      console.log(req.body);
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !password ||
        !address
      ) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email !" });

      const user = await Users.findOne({ email });

      if (user)
        return res.status(400).json({ msg: "This email is already exist !" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters !" });

      const passwordHash = await bcrypt.hash(password, 12);

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });
      const newUser = new Users({
        firstName,
        lastName,
        gender,
        email,
        password: passwordHash,
        address,
        position,
        role,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { firstName, lastName, gender, email, password, address } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        firstName,
        lastName,
        gender,
        email,
        password,
        address,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      // sendMail(email, url, "Reset your password");
      await emailService.sendAuthEmail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      console.log(req.user);
      const user = await Users.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Users.find().select("-password");

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, gender, address, avatar, position, role } =
        req.body;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstName,
          lastName,
          gender,
          address,
          avatar,
          position,
          role,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { id, role, firstName, lastName, address, gender, position } =
        req.body;

      await Users.findOneAndUpdate(
        { _id: id },
        {
          role,
          firstName,
          lastName,
          address,
          gender,
          position,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllDoctor: async (req, res) => {
    try {
      const users = await Users.find({ role: "R2" }).select("-password");

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllDoctorBySpecialty: async (req, res) => {
    try {
      let { id } = req.body;
      const data = await DoctorInfor.find({ specialtyId: id }).populate(
        "doctorId",
        "-password"
      );

      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllDoctorByClinic: async (req, res) => {
    try {
      let { id } = req.body;
      const data = await DoctorInfor.find({ clinicId: id }).populate(
        "doctorId",
        "-password"
      );

      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  saveDetailDoctor: async (req, res) => {
    try {
      let { doctorId, contentMarkdown, contentHTML, description } = req.body;
      if (!contentMarkdown || !contentHTML || !doctorId || !description) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }
      const user = await Users.findById(doctorId);
      let isExist = await Markdown.findOne({ doctorId });
      if (isExist) {
        let details = await Markdown.findOneAndUpdate(
          { doctorId },
          { contentMarkdown, contentHTML, description }
        );
        user.details = details._id;
        await user.save();
        return res.json({ msg: "Details doctor has been updated!" });
      } else {
        const user = await Users.findById(doctorId);
        const details = new Markdown({
          contentMarkdown,
          contentHTML,
          doctorId: user,
          description,
        });

        await details.save();

        user.details = details._id;
        await user.save();
        res.json({ msg: "Details doctor has been saved!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDetailDoctor: async (req, res) => {
    try {
      const doctorId = req.params.id;
      const detail = await Markdown.find({ doctorId }).populate(
        "doctorId",
        "-password"
      );
      // const detail = await Markdown.find({doctorId: req.params.id})

      // res.json([detail,user]);
      res.json(detail);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  saveDoctorInfor: async (req, res) => {
    try {
      let {
        priceId,
        provinceId,
        paymentId,
        doctorId,
        addressClinic,
        nameClinic,
        note,
        specialtyId,
        clinicId,
      } = req.body;
      if (
        !priceId ||
        !provinceId ||
        !doctorId ||
        !paymentId ||
        !addressClinic ||
        !nameClinic ||
        !note
      ) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }
      const user = await Users.findById(doctorId);

      let isExist = await DoctorInfor.findOne({ doctorId });
      if (isExist) {
        let details = await DoctorInfor.findOneAndUpdate(
          { doctorId },
          {
            priceId,
            provinceId,
            paymentId,
            addressClinic,
            nameClinic,
            note,
            specialtyId,
            clinicId,
          }
        );
        user.infor = details._id;
        await user.save();
        return res.json({ msg: "Infor doctor has been updated!" });
      } else {
        const user = await Users.findById(doctorId);
        const details = new DoctorInfor({
          priceId,
          provinceId,
          paymentId,
          addressClinic,
          nameClinic,
          note,
          doctorId,
          specialtyId,
          clinicId,
        });

        await details.save();

        user.infor = details._id;
        await user.save();
        res.json({ msg: "Details doctor has been saved!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMyBooking: async (req, res) => {
    try {
      const { patientId } = req.body;
      const schedule = await Booking.find({
        patientId,
      }).populate("doctorId patientId statusId time", "-password");
      res.json(schedule);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getScheduleOfDoctor: async (req, res) => {
    try {
      const { doctorId, date } = req.body;
      const schedule = await Booking.find({
        doctorId,
        date,
        statusId: "61526e4e93e8d31f90e6f761",
      }).populate("doctorId patientId statusId time", "-password");
      res.json(schedule);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getInforDoctor: async (req, res) => {
    try {
      const doctorId = req.params.id;
      const detail = await DoctorInfor.find({ doctorId }).populate(
        "doctorId priceId paymentId provinceId",
        "-password"
      );
      res.json(detail);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  confirmedBooking: async (req, res) => {
    try {
      const { idBooking, email, fullName, date, time, doctorId, img } =
        req.body;
      const isExist = await Booking.findById(idBooking);
      if (!isExist) {
        return res.status(400).json({ msg: "Appointment isn't exist!" });
      }
      if (!fullName || !email || !date || !time || !doctorId || !img) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }
      const doctor = await Users.findById(doctorId).select("-password");
      const timeSelect = await Allcode.findById(time);
      const timeSend = timeSelect.value + " " + date;
      const nameDoctor = doctor.firstName + " " + doctor.lastName;

      await emailService.sendReceipt(
        email,
        fullName,
        timeSend,
        nameDoctor,
        img
      );
      let detail = await Booking.findById(idBooking);
      detail.statusId = "61526e5993e8d31f90e6f762";
      await detail.save();
      res.status(200).json({ msg: "Send Receipt success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  

  // social login
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const {
        email_verified,
        email,
        given_name,
        family_name,
        picture,
        locale,
      } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      const user = await Users.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      } else {
        const newUser = new Users({
          firstName: given_name,
          lastName: family_name,
          email,
          password: passwordHash,
          avatar: picture,
          address: locale,
        });

        await newUser.save();

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      console.log(data);

      const { email, name, picture } = data;

      const firstName = name;

      const password = email + process.env.FACEBOOK_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      } else {
        const newUser = new Users({
          firstName,
          email,
          password: passwordHash,
          avatar: picture.data.url,
        });

        await newUser.save();

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      }
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

module.exports = userCtrl;
