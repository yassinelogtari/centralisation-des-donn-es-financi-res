import { TestBed } from '@angular/core/testing';

import { FilledFileService } from './filled-file.service';

describe('FilledFileService', () => {
  let service: FilledFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilledFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
