import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToDoDataService {

  private _todos: ToDo[] = [];
  private _currentId = 0;

  constructor() { }

  addToDo(todo: ToDo) {
    if (!todo.id) {
      todo.id = ++this._currentId;
    }
    this._todos.push(todo);
    return todo;
  }

  getToDo(id: number): ToDo {
    return this._todos.filter((item) => item.id === id).pop();
  }

  deleteToDo(id: number): ToDo {
    const todo = this.getToDo(id);
    this._todos = this._todos.filter((item) => item !== todo);

    return todo;
  }

  updateToDo(updatedToDo: ToDo): void {
    const currentTodo: ToDo = this._todos.filter( function(todo) {
      return todo.id === updatedToDo.id;
    }).pop();

    Object.assign(currentTodo, updatedToDo);
  }


  getAllToDos(): ToDo[] {
    return this._todos;
  }

  toggleCompleted(id: number): boolean {
    const todo = this.getToDo(id);
    todo.completed = !todo.completed;
    return todo.completed;
  }
}


export interface ToDo {
  id?: number;
  title: string;
  completed?: boolean;
}
