import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/Brand.model';
import { ServiceConstants } from '../constants/ServiceConstants';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
  http = inject(HttpClient);

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(ServiceConstants.API_METHODS.BRAND.GET_ALL);
  }

  createBrand(brand: Omit<Brand, 'id'>): Observable<Brand> {
    return this.http.post<Brand>(ServiceConstants.API_METHODS.BRAND.CREATE, brand);
  }

  updateBrand(id: number, brand: Brand): Observable<void> {
    return this.http.put<void>(ServiceConstants.API_METHODS.BRAND.UPDATE(id), brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(ServiceConstants.API_METHODS.BRAND.DELETE(id));
  }
}
