import ACTIONS from "./index";
import axios from "axios";

export const getDetailDoctor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/get-detail-doctor/${id}`);
    if (response.data && response.data.length > 0) {
      dispatch({
        type: ACTIONS.GET_DETAIL_DOCTOR,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ACTIONS.GET_DETAIL_DOCTOR,
        payload: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInforDoctor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/get-infor-doctor/${id}`);
    if (response.data[0]) {
      dispatch({
        type: ACTIONS.GET_INFOR_DOCTOR,
        payload: response.data[0],
      });
    } else {
      dispatch({
        type: ACTIONS.GET_INFOR_DOCTOR,
        payload: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSchedule = (doctorId) => async (dispatch) => {
  try {
    const response = await axios.post("/api/get-schedule",{doctorId});

    dispatch({
      type: ACTIONS.GET_SCHEDULE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBookingDoctor = (doctorId,date,token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/user/get-schedule-of-doctor",
      {
        doctorId,
        date,
      },
      {
        headers: { Authorization: token },
      }
    );

    dispatch({
      type: ACTIONS.GET_DOCTOR_BOOKING,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getMyBooking = (patientId,token) => async (dispatch) => {
  try {
    console.log(patientId)
    const response = await axios.post(
      "/user/get-my-booking",
      {
        patientId,
      },
      {
        headers: { Authorization: token },
      }
    );

    dispatch({
      type: ACTIONS.GET_MY_BOOKING,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getInforAllcode = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/get-infor-allcode");
    dispatch({
      type: ACTIONS.GET_INFOR_ALLCODE,
      payload: {
        price: response.data.price,
        payMethod: response.data.payMethod,
        province: response.data.province,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
