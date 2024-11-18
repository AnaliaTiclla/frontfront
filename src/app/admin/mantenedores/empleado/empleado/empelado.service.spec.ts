import { TestBed } from '@angular/core/testing';

import { EmpeladoService } from './empelado.service';

describe('EmpeladoService', () => {
  let service: EmpeladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpeladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
