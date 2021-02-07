import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Meta, Title } from '@angular/platform-browser';

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

  it('should be able to set title', () => {
    service.title = 'Tests';
    expect(service).toBeTruthy();
  });

  it('should be able to set description', () => {
    service.description = 'Tests';
    expect(service).toBeTruthy();
  });
  it('should be able to add tags', () => {
    service.addTags(['test', 'tag']);
    expect(service).toBeTruthy();
  });
});
