import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Footwear } from '../../../core/models/Footwear.model';
import { FormsModule } from '@angular/forms';
import { FootwearService } from '../../../core/services/footwear-service';
import { ISelectBrand } from '../../interfaces/ISelectedBrand.interface';

@Component({
  selector: 'app-filter-footwear-sidebar',
  imports: [FormsModule],
  templateUrl: './filter-footwear-sidebar.html',
  styleUrl: './filter-footwear-sidebar.css'
})
export class FilterFootwearSidebar {
  @Input() brands: ISelectBrand[] = [];
  @Input() 
    set shoes(value: Footwear[]) {
      this._shoes = value;
      this.applyFilter(); 
    }

    get shoes(): Footwear[] {
      return this._shoes;
    }

  filteredShoes: Footwear[] = [];
  @Output() filterShoes = new EventEmitter<Footwear[]>();


  footwearService = inject(FootwearService);


  maxPrice: number = 30000;
  selectedBrand: string = "";
  private _shoes: Footwear[] = [];


  // Apply local filters (price + brand)
  applyFilter() {
    this.filteredShoes = this.shoes.filter(p =>
      p.price <= this.maxPrice &&
      (this.selectedBrand === '' || p.brand === this.selectedBrand)
    );    
    this.filterShoes.emit(this.filteredShoes);
  }
}
