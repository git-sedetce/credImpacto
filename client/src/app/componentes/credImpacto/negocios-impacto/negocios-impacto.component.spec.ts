import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosImpactoComponent } from './negocios-impacto.component';

describe('NegociosImpactoComponent', () => {
  let component: NegociosImpactoComponent;
  let fixture: ComponentFixture<NegociosImpactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NegociosImpactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegociosImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
