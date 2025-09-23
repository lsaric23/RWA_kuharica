import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html'
})
export class CollectionCreateComponent {
  name = '';
  constructor(private api: ApiService, private router: Router) {}
  submit() {
    this.api.createCollection(this.name).subscribe(() => this.router.navigate(['/collections']));
  }
}