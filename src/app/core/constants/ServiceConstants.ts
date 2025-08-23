import { environment } from "../../../environments/environment.development";


const API_BASE = environment.apiUrl;
const FOOTWEAR = API_BASE +  'footwear/';
const BRAND = API_BASE + 'brand/';

export const ServiceConstants = {

    API_METHODS:{
        FOOTWEAR:{
            GET_ALL: FOOTWEAR + "getAllFootwears",
            GET_BY_ID: (id: number) => FOOTWEAR + "getFootwearById/" +id,
            CREATE: FOOTWEAR + "createFootwear",
            UPDATE: (id: number) => FOOTWEAR + "updateFootwear/" + id,
            DELETE: (id: number) => FOOTWEAR + "deleteFootwear/" + id
        },
        BRAND:{
            GET_ALL: BRAND + "getAllBrands",
            GET_BY_ID: (id: number) => BRAND + "getBrandById/" +id,
            CREATE: BRAND + "createBrand",
            UPDATE: (id: number) => BRAND + "updateBrand/" + id,
            DELETE: (id: number) => BRAND + "deleteBrand/" + id
        },
    },
}