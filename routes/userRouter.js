const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authDoctor = require("../middleware/doctorAuth");

router.post("/register", userCtrl.register);

router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.get("/infor", auth, userCtrl.getUserInfor);

router.get("/all_infor", userCtrl.getUsersAllInfor);

router.get("/logout", userCtrl.logout);

router.patch("/update", auth, userCtrl.updateUser);

router.patch("/update_role", auth, authAdmin, userCtrl.updateUsersRole);

router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

router.post("/create-user", auth, authAdmin, userCtrl.createUserByAdmin);

// Doctor
router.post("/save-details-doctor", auth, authAdmin, userCtrl.saveDetailDoctor);

router.post(
  "/save-details-doctor/:label/:value",
  auth,
  authAdmin,
  userCtrl.saveDetailDoctor
);

router.get("/all_doctor", auth, userCtrl.getAllDoctor);

router.post("/all_doctor_specialty", userCtrl.getAllDoctorBySpecialty);

router.post("/all_doctor_clinic", userCtrl.getAllDoctorByClinic);

router.get("/get-detail-doctor/:id", userCtrl.getDetailDoctor);

router.get("/get-infor-doctor/:id", userCtrl.getInforDoctor);

router.post("/save-infor-doctor", auth, authAdmin, userCtrl.saveDoctorInfor);

router.post(
  "/get-schedule-of-doctor",
  auth,
  authDoctor,
  userCtrl.getScheduleOfDoctor
);

router.post("/send-receipt", auth, authDoctor, userCtrl.confirmedBooking);

// User

router.post("/get-my-booking", auth, userCtrl.getMyBooking);

// Social Login
router.post("/google_login", userCtrl.googleLogin);

router.post("/facebook_login", userCtrl.facebookLogin);

module.exports = router;
