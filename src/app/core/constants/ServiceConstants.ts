import { environment } from "../../../environments/environment.development";


const API_BASE = environment.apiUrl;
const FOOTWEAR = 'footwear/';

export const ServiceConstants = {

    API_METHODS:{
        FOOTWEAR:{
            GET_ALL: API_BASE + FOOTWEAR + "getAllFootwears",
            GET_BY_ID: (id: number) => API_BASE + FOOTWEAR + "getFootwearById/" +id,
            CREATE: API_BASE + FOOTWEAR + "createFootwear",
            UPDATE: (id: number) => API_BASE + FOOTWEAR + "updateFootwear/" + id,
            DELETE: (id: number) => API_BASE + FOOTWEAR + "deleteFootwear/" + id
        },
    },
}