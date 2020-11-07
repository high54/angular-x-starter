import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Components
import { FooterComponent } from './footer.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
