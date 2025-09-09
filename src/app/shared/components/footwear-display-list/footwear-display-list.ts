import { Component, Input, TemplateRef } from '@angular/core';
import { Footwear } from '../../../core/models/Footwear.model';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footwear-display-list',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './footwear-display-list.html',
  styleUrl: './footwear-display-list.css'
})
export class FootwearDisplayList {
  @Input() filteredShoes: Footwear[] = []; 
  @Input() contentTemplate!: TemplateRef<any>; 
}
