import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallUpdateComponent } from './install-update.component';

describe('InstallUpdateComponent', () => {
  let component: InstallUpdateComponent;
  let fixture: ComponentFixture<InstallUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
