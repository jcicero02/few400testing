import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectTodoListItems } from './reducers';
import { Observable } from 'rxjs';
import { TodoListItem } from './models';
import { CompletedItem, AddedItem } from './actions/list.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {


  todoList$: Observable<TodoListItem[]>;
  constructor(private stroe: Store<State>) { }

  ngOnInit() {
    this.todoList$ = this.stroe.select(selectTodoListItems);
  }

  add(item: HTMLInputElement) {
    this.stroe.dispatch(new AddedItem(item.value));
    item.value = '';
    item.focus();
  }

  complete(item: TodoListItem) {
    this.stroe.dispatch(new CompletedItem(item));
  }

}
