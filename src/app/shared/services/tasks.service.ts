import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ITodo} from "../interfasec/todo.interface";
import {Injectable} from "@angular/core";
import * as moment from 'moment'

 export interface Task {
   date: any
   id?: string
   arr: ITodo
}

interface CreateResponse {
   name: string
}
@Injectable ({
  providedIn: 'root'
})

export class TasksService {
  static  url = 'https://angular-angular-a99dd-default-rtdb.europe-west1.firebasedatabase.app/'
  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment):Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if(!tasks) {
          return []

        }
        return Object.keys(tasks).map((key: any)=>({...tasks[key], id:key}))
      }))
  }

  create(task: Task): Observable<Task> {
    // if(task)
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`,task)
      .pipe(map(res=> {
        console.log('Response:',res)
        return {...task, id: res.name}
      }))
  }

  remove(task:Task):Observable<void> {
    // return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.arr.title}/${task.arr.id}/${task.arr.description}.json`)
    return this.http.delete<void>(`${TasksService.url}/${name}.json`)
  }


}
