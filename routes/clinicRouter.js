const router = require("express").Router();
const clinicCtrl = require("../controllers/clinicCtrl");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authDoctor = require("../middleware/doctorAuth");

router.post("/create-clinic", auth, authAdmin, clinicCtrl.createClinic);

router.post("/get-clinic", clinicCtrl.getClinic);

router.get("/get-all-clinic", clinicCtrl.getAllClinic);

router.delete("/delete-clinic/:id", auth, authAdmin, clinicCtrl.deleteClinic);

module.exports = router;
