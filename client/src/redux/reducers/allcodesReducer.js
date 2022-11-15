import ACTIONS from '../actions/'

const initialState ={
    data: [],
    price: [],
    payMethod: [],
    province:[]
}

const allcodeReducer = (state = initialState, action) => {
    switch(action.type){

        case ACTIONS.GET_ALL_TIME:
            console.log('pay',action.payload)
            return {
                ...state,
                data:action.payload
            }
        case ACTIONS.GET_INFOR_ALLCODE:
            return {
              ...state,
              price: action.payload.price,
              payMethod: action.payload.payMethod,
              province: action.payload.province,
            };
        default:
            return state
    }
}

export default allcodeReducer