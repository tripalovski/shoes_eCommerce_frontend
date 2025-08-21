import { Component, Input, TemplateRef } from '@angular/core';
import { Footwear } from '../../../core/models/Footwear.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-footwear-display-list',
  imports: [NgTemplateOutlet],
  templateUrl: './footwear-display-list.html',
  styleUrl: './footwear-display-list.css'
})
export class FootwearDisplayList {
  @Input() filteredShoes: Footwear[] = []; 
  @Input() contentTemplate!: TemplateRef<any>; 
}
