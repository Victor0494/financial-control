import { TestBed } from '@angular/core/testing';

import { BillStoreService } from './bill-store.service';

describe('BillStoreService', () => {
  let service: BillStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
