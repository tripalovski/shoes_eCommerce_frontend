import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootwearService } from '../../core/services/footwear-service';
import { switchMap } from 'rxjs';
import { Footwear } from '../../core/models/Footwear.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-single-footwear',
  imports: [CurrencyPipe],
  templateUrl: './single-footwear.html',
  styleUrl: './single-footwear.css'
})
export class SingleFootwear {
  route = inject(ActivatedRoute);
  router = inject(Router);
  footwearService = inject(FootwearService);
  footwear: Footwear = {} as Footwear;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        console.log(params.get('id'));
        
        if (isNaN(id)) {
          this.router.navigate(['shop']);
        }
        return this.footwearService.getFootwearById(id);
      })
    ).subscribe(footwear => {
      this.footwear = footwear;
    });
  }
}
