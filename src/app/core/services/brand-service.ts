import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from '../models/Brand.model';
import { ServiceConstants } from '../constants/ServiceConstants';
import { BrandMapper } from '../mappers/Brand.mapper';
import { BrandDto } from '../dtos/BrandDto';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  
  http = inject(HttpClient);

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<BrandDto[]>(ServiceConstants.API_METHODS.BRAND.GET_ALL).pipe(
      map(dtos => dtos.map(dto => BrandMapper.toModal(dto)))
    );
  }

  createBrand(brand: Brand): Observable<Brand> {
    const brandDto = BrandMapper.toCreateDto(brand);
    return this.http.post<BrandDto>(ServiceConstants.API_METHODS.BRAND.CREATE, brandDto).pipe(
      map(dto => BrandMapper.toModal(dto))
    );
  }

  updateBrand(brand: Brand): Observable<void> {
    const brandDto = BrandMapper.toDto(brand);
    return this.http.put<void>(ServiceConstants.API_METHODS.BRAND.UPDATE(brandDto.id), brandDto);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(ServiceConstants.API_METHODS.BRAND.DELETE(id));
  }
}
