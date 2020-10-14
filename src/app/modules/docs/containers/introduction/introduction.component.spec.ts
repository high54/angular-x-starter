import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Components
import { IntroductionComponent } from './introduction.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [IntroductionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
