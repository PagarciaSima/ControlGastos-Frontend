import { TestBed } from '@angular/core/testing';
import { GastoPorDiaService } from './gasto-por-dia.service';

describe('GastoPorDiaService', () => {
  let service: GastoPorDiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastoPorDiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
