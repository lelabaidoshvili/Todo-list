import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { AddTodoRoutingModule } from './add-todo-routing.module';
import { AddTodoComponent } from './add-todo.component';



@NgModule({
  declarations: [
    AddTodoComponent
  ],
  imports: [
    CommonModule,
    AddTodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddTodoModule { }
