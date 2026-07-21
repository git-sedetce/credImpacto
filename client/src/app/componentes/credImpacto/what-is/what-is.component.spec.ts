import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsComponent } from './what-is.component';

describe('WhatIsComponent', () => {
  let component: WhatIsComponent;
  let fixture: ComponentFixture<WhatIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatIsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
