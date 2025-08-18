import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [FormsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  maxCena: number = 30000;
  odabraniBrend: string = '';

  brendovi = ['Nike', 'Adidas', 'Puma', 'New Balance'];

  patike = [
    { naziv: 'Nike Air Max', brend: 'Nike', cena: 15000, slika: 'assets/nike1.jpg' },
    { naziv: 'Adidas Ultraboost', brend: 'Adidas', cena: 18000, slika: 'assets/adidas1.jpg' },
    { naziv: 'Puma RS-X', brend: 'Puma', cena: 12000, slika: 'assets/puma1.jpg' },
    { naziv: 'New Balance 574', brend: 'New Balance', cena: 14000, slika: 'assets/nb1.jpg' },
    { naziv: 'Nike Jordan', brend: 'Nike', cena: 25000, slika: 'assets/nike2.jpg' }
  ];

  filtriranePatike() {
    return this.patike.filter(p =>
      p.cena <= this.maxCena &&
      (this.odabraniBrend === '' || p.brend === this.odabraniBrend)
    );
  }

}
