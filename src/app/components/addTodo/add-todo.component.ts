import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../shared/services/person.service";
import {Observable, Subscription} from "rxjs";
import {IPerson} from "../../shared/interfasec/person.interface";
import {TodoService} from "../../shared/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import { TasksService} from "../../shared/services/tasks.service";
 // import {DateService} from "../../shared/services/date.service";
// /import {TodoStatus} from "../../shared/types/status";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required,),
    // dueDate: new FormControl('', Validators.required),
    responsiblePersonId: new FormControl('', Validators.required),
  });

  persons: IPerson[] = []

  todoId: string | undefined

  constructor(
    private personService: PersonService,
    private todoService: TodoService,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    // private dateService: DateService
  ) {
  }

  ngOnInit(): void {
    this.getPersons()
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.todoId = params['id']
        this.getTodoById(params['id'])
      }
    })
  }


  getTodoById(id: string) {
    this.subscription = this.todoService.getTodoById(id)
      .subscribe((res) => {
        if (res) {
          this.form.patchValue(res)
        }
      })
  }

  getPersons() {
    this.subscription = this.personService.getPersons()
      .subscribe((res) => {
        this.persons = res;
      })
  }

  submit() {
     this.form.markAllAsTouched()
    // const task = {
    // date: this.dateService.date.value.format('DD-MM-YYYY'),
    // arr: {}
    // }

    if (this.form.invalid) return
    const {responsiblePersonId} = this.form.value
    let responsiblePerson: IPerson | undefined
    if (responsiblePersonId) {
      responsiblePerson = this.persons.find(person => person.id === +responsiblePersonId)
    }

    if (this.todoId) {
      this.subscription = this.todoService.updateTodoById(this.todoId, {
        ...this.form.value,
        responsiblePerson: responsiblePerson
      })
        .subscribe(() => {
          this.router.navigate(['/'])
        })
    } else {
      this.subscription = this.todoService.addTodo({
        ...this.form.value,
        responsiblePerson: responsiblePerson
      })
        .subscribe(() => {
          this.router.navigate(['/'])
        })

    }

    // function myValidator(formControl: FormControl ) {
    //   if(formControl.value.length>3) {
    //     return {myValidator: {message: 'something'}};
    //   }
    //   return null;
    // }
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
