import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '../../../core/models/Brand.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-brand-modal',
  imports: [FormsModule],
  templateUrl: './form-brand-modal.html',
  styleUrl: './form-brand-modal.css'
})
export class FormBrandModal {
  @Input() modalId: string = "Id modal"
  @Input() modalTitle: string = "modal title";
  @Input() formBrand: Brand = {} as Brand
  
  @Output() save = new EventEmitter<void>();

  onSave(){
    this.save.emit();
  }
}
