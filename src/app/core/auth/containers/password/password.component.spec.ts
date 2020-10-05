import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPasswordComponent } from './password.component';

describe('AuthPasswordComponent', () => {
  let component: AuthPasswordComponent;
  let fixture: ComponentFixture<AuthPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
