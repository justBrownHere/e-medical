const router = require("express").Router();
const allcodesController = require('../controllers/allcodesCtrl')
// const userCtrl = require("../controllers/userCtrl");
// const auth = require("../middleware/auth");
// const authAdmin = require("../middleware/authAdmin");

router.post("/create-allcode", allcodesController.createAllcodes);
router.get("/get-time", allcodesController.getAllTime);
router.get("/get-stt", allcodesController.getStatus);
router.get("/get-infor-allcode", allcodesController.getInforAllcode);



module.exports = router;
