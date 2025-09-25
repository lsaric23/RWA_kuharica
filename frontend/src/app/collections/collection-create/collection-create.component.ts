import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collection-create.component.html'
})
export class CollectionCreateComponent {
  name = '';

  create() {
    console.log('Nova kolekcija:', this.name);
  }
}