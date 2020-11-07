import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// Components
import { BreadcrumbComponent } from './breadcrumb.component';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
import { of } from 'rxjs';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  const router = {
    events: of(new NavigationEnd(1, '', ''))
  };
  const activatedRoute = {
    root: {
      routeConfig: {
        data: {
          breadcrumb: {
            label: '',
            url: 'test/test/test'
          }
        }
      },
      snapshot: {
        params: [
          'test'
        ]
      }
    }
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...materialModules
      ],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
