import { Component, Input, TemplateRef } from '@angular/core';
import { Brand } from '../../../core/models/Brand.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-brand-display-list',
  imports: [NgTemplateOutlet],
  templateUrl: './brand-display-list.html',
  styleUrl: './brand-display-list.css'
})
export class BrandDisplayList {
  @Input() brands: Brand[] = [];
  @Input() contentTemplate!: TemplateRef<any>; 
}
