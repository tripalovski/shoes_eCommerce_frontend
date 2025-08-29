import { ISelectBrand } from '../../shared/interfaces/ISelectedBrand.interface';
    return this.http.get<ISelectBrand[]>(ServiceConstants.API_METHODS.FOOTWEAR.GET_BRAND_LIST);
