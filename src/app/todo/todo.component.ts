import {Component, OnInit, ViewChild} from '@angular/core';
import {ToDo, ToDoDataService} from '../todo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ToDoDataService]
})
export class ToDoComponent implements OnInit {

  @ViewChild('form') form;
  todoForm: FormGroup;

  constructor( private todoDataService: ToDoDataService, private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required]
    });
  }

  get todos(): ToDo[] {
    return this.todoDataService.getAllToDos().filter( function (todo) {
      return !todo.completed;
    });
  }

  get completeTodos(): ToDo[] {
    const completedTodos = this.todoDataService.getAllToDos().filter( function (todo) {
      return todo.completed;
    });

    return completedTodos;
  }

  addTodo() {
    if (!this.todoForm.valid) {
      return;
    }

    const todo: ToDo = this.todoForm.getRawValue();

    if (todo.id) {
      this.todoDataService.updateToDo(todo);
    } else {
      this.todoDataService.addToDo(todo);
    }

    this.form.resetForm();
  }

  editTodo(todo: ToDo): void {
    this.todoForm.patchValue(todo);
  }

  deleteTodo(todo: ToDo) {
    this.todoDataService.deleteToDo(todo.id);
  }

  markTodoComplete(todo: ToDo) {
    this.todoDataService.toggleCompleted(todo.id);
  }

  resetForm() {
    this.form.resetForm();
  }
}
