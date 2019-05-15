import { ReplaySubject, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TodoEffects } from './todo.effects';
import { TodoDataService } from './todos.data.service';
import { TodoEntity } from './reducers';
import { provideMockActions } from '@ngrx/effects/testing';
import * as listActions from './actions/list.actions';

class FakeDataService extends TodoDataService {
  constructor() {
    super(null);
  }
  addTodo(description: string) {
    const response: TodoEntity = { description, id: '42' };
    return of(response);
  }
}

describe('the todo effect', () => {
  let effect: TodoEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        { provide: TodoDataService, useClass: FakeDataService },
        provideMockActions(() => actions)
      ]
    });
    effect = TestBed.get(TodoEffects);
  });

  it('turns an ITEM_ADDED into ITEM_ADDED_SUCCESSFULLY', () => {
    actions = new ReplaySubject(1);
    const action = new listActions.AddedItem('Tacos');
    actions.next(action);

    effect.itemAdded$.subscribe(result => {
      const expected: listActions.ItemAddedSuccessfully = {
        type: listActions.ITEM_ADD_SUCCESS,
        oldId: action.item.id,
        item: {
          id: '42',
          description: 'Tacos'
        }
      };
      // expect(result).toEqual(expected);
      expect(result.oldId).toBe(expected.oldId);
      expect(result.type).toBe(expected.type);
      // expect(result.item).toBe(expected.item);
      // expect(result.item.id).toEqual(exp)
      expect(result.item.id).toEqual(expected.item.id);
      expect(result.item.description).toEqual(expected.item.description);
    });
  });

});


