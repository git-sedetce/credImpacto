import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPoloComponent } from './cadastro-polo.component';

describe('CadastroPoloComponent', () => {
  let component: CadastroPoloComponent;
  let fixture: ComponentFixture<CadastroPoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroPoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
