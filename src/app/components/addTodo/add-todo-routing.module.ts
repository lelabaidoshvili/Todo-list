import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTodoComponent} from "./add-todo.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todo/create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: AddTodoComponent
  },
  {
    path: 'edit/:id',
    component: AddTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTodoRoutingModule { }
