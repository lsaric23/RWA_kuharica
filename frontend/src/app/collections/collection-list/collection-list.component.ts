import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-list.component.html'
})
export class CollectionListComponent {
  collections = [
    { name: 'Omiljeni recepti' },
    { name: 'Brzi recepti' },
    { name: 'Slatkiši' }
  ];
}