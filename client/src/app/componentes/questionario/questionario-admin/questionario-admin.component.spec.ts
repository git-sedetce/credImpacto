import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarioAdminComponent } from './questionario-admin.component';

describe('QuestionarioAdminComponent', () => {
  let component: QuestionarioAdminComponent;
  let fixture: ComponentFixture<QuestionarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionarioAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
