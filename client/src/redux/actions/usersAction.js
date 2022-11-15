import ACTIONS from './index'
import axios from 'axios'

// export const fetchAllUsers = async (token) => {
//     const res = await axios.get('/user/all_infor', {
//         headers: {Authorization: token}
//     })
//     return res
// }

// export const dispatchGetAllUsers = (res) => {
//     return {
//         type: ACTIONS.GET_ALL_USERS,
//         payload: res.data
//     }
// }
export const fetchAllUsers = (token) => async (dispatch) => {
  try {
    const response = await axios.get('/user/all_infor', {
        headers: {Authorization: token}
    })
    dispatch({
      type: ACTIONS.GET_ALL_USERS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllDoctors = (token) => async (dispatch) => {
  try {
    const response = await axios.get('/user/all_doctor', {
        headers: {Authorization: token}
    })
    dispatch({
      type: ACTIONS.GET_ALL_DOCTOR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};


