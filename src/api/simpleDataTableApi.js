import axios from "axios";
import settings from './settings';

export default class simpleDataTableApi {

    static getTableData() {
        return axios.get(settings.getData);
    }

}