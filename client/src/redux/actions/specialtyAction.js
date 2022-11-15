import ACTIONS from "./index";
import axios from "axios";

export const getAllSpecialty = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/get-all-specialty`);
    if (response.data && response.data.length > 0) {
      dispatch({
        type: ACTIONS.GET_ALL_SPECIALTY,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDetailSpecialty = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/get-specialty`,{id});
    if (response.data) {
      dispatch({
        type: ACTIONS.GET_DETAIL_SPECIALTY,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllDoctorsBySpecialty = (id) => async (dispatch) => {
  try {
    const response = await axios.post("/user/all_doctor_specialty", { id });
    dispatch({
      type: ACTIONS.GET_DOCTOR_SPECIALTY,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

