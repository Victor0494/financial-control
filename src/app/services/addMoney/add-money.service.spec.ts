import { TestBed } from '@angular/core/testing';

import { AddMoneyService } from './add-money.service';

describe('AddMoneyService', () => {
  let service: AddMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
