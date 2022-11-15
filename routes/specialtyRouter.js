const router = require("express").Router();
const specialtyCtrl = require("../controllers/specialtyCtrl");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authDoctor = require("../middleware/doctorAuth");

router.post("/create-specialty", auth, authAdmin, specialtyCtrl.createSpecialty);

router.post("/get-specialty", specialtyCtrl.getSpecialty);

router.get("/get-all-specialty", specialtyCtrl.getAllSpecialty);

router.delete("/delete-specialty/:id", auth, authAdmin, specialtyCtrl.deleteSpecialty);

module.exports = router;
