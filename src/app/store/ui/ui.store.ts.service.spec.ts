import { TestBed } from '@angular/core/testing';

import { UiStoreTsService } from './ui.store.ts.service';

describe('UiStoreTsService', () => {
  let service: UiStoreTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiStoreTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
