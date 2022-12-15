import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../shared/services/person.service";
import {Observable, Subscription} from "rxjs";
import {IPerson} from "../../shared/interfasec/person.interface";
import {TodoService} from "../../shared/services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Task, TasksService} from "../../shared/services/tasks.service";
import {DateService} from "../../shared/services/date.service";
import {ITodo} from "../../shared/interfasec/todo.interface";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required,),
    // dueDate: new FormControl('', Validators.required),
    responsiblePersonId: new FormControl('', Validators.required),
  });

  persons: IPerson[] = []
  arr: ITodo[] =[]
  todos:ITodo[]= []

  todoId: string | undefined
  tasks: Task[] =[]


  constructor(
    private personService: PersonService,
    private todoService: TodoService,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService
  ) {
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value=>this.tasksService.load(value))
    ).subscribe(tasks=> {
      this.tasks = tasks
    })
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
    const task: Task = {
      date: this.dateService.date.value.format('DD-MM-YYYY'),

      arr: {
        id: this.form.value.id,
        title: this.form.value.title,
        description: this.form.value.description
      }

    }
    // console.log(this.form.value)
    // this.tasksService.create(task).subscribe(task => {
    //   console.log('New Task', task)
    //   // this.form.reset()
    //
    // }, err => console.error(err))


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
    console.log(this.form.value)
    this.tasksService.create(task).subscribe(task => {
      console.log('New Task', task)
       this.form.reset()

    }, err => console.error(err))


  }
  remove(task: Task) {
    this.tasksService.remove(task).subscribe(()=> {
     this.tasks = this.tasks.filter(t => t.id!== task.id)
    }, err =>console.error(err))
  }
  getTodos() {
    this.todoService.getTodos().subscribe((res) => {
      this.todos = res;
    });
  }
  delete(id: any) {
    this.todoService.deleteTodoById(id)
      .subscribe(() => {
        this.getTodos()
      })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
