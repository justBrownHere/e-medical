const Specialty = require('../models/specialtyModel')
const _ = require("lodash");
const specialtyCtrl = {
  createSpecialty: async (req, res) => {
    try {
      const {image,name,descriptionHTML,descriptionMarkdown,id} = req.body;
      if (!image || !name || !descriptionHTML || !descriptionMarkdown) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
        }
        const specialty = await Specialty.findById(id)
        if (specialty) {
         await Specialty.findOneAndUpdate(
              { _id : id },
              { image, name, descriptionHTML, descriptionMarkdown }
            );
            res.status(200).json({ msg: "Specialty has been updated!" });
        } else {
            const newSpecialty = new Specialty({
              image,
              name,
              descriptionHTML,
              descriptionMarkdown,
            });
            await newSpecialty.save();
            res.json({ msg: "Specialty has been saved!" });
        }
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSpecialty: async (req, res) => {
    try {
      let { id } = req.body;
      let specialty = await Specialty.findById(id)
      res.status(200).json(specialty);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllSpecialty: async (req, res) => {
    try {
      let specialty = await Specialty.find({})
      res.status(200).json(specialty);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSpecialty: async (req, res) => {
    try {
      await Specialty.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = specialtyCtrl;
