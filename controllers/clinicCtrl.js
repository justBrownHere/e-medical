const Clinic = require("../models/clinicModel");
const _ = require("lodash");
const clinicCtrl = {
  createClinic: async (req, res) => {
    try {
      const { image, name, address, descriptionHTML, descriptionMarkdown, id } =
        req.body;
      if (
        !image ||
        !name ||
        !descriptionHTML ||
        !descriptionMarkdown ||
        !address
      ) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }
      const clinic = await Clinic.findById(id);
      if (clinic) {
        await Clinic.findOneAndUpdate(
          { _id: id },
          { image, name, descriptionHTML, descriptionMarkdown, address }
        );
        res.status(200).json({ msg: "Clinic has been updated!" });
      } else {
        const newClinic = new Clinic({
          image,
          name,
          descriptionHTML,
          descriptionMarkdown,
          address,
        });
        await newClinic.save();
        res.json({ msg: "Clinic has been saved!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getClinic: async (req, res) => {
    try {
      let { id } = req.body;
      let clinic = await Clinic.findById(id);
      res.status(200).json(clinic);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllClinic: async (req, res) => {
    try {
      let clinic = await Clinic.find({});
      res.status(200).json(clinic);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteClinic: async (req, res) => {
    try {
      await Clinic.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = clinicCtrl;
