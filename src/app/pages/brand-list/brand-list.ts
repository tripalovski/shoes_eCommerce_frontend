import { Component, inject } from '@angular/core';
import { Brand } from '../../core/models/Brand.model';
import { BrandService } from '../../core/services/brand-service';
import { BrandDisplayList } from '../../shared/components/brand-display-list/brand-display-list';

@Component({
  selector: 'app-brand-list',
  imports: [BrandDisplayList],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css'
})
export class BrandList {
  brands: Brand[] = [];

  brandService = inject(BrandService);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (err) => {
        console.error('Error loading brands', err);
      }
    });
  }
}
