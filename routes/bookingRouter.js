const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const bookingCtrl = require('../controllers/bookingCtrl')
const authDoctor = require('../middleware/doctorAuth')

router.post("/create-booking", bookingCtrl.createBooking);

router.post("/cancel-booking", auth,authDoctor, bookingCtrl.cancelBooking);

router.post("/activation-booking", bookingCtrl.activateEmail);

module.exports = router;
