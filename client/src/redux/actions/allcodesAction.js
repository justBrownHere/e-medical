import ACTIONS from './index'
import axios from 'axios'

export const getAllTime = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/get-time`)
    if(response.data && response.data.length > 0){
      dispatch({
        type: ACTIONS.GET_ALL_TIME,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};