import { Component, Input, TemplateRef } from '@angular/core';
import { Order } from '../../../core/models/Order.model';
import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-order-display',
  imports: [DatePipe, CurrencyPipe, NgTemplateOutlet],
  templateUrl: './order-display.html',
  styleUrl: './order-display.css'
})
export class OrderDisplay {
  @Input() order: Order = {} as Order;
  @Input() orderOptionsTemplate!: TemplateRef<any>;
  @Input() itemTemplate!: TemplateRef<any>;
}
