import {HttpClient} from "@angular/common/http";
import{map} from "rxjs";
import {ITodo} from "../interfasec/todo.interface";
import {Injectable} from "@angular/core";

//  export interface Task {
//    date: any
//    arr: ITodo
// }
@Injectable ({
  providedIn: 'root'
})

export class TasksService {
  static  url = 'https://angular-calendar-4c7cf-default-rtdb.europe-west1.firebasedatabase.app/task'
  constructor(private http: HttpClient) {
  }

  // create(task: Task) {
  //   this.http
  //     .post<any>(`${TasksService.url}/${task.date}.json`,task)
  //     .pipe(map(res=> {
  //       console.log('Response:',res)
  //       return res
  //     }))
  // }
}
