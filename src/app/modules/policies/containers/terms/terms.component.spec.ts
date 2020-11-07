import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Components
import { PoliciesTermsComponent } from './terms.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('PoliciesTermsComponent', () => {
  let component: PoliciesTermsComponent;
  let fixture: ComponentFixture<PoliciesTermsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [PoliciesTermsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
