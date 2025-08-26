import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem, Footwear } from '../../../core/models/Footwear.model';
import { FootwearService } from '../../../core/services/footwear';
import { FilterFootwearSidebar } from "../../../shared/components/filter-footwear-sidebar/filter-footwear-sidebar";
import { FootwearDisplayList } from "../../../shared/components/footwear-display-list/footwear-display-list";
import { CartService } from '../../../core/services/cart-service';
import { AsyncPipe } from '@angular/common';
import { SelectBrandDto } from '../../../core/models/Brand.model';
import { Cart } from "../cart/cart";

@Component({
  selector: 'app-shop',
  imports: [FormsModule, FilterFootwearSidebar, FootwearDisplayList, AsyncPipe, Cart],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  maxPrice: number = 30000;
  selectedBrand: string = '';
  brands: SelectBrandDto[] = [];
  shoes: Footwear[] = [];         
  filteredShoes: Footwear[] = [];     
  showCart: boolean = false;

  footwearService = inject(FootwearService)
  cartService = inject(CartService);

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

  addToCart(footwear: Footwear): void {
    const cartItem: CartItem =  {
      id: footwear.id,
      name: footwear.name,
      price: footwear.price,
      quantity: 0
    }
    this.cartService.addItem(cartItem, 1);
    alert(`${footwear.name} dodat/a u korpu!`);
  }
}
