import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { CreateFootwearDto, Footwear, UpdateFootwearDto} from '../models/Footwear.model';
import { SelectBrandDto } from '../models/Brand.model';

@Injectable({
  providedIn: 'root'
})
export class FootwearService {
  
  http = inject(HttpClient)

  // GET all footwear
  getAllFootwears(): Observable<Footwear[]> {
    return this.http.get<Footwear[]>(ServiceConstants.API_METHODS.FOOTWEAR.GET_ALL);
  }

  // GET single footwear by id
  getFootwearById(id: number): Observable<Footwear> {
    return this.http.get<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.GET_BY_ID(id));
  }

  // PUT
  createFootwear(data: CreateFootwearDto): Observable<Footwear> {
    return this.http.post<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.CREATE, data);
  }

  updateFootwear(id: number, data: UpdateFootwearDto): Observable<Footwear> {
    return this.http.put<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.UPDATE(id), data);
  }

  deleteFootwear(id: number): Observable<void> {
    return this.http.delete<void>(ServiceConstants.API_METHODS.FOOTWEAR.DELETE(id));
  }

  // GET Brand list
  getBrandList(): Observable<SelectBrandDto[]> {
    return this.http.get<SelectBrandDto[]>(ServiceConstants.API_METHODS.FOOTWEAR.GET_BRAND_LIST);
  }
}
