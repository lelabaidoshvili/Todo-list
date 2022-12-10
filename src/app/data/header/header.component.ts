import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../shared/services/todo.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  total =0
  completed = 0
  inProgress =0
  constructor(
    private TodoService: TodoService,

  ) { }

  ngOnInit(): void {
    this.TodoService.getTodos()
      .subscribe((res:any)=>{
        this.total = res.length
        this.completed = res.filter((item:any)=>item.status==='completed').length
        this.inProgress = this.total - this.completed
      })
  }

}
