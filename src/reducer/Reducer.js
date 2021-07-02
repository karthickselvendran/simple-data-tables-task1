import * as types from "../action/ActionTypes";

const Reducer = (state = [], action) => {
    switch (action.type) {
        case types.REGISTER:
            return {
                ...state,
                datas: action.res ? action.res.data : []
            }

        default:
            return state;
    }
}

export default Reducer;