import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

interface Todo {
  id: number;
  summary: string;
  description: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  message: string = '';

  newTodo: Todo = {
    id: 0,
    summary: '',
    description: ''
  }
  constructor(private todoService: AppService) { }

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos(): void {
    this.todoService.getTodosList()
      .subscribe(
        data => {
          this.todos = data;
          console.log(data);
        },
        error => {
          console.log('Error retrieving todos:', error);
          this.message = 'Error retrieving todos. Please try again later.';
        });
  }
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        // Remove
        this.todos = this.todos.filter(todo => todo.id !== id)
      },
  error => {
        console.log('Error deleting todo:', error);
        this.message = 'Error deleting todo. Please try again later.';
      });
  }

  postTodo() {
    this.todoService.createTodo(this.newTodo)
      .subscribe(data => {
        this.todos.push(data)
      },
    error => {
          console.log('Error adding todo:', error);
          this.message = 'Error adding todo. Please try again later.';
      });
  }
}
