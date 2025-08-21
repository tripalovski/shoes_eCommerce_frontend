import { Component, inject } from '@angular/core';
import { CreateFootwearDto, Footwear } from '../../core/models/Footwear.model';
import { FootwearService } from '../../core/services/footwear';
import { FormsModule } from '@angular/forms';
import { CreateShoeModal } from './create-shoe-modal/create-shoe-modal';
import { Modal } from 'bootstrap';
import { FilterFootwearSidebar } from "../../shared/components/filter-footwear-sidebar/filter-footwear-sidebar";

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CreateShoeModal, FilterFootwearSidebar],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  maxPrice: number = 30000;
  selectedBrand: string = '';

  brands: string[] = ['Nike', 'Adidas', 'Puma', 'New Balance'];

  shoes: Footwear[] = []; // all footwears
  filteredShoes: Footwear[] = [];

  
  footwearService = inject(FootwearService)

  ngOnInit(): void {
    this.loadShoes();
  }


  // Load all footwear
  loadShoes(): void {
    this.footwearService.getAllFootwears().subscribe({
      next: (res: Footwear[]) => {
        this.shoes = res;
      },
      error: () => {
        alert('Something went wrong while loading footwear.');
      }
    });
  }



  // Apply local filters (price + brand)
  applyFilter(filteredShoes: Footwear[]): void {
    this.filteredShoes = filteredShoes;
  }


  // for creating new and editing exsisting footwear
  formShoe: Footwear = {
    id: 1,
    name: '',
    brand: '',
    price: 0,
    color: '',
    size: "42",
    stock: 0,
    description: '',
    imageUrl: ''
  };

  
  // Reset form before opening the modal
  openCreateModal(): void {
    this.formShoe = {
      id: 1,
      name: '',
      brand: '',
      price: 0,
      color: '',
      size: "",
      stock: 0,
      description: '',
      imageUrl: ''
    };
  }


  createShoe(): void {
    // Basic guard against empty data
    if (!this.formShoe.name || !this.formShoe.brand || this.formShoe.price <= 0) {
      alert('Please fill in at least Name, Brand and a positive Price.');
      return;
    }

    this.footwearService.createFootwear(this.formShoe).subscribe({
      next: () => {
        this.loadShoes();
      },
    error: (err) => {
      console.error('Error creating shoe:', err);
      alert('Creation failed. Check console for details.');
    }
    });
  }


  openEditModal(shoe: Footwear): void {
    this.formShoe = { ...shoe }; // clone to avoid mutating original
  }

  editShoe(): void {
    if (this.formShoe) {
      this.footwearService.updateFootwear(this.formShoe.id, this.formShoe).subscribe({
        next: () => {
          console.log('Updated shoe:', this.formShoe);
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
}
