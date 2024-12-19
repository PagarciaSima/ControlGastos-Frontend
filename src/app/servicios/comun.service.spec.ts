import { TestBed } from '@angular/core/testing';

import { ComunService } from './comun.service';

describe('ComunService', () => {
  let service: ComunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
