import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIFooterComponent } from './footer.component';

describe('UIFooterComponent', () => {
  let component: UIFooterComponent;
  let fixture: ComponentFixture<UIFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
