const Allcodes = require("../models/allcodesModel");

const allcodeCtrl = {
  createAllcodes: async (req, res) => {
    try {
      const { type, key, value } = req.body;
      if (!type || !key || !value) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
        }
        const allcodes = new Allcodes({
          type,
          key,
          value
        });

        await allcodes.save();
        res.json({ msg: "Allcodes has been created!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllTime: async(req,res)=>{
    try {
      const time = await Allcodes.find({ key: "Time" })

      res.json(time);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStatus: async(req,res)=>{
    try {
      const stt = await Allcodes.find({ key: "Status" })

      res.json(stt);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getInforAllcode: async(req,res)=>{
    try {
      const price = await Allcodes.find({ type: "PRICE" });
      const payMethod = await Allcodes.find({ type: "PAYMENT" });
      const province = await Allcodes.find({ type: "PROVINCE" });

      res.json({price,payMethod,province});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = allcodeCtrl;
