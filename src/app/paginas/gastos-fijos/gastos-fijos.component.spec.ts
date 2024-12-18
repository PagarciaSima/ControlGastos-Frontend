import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFijosComponent } from './gastos-fijos.component';

describe('GastosFijosComponent', () => {
  let component: GastosFijosComponent;
  let fixture: ComponentFixture<GastosFijosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosFijosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
