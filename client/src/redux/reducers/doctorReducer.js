import ACTIONS from "../actions/";

const initialState = {
  doctors: "",
  data: [],
  schedule: [],
  price: {},
  payMethod: {},
  province: {},
  addressClinic: "",
  nameClinic: "",
  note: "",
  booking:[]
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_DETAIL_DOCTOR:
      return {
        ...state,
        data: action.payload,
      };
      case ACTIONS.GET_INFOR_DOCTOR:
               return {
                 ...state,
                 price: action.payload.priceId,
                 payMethod: action.payload.paymentId,
                 province: action.payload.provinceId,
                 addressClinic: action.payload.addressClinic,
                 nameClinic: action.payload.nameClinic,
                 note: action.payload.note,
               };
    case ACTIONS.GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case ACTIONS.GET_DOCTOR_BOOKING:
      return {
        ...state,
        booking: action.payload,
      };
    case ACTIONS.GET_MY_BOOKING:
      return {
        ...state,
        booking: action.payload,
      };
    default:
      return state;
  }
};

export default doctorReducer;
