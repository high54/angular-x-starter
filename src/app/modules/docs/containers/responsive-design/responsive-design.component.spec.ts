import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveDesignComponent } from './responsive-design.component';

describe('ResponsiveDesignComponent', () => {
  let component: ResponsiveDesignComponent;
  let fixture: ComponentFixture<ResponsiveDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
