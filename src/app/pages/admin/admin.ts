import { Component, inject } from '@angular/core';
import { FootwearService } from '../../core/services/footwear';
import { FormsModule } from '@angular/forms';
import { CreateShoeModal } from './create-shoe-modal/create-shoe-modal';
import { FilterFootwearSidebar } from "../../shared/components/filter-footwear-sidebar/filter-footwear-sidebar";
import { FootwearDisplayList } from "../../shared/components/footwear-display-list/footwear-display-list";
import { CreateFootwearDto, Footwear, UpdateFootwearDto } from '../../core/models/Footwear.model';
import { SelectBrandDto } from '../../core/models/Brand.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CreateShoeModal, FilterFootwearSidebar, FootwearDisplayList],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  footwearService = inject(FootwearService)


  maxPrice: number = 30000;
  shoes: Footwear[] = []; // all footwears
  filteredShoes: Footwear[] = [];
  brands: SelectBrandDto[] = [];
  

  ngOnInit(): void {
    this.loadShoes();
    this.loadBrands();
  }

  loadBrands(){
    this.footwearService.getBrandList().subscribe({
      next: (res: SelectBrandDto[]) => {
        this.brands = res;  
      },
      error: () => {
        alert('Something went wrong while loading footwear.');
      }
    }); 
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

    const {id, brand, ...createFootwear} = this.formShoe;
    const brandId: number = this.brands.find(b => b.name === brand)!.id;
    const createFootwearDto: CreateFootwearDto = {...createFootwear, brandId}

    this.footwearService.createFootwear(createFootwearDto).subscribe({
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
      const {brand, ...updateFootwear} = this.formShoe
      const brandId = this.brands.find(b => b.name === brand)!.id;
      const updateFootwearDto: UpdateFootwearDto = {...updateFootwear, brandId}

      this.footwearService.updateFootwear(updateFootwearDto.id, updateFootwearDto).subscribe({
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
