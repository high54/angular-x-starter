import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Components
import { GettingStartedComponent } from './getting-started.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [GettingStartedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
