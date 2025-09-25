import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes/new', component: RecipeCreateComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent }
];