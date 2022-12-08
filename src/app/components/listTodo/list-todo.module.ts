import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTodoRoutingModule } from './list-todo-routing.module';
import { ListTodoComponent } from './list-todo.component';


@NgModule({
  declarations: [
    ListTodoComponent
  ],
  imports: [
    CommonModule,
    ListTodoRoutingModule
  ]
})
export class ListTodoModule { }
