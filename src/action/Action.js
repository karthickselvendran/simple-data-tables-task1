
import simpleDataTableApi from "../api/simpleDataTableApi";

export const getData = (data) => {
    return function (dispatch) {
        return simpleDataTableApi.getTableData()
            .then(res => {
                dispatch({ type: "REGISTER", res });
            })
            .catch(error => {
                throw error;
            });
    };
}
