import ACTIONS from "../actions/";

const initialState = {
  clinics: [],
  clinic: {},
  doctor: [],
};

const clinicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CLINIC:
      return {
        ...state,
        clinics: action.payload,
      };
    case ACTIONS.GET_DETAIL_CLINIC:
      return {
        ...state,
        clinic: action.payload,
      };
    case ACTIONS.GET_DOCTOR_CLINIC:
      return {
        ...state,
        doctor: action.payload,
      };
    default:
      return state;
  }
};

export default clinicReducer;
