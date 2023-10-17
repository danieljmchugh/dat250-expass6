import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private baseUrl = 'http://localhost:8080/todos';

  constructor(private http: HttpClient) {}

  createTodo(todo: any): Observable<any> {
    return this.http.post(this.baseUrl, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTodosList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
