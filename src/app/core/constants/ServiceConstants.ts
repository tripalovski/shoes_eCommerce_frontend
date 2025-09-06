import { environment } from "../../../environments/environment.development";


const API_BASE = environment.apiUrl;
const FOOTWEAR = API_BASE +  'footwear/';
const BRAND = API_BASE + 'brand/';
const ORDER = API_BASE + 'order/';
const AUTH = API_BASE + 'user/';

export const ServiceConstants = {

    API_METHODS:{
        FOOTWEAR:{
            GET_ALL: FOOTWEAR + "getAllFootwears",
            GET_BY_ID: (id: number) => FOOTWEAR + "getFootwearById/" +id,
            CREATE: FOOTWEAR + "createFootwear",
            UPDATE: (id: number) => FOOTWEAR + "updateFootwear/" + id,
            DELETE: (id: number) => FOOTWEAR + "deleteFootwear/" + id,
            GET_BRAND_LIST: FOOTWEAR + "getBrandList",
        },
        BRAND:{
            GET_ALL: BRAND + "getAllBrands",
            GET_BY_ID: (id: number) => BRAND + "getBrandById/" +id,
            CREATE: BRAND + "createBrand",
            UPDATE: (id: number) => BRAND + "updateBrand/" + id,
            DELETE: (id: number) => BRAND + "deleteBrand/" + id
        },
        ORDER:{
            CREATE: ORDER + "createOrder",
            GET_ALL: ORDER + "getAllOrders",
            PATCH_STATUS: (id: number) => ORDER + "updateStatus/" + id,
            DELETE: (id: number) => ORDER + "deleteOrder/" + id,
            DELETE_ITEM: (orderId: number, footwearId: number) => ORDER + "deleteItem/" + orderId + "/" + footwearId,
        },
        AUTH:{
            REGISTER: AUTH + "register/",
            LOGIN: AUTH + "login/",
        }
    },
}