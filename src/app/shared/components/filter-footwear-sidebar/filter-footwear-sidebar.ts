import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Footwear } from '../../../core/models/Footwear.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-footwear-sidebar',
  imports: [FormsModule],
  templateUrl: './filter-footwear-sidebar.html',
  styleUrl: './filter-footwear-sidebar.css'
})
export class FilterFootwearSidebar {
  maxPrice: number = 30000;
  selectedBrand: string = '';

  brands: string[] = ['Nike', 'Adidas', 'Puma', 'New Balance'];

  private _shoes: Footwear[] = [];
  
  @Input() 
    set shoes(value: Footwear[]) {
      // Postavite vrednost _shoes na novu vrednost
      this._shoes = value;
      // Pokrenite filter svaki put kada se podaci promene
      this.applyFilter(); 
    }

    get shoes(): Footwear[] {
      return this._shoes;
    }

  filteredShoes: Footwear[] = [];
  @Output() filterShoes = new EventEmitter<Footwear[]>();     // filtered products

  // Apply local filters (price + brand)
  applyFilter() {
    this.filteredShoes = this.shoes.filter(p =>
      p.price <= this.maxPrice &&
      (this.selectedBrand === '' || p.brand === this.selectedBrand)
    );
    this.filterShoes.emit(this.filteredShoes);
  }
}
