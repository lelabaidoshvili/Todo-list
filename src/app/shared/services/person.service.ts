import { Injectable } from '@angular/core';
import {IPerson} from "../interfasec/person.interface";
import {persons} from "../../data/datas/persons";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersons(): Observable<IPerson[]> {
    return of(persons);
  }

  getPerson(id: string | number): Observable<IPerson | undefined> {
    return of(persons.find(person => person.id === id));
  }

}
