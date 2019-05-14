import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookDataService } from '../book-data.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { first } from 'rxjs/operators';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let deList: DebugElement;
  let elList: HTMLUListElement;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      // tslint:disable-next-line: no-use-before-declare
      providers: [{ provide: BookDataService, useClass: FakeBookDataService }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    deList = fixture.debugElement.query(By.css('[data-book-list]'));
    elList = deList.nativeElement;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the books property', async () => {
    expect(component.books$).not.toBeUndefined();
    const books = await component.books$.pipe(
      first()
    ).toPromise();
    expect(books[0].title).toBe('Walden');
  });
  it('has the list', () => {
    expect(elList.childElementCount).toBe(2);
  });
  it('formats the entries correctly', () => {
    const li = elList.firstElementChild as HTMLLIElement;
    expect(li.innerText).toBe('1 is Walden');
  });
});


class FakeBookDataService extends BookDataService {
  constructor() {
    super(null); // make sure there is no http client harmed
  }

  getBooks() {
    return of([
      { id: '1', title: 'Walden' },
      { id: '2', title: 'Nature' }
    ]);
  }
}
