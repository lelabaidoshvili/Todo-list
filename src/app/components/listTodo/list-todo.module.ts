import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTodoRoutingModule } from './list-todo-routing.module';
import { ListTodoComponent } from './list-todo.component';

import { HttpClientModule} from "@angular/common/http";
import {MomentPipe} from "../../shared/services/moment.pipe";


@NgModule({
  declarations: [
    ListTodoComponent,
    MomentPipe

  ],
  imports: [
    CommonModule,
    ListTodoRoutingModule,
    HttpClientModule
  ]
})
export class ListTodoModule { }
