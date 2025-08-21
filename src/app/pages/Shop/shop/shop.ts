import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateFootwearDto, Footwear } from '../../../core/models/Footwear.model';
import { FootwearService } from '../../../core/services/footwear';
import { Modal } from 'bootstrap';


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

  deleteShoe(id: number): void {
    if (confirm('Are you sure you want to delete this shoe?')) {
      this.footwearService.deleteFootwear(id).subscribe({
        next: () => {
          console.log('Deleted shoe with id:', id);
          this.loadShoes(); // reload list
        },
        error: (err) => {
          console.error('Error deleting shoe:', err);
          alert('Failed to delete shoe.');
        }
      });
    }
  }

editingShoe: Footwear = {
    id: 0,
    name: '',
    brand: '',
    price: 0,
    color: '',
    size: '',
    stock: 0,
    description: '',
    imageUrl: ''
  };

formShoe: Footwear = this.emptyShoe();

emptyShoe(): Footwear {
  return {
    id: 0,
    name: '',
    brand: '',
    price: 0,
    color: '',
    size: '',
    stock: 0,
    description: '',
    imageUrl: ''
  };
}

updateShoe(): void {
  if (this.editingShoe) {
    // edit mode
    this.footwearService.updateFootwear(this.editingShoe.id, this.editingShoe).subscribe({
      next: () => {
        console.log('Updated shoe:', this.editingShoe);
        this.loadShoes();
      },
      error: (err) => {
        console.error('Error updating shoe:', err);
        alert('Failed to update shoe.');
      }
    });
  }

  // close modal
  const modalElement = document.getElementById('shoeModal');
  if (modalElement) {
    const modal = Modal.getInstance(modalElement);
    modal?.hide();
  }
}

openEditModal(shoe: Footwear): void {
  this.editingShoe = { ...shoe }; // clone to avoid mutating original
  const modalElement = document.getElementById('shoeModal');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
}

}
