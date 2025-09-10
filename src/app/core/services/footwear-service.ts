import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { Footwear } from '../models/Footwear.model';
import { IBrandName } from '../../shared/interfaces/ISelectedBrand.interface';
import { FootwearDto } from '../dtos/FootwearDto';
import { FootwearMappper } from '../mappers/Footwear.mapper';
import { BrandMapper } from '../mappers/Brand.mapper';
import { BrandNameDto } from '../dtos/BrandDto';

@Injectable({
  providedIn: 'root'
})
export class FootwearService {
  
  http = inject(HttpClient)

  getAllFootwears(): Observable<Footwear[]> {
    return this.http.get<FootwearDto[]>(ServiceConstants.API_METHODS.FOOTWEAR.GET_ALL).pipe(
      map(dtos => dtos.map(dto => FootwearMappper.toModel(dto))));
  }

  getFootwearById(id: number): Observable<Footwear> {
    return this.http.get<FootwearDto>(ServiceConstants.API_METHODS.FOOTWEAR.GET_BY_ID(id)).pipe(
      map(dto => FootwearMappper.toModel(dto)));
  }

  createFootwear(footwear: Footwear, brandId: number): Observable<Footwear> {
    const createFootwearDto = FootwearMappper.toCreateDto(footwear, brandId);
    return this.http.post<FootwearDto>(ServiceConstants.API_METHODS.FOOTWEAR.CREATE, createFootwearDto).pipe(
      map(dto => FootwearMappper.toModel(dto))
);
  }

  updateFootwear(footwear: Footwear, brandId: number): Observable<Footwear> {
    const dto = FootwearMappper.toDto(footwear, brandId);
    return this.http.put<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.UPDATE(dto.id), dto);
  }

  deleteFootwear(id: number): Observable<void> {
    return this.http.delete<void>(ServiceConstants.API_METHODS.FOOTWEAR.DELETE(id));
  }

  getBrandList(): Observable<IBrandName[]> {
    return this.http.get<BrandNameDto[]>(ServiceConstants.API_METHODS.FOOTWEAR.GET_BRAND_LIST).pipe(
      map(dtos => dtos.map(dto => BrandMapper.toIBrandName(dto)))
    );
  }
}
