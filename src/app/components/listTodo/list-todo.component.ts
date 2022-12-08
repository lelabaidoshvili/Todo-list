import { Component, OnInit } from '@angular/core';
import {ITodo} from "../../shared/interfasec/todo.interface";
import {TodoService} from "../../shared/services/todo.service";

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  todos:ITodo[]= []
  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe((res) => {
      this.todos = res;
    });
  }
  delete(id: string) {
    this.todoService.deleteTodoById(id)
      .subscribe(() => {
        this.getTodos()
      })
  }
  complete(id: string) {
    this.todoService.completeTodoById(id)
      .subscribe(() => {
        this.getTodos()
      })
  }

}
