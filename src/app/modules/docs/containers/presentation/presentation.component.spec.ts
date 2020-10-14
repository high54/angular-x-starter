import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Components
import { PresentationComponent } from './presentation.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [PresentationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
