import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosPorDiaComponent } from './gastos-por-dia.component';

describe('GastosPorDiaComponent', () => {
  let component: GastosPorDiaComponent;
  let fixture: ComponentFixture<GastosPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosPorDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
