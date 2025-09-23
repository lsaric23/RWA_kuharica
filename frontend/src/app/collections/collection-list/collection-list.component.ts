import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html'
})
export class CollectionListComponent implements OnInit {
  collections: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.getCollections().subscribe(c => this.collections = c); }
}