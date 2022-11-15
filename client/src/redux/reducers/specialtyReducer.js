import ACTIONS from "../actions/";

const initialState = {
  specialties: [],
  specialty: {},
  doctor:[]
};

const specialtyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_SPECIALTY:
      return {
        ...state,
        specialties: action.payload,
      };
    case ACTIONS.GET_DETAIL_SPECIALTY:
      return {
        ...state,
        specialty: action.payload,
      };
    case ACTIONS.GET_DOCTOR_SPECIALTY:
      return {
        ...state,
        doctor: action.payload,
      };
    default:
      return state;
  }
};

export default specialtyReducer;
