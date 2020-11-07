import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Components
import { PoliciesPrivacyComponent } from './privacy.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('PoliciesPrivacyComponent', () => {
  let component: PoliciesPrivacyComponent;
  let fixture: ComponentFixture<PoliciesPrivacyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [PoliciesPrivacyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
