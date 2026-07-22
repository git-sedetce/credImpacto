import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCapacitacaoComponent } from './fluxo-capacitacao.component';

describe('FluxoCapacitacaoComponent', () => {
  let component: FluxoCapacitacaoComponent;
  let fixture: ComponentFixture<FluxoCapacitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluxoCapacitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCapacitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
