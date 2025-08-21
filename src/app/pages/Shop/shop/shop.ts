import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateFootwearDto, Footwear } from '../../../core/models/Footwear.model';
import { FootwearService } from '../../../core/services/footwear';
import { Modal } from 'bootstrap';
import { FilterFootwearSidebar } from "../../../shared/components/filter-footwear-sidebar/filter-footwear-sidebar";


@Component({
  selector: 'app-shop',
  imports: [FormsModule, FilterFootwearSidebar],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  maxPrice: number = 30000;
  selectedBrand: string = '';

  brands: string[] = ['Nike', 'Adidas', 'Puma', 'New Balance'];

  shoes: Footwear[] = [];         // all products from API
  filteredShoes: Footwear[] = [];     // filtered products

  
  footwearService = inject(FootwearService)


  ngOnInit(): void {
    this.loadShoes();
  }


  // Load all footwear from API
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
}
