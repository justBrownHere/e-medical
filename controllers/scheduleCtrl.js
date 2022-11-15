const Schedule = require("../models/scheduleModel");
const _ = require("lodash");
const Users = require('../models/userModel')
const scheduleCtrl = {
  createSchedule: async (req, res) => {
    try {
      const data = req.body;
      // const user = await Users.findById()
      if (!data || data.length === 0) {
        return res.status(400).json({ msg: "Fill in all fields, Plz !" });
      }
      let schedule = await Schedule.find({}).select("doctorId date time");
      let toCreate = _.differenceWith(data, schedule, (a, b) => {
        return a.time === b.time && a.date === b.date && a.doctorId === b.doctorId;
      });
      console.log(toCreate);

      await Schedule.insertMany(toCreate);

      res.json({ msg: "Schedule has been saved!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSchedule: async (req, res) => {
    try {
      let { doctorId } = req.body;
      let schedule = await Schedule.find({ doctorId }).populate("time","value");
      res.status(200).json(schedule);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = scheduleCtrl;
