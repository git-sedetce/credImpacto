import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderQuestionarioComponent } from './responder-questionario.component';

describe('ResponderQuestionarioComponent', () => {
  let component: ResponderQuestionarioComponent;
  let fixture: ComponentFixture<ResponderQuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponderQuestionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderQuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
