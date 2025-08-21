import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ServiceConstants } from '../constants/ServiceConstants';
import { CreateFootwearDto, Footwear} from '../models/Footwear.model';

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
  createFootwear(footWear: Footwear): Observable<Footwear> {
    const {id, ...data} = footWear;
    return this.http.post<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.CREATE, data);
  }

  updateFootwear(id: number, data: Footwear): Observable<Footwear> {
    return this.http.put<Footwear>(ServiceConstants.API_METHODS.FOOTWEAR.UPDATE(id), data);
  }

  deleteFootwear(id: number): Observable<void> {
    return this.http.delete<void>(ServiceConstants.API_METHODS.FOOTWEAR.DELETE(id));
  }
}
