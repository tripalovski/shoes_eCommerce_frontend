import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateFootwearDto, Footwear } from '../../../core/models/Footwear.model';
import { FootwearService } from '../../../core/services/footwear';

@Component({
  selector: 'app-shop',
  imports: [FormsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  maxPrice: number = 30000;
  selectedBrand: string = '';

  brands: string[] = ['Nike', 'Adidas', 'Puma', 'New Balance'];

  shoes: Footwear[] = [];         // all products from API
  filteredShoes: Footwear[] = [];     // filtered products

  
  // create form state
  newShoe: CreateFootwearDto = {
    name: '',
    brand: '',
    price: 0,
    color: '',
    size: "42",
    stock: 0,
    description: '',
    imageUrl: ''
  };
  isSubmitting = false;
  
  footwearService = inject(FootwearService)

  ngOnInit(): void {
    this.loadShoes();
  }

  // Load all footwear from API
  loadShoes(): void {
    this.footwearService.getAllFootwears().subscribe({
      next: (res: Footwear[]) => {
        this.shoes = res;
        this.applyFilter();
      },
      error: () => {
        alert('Something went wrong while loading footwear.');
      }
    });
  }

  // Apply local filters (price + brand)
  applyFilter(): void {
    this.filteredShoes = this.shoes.filter(p =>
      p.price <= this.maxPrice &&
      (this.selectedBrand === '' || p.brand === this.selectedBrand)
    );
  }

  // Reset form before opening the modal
  openCreateModal(): void {
    this.newShoe = {
      name: '',
      brand: '',
      price: 0,
      color: '',
      size: "42",
      stock: 0,
      description: '',
      imageUrl: ''
    };
  }

  // Create footwear via API
  createShoe(): void {
    // Basic guard against empty data
    if (!this.newShoe.name || !this.newShoe.brand || this.newShoe.price <= 0) {
      alert('Please fill in at least Name, Brand and a positive Price.');
      return;
    }

    this.isSubmitting = true;

    this.footwearService.createFootwear(this.newShoe).subscribe({
      next: () => {
        this.isSubmitting = false;
        // reload list and re-apply filters
        this.loadShoes();
      },
    error: (err) => {
      this.isSubmitting = false;
      console.error('Error creating shoe:', err); // full error object
      alert('Creation failed. Check console for details.');
    }
    });
  }

}
