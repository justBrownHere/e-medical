import ACTIONS from "./index";
import axios from "axios";

export const getAllClinic = () => async (dispatch) => {
  try {
      const response = await axios.get(`/api/get-all-clinic`);
      console.log('res',response)
    if (response.data && response.data.length > 0) {
      dispatch({
        type: ACTIONS.GET_ALL_CLINIC,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDetailClinic = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/get-clinic`, { id });
    if (response.data) {
      dispatch({
        type: ACTIONS.GET_DETAIL_CLINIC,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllDoctorsByClinic = (id) => async (dispatch) => {
  try {
    const response = await axios.post("/user/all_doctor_clinic", { id });
    dispatch({
      type: ACTIONS.GET_DOCTOR_CLINIC,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
