import { Component, inject } from '@angular/core';
import { Brand } from '../../core/models/Brand.model';
import { BrandService } from '../../core/services/brand-service';
import { BrandDisplayList } from '../../shared/components/brand-display-list/brand-display-list';
import { FormBrandModal } from "./form-brand-modal/form-brand-modal";

@Component({
  selector: 'app-admin-brand',
  imports: [BrandDisplayList, FormBrandModal],
  templateUrl: './admin-brand.html',
  styleUrl: './admin-brand.css'
})
export class AdminBrand {
  brands: Brand[] = [];
  
  formBrand: Brand = {
    id: 0,
    name: '',
    country: '',
    description: '',
    website: ''
  };


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


  openCreateModal(): void {
    this.formBrand = {
      id: 0,
      name: '',
      country: '',
      description: '',
      website: ''
    };
  }

  openEditModal(brand: Brand): void {
    this.formBrand = { ...brand };
  }

  editBrand(): void {
    if (!this.formBrand) return;
    this.brandService.updateBrand(this.formBrand).subscribe({
      next: () => this.loadBrands(),
      error: (err) => console.error('Error updating brand', err)
    });
  }


  createBrand(): void{
      this.brandService.createBrand(this.formBrand).subscribe({
        next: () => this.loadBrands(),
        error: (err) => console.error('Error creating brand', err)
      });
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => this.loadBrands(),
        error: (err) => console.error('Error deleting brand', err)
      });
    }
  }
}
