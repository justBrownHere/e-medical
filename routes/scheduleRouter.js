const router = require("express").Router();
const scheduleCtrl = require("../controllers/scheduleCtrl");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authDoctor = require('../middleware/doctorAuth')

router.post("/create-schedule", auth, authDoctor, scheduleCtrl.createSchedule);

router.post("/get-schedule", scheduleCtrl.getSchedule);


module.exports = router;
