import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footwear } from '../../../../core/models/Footwear.model';
import { IBrandName } from '../../../../shared/interfaces/ISelectedBrand.interface';

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
  @Input() brands: IBrandName[] = []
  @Output() save = new EventEmitter<void>();

  onSave() {
    this.save.emit();
  }
}
