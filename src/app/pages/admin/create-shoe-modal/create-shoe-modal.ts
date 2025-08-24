import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Footwear } from '../../../core/models/Footwear.model';
import { FormsModule } from '@angular/forms';
import { SelectBrandDto } from '../../../core/models/Brand.model';

@Component({
  selector: 'app-create-shoe-modal',
  imports: [FormsModule],
  templateUrl: './create-shoe-modal.html',
  styleUrl: './create-shoe-modal.css'
})
export class CreateShoeModal {
  @Input() idModal: string = "id modal";
  @Input() modalTitle: string = "modal title";
  @Input() formShoe: Footwear = {} as Footwear;
  @Input() brands: SelectBrandDto[] = []
  @Output() save = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }
}
