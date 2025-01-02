import { TestBed } from '@angular/core/testing';

import { GastoFijoService } from './gasto-fijo.service';

describe('GastoFijoService', () => {
  let service: GastoFijoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastoFijoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
