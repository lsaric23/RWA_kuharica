import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes/new', component: RecipeCreateComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];