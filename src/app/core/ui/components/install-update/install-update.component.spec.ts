import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Components
import { InstallUpdateComponent } from './install-update.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';

describe('InstallUpdateComponent', () => {
  let component: InstallUpdateComponent;
  let fixture: ComponentFixture<InstallUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [InstallUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
