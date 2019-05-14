import { BasicComponent } from './basic.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { click } from "../../testing.utils";



describe('actually testing a component', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;
  let deMessage: DebugElement;
  let elMessage: HTMLElement;
  let deButton: DebugElement;

  beforeEach(() => {

    // Create a "fake" module for the component to exist within.
    TestBed.configureTestingModule({
      declarations: [BasicComponent]
    }).compileComponents();

    // tell that module to create an instance of that component
    fixture = TestBed.createComponent(BasicComponent);

    // get the instance of the created component
    component = fixture.componentInstance;
    // console.log(component.message);

    // Get a referance to the UI Elements
    deMessage = fixture.debugElement.query(By.css('[data-basic-message]'));
    elMessage = deMessage.nativeElement;
    deButton = fixture.debugElement.query(By.css('[data-basic-button]'));
    fixture.detectChanges();

  })
  it('has the right defualt message', () => {
    expect(elMessage.textContent).toBe('Hello, World');
  });
  describe('clicking the button changes the message', () => {
    beforeEach(() => {
      //how to click the button?
      //it depends.  Is it a debug element, or an html element
      click(deButton);
      fixture.detectChanges();
    })
    it('shuld have the correct message', () => {
      expect(elMessage.textContent).toBe('Thanks!');
    });
  });
});

xdescribe('Testing the class directly', () => {
  let component: BasicComponent;

  beforeEach(() => {
    component = new BasicComponent();
  });

  it('should have a default message', () => {
    expect(component.message).toBe('Hello, World');
  });

  describe('clicking the button', () => {
    beforeEach(() => {
      component.changeMessage();
    });
    it('should change the message', () => {
      expect(component.message).toBe('Thanks!');
    });

  });
});
