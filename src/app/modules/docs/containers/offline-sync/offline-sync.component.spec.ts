import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineSyncComponent } from './offline-sync.component';

describe('OfflineSyncComponent', () => {
  let component: OfflineSyncComponent;
  let fixture: ComponentFixture<OfflineSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
