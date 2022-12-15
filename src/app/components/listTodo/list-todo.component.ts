import { Component, OnInit } from '@angular/core';
import {ITodo} from "../../shared/interfasec/todo.interface";
import {TodoService} from "../../shared/services/todo.service";
import {DateService} from "../../shared/services/date.service";
import * as moment from 'moment'
import {Task} from "../../shared/services/tasks.service";
import {TasksService} from "../../shared/services/tasks.service";

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}
interface Week {
  days: Day[]
}
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  todos:ITodo[]= []
  calendar: Week[] =[]
  tasks: Task[] =[]
  task: any;
  constructor(
    private todoService: TodoService,
    public dateService: DateService,
    private tasksService: TasksService

  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.dateService.date.subscribe(this.generate.bind(this))
  }
  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, "day")
    const calendar = []
    while(date.isBefore(endDay, "day")) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(()=> {
            const value = date.add(1, "day").clone()
            const active = moment().isSame(value,"date")
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'date')



            return {
              value, active, disabled, selected
            }
          })
      })

      this.calendar = calendar
    }
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
  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
  select(day: moment.Moment) {
      this.dateService.changeDate(day)
  }
  remove(task: Task) {
    this.tasksService.remove(task).subscribe(()=> {
      this.tasks = this.tasks.filter(t => t.id!== task.id)
    }, err =>console.error(err))
  }


}
