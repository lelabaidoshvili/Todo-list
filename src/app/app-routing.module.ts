import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/listTodo/list-todo.module').then(m => m.ListTodoModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./components/addTodo/add-todo.module').then(m => m.AddTodoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
