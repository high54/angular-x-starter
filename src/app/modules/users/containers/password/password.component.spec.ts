import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPasswordComponent } from './password.component';

describe('UsersPasswordComponent', () => {
  let component: UsersPasswordComponent;
  let fixture: ComponentFixture<UsersPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
