import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveWebAppComponent } from './progressive-web-app.component';

describe('ProgressiveWebAppComponent', () => {
  let component: ProgressiveWebAppComponent;
  let fixture: ComponentFixture<ProgressiveWebAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressiveWebAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressiveWebAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
