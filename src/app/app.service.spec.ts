import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Meta, Title } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Meta, useValue: { addTag: (params?) => { }, removeTag: (params?) => { }, addTags: (params?) => { } } },
        { provide: Title, useValue: { setTitle: (params?) => { } } }
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
