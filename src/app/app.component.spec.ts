import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SwUpdate, UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';
import { Router, NavigationError, ActivatedRoute } from '@angular/router';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import * as fromUIComponents from './core/ui/components';
// Mocks
import { materialModules } from './mocks/material-modules.mock';
// Rxjs
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavContent } from '@angular/material/sidenav';

export class SwUpdateServerMock {
  public available: Observable<UpdateAvailableEvent> = of(({} as UpdateAvailableEvent));
  public activated: Observable<UpdateActivatedEvent> = new Subject();
  public isEnabled = true;

  public checkForUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
  public activateUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}
const routerMock = {
  navigateByUrl: (params: string) => { },
  navigate: (params: string[]) => { },
  events: of(new NavigationError(1, '', {})),
  createUrlTree: () => ({}),
  serializeUrl: () => ({}),
  routerState: () => ({})
};
const dialogMock = {
  open: () => ({
    afterClosed: () => of(false)
  })
};
describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ...materialModules
      ],
      declarations: [
        AppComponent,
        ...fromUIComponents.components
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: SwUpdate, useClass: SwUpdateServerMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-x-starter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular X Starter');
  });

  it(`Trigger OnInit`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.scrollContent = { getElementRef: () => (({ nativeElement: { scrollTop: 10 } }) as ElementRef<HTMLElement>) } as MatSidenavContent;
    app.ngOnInit();
    expect(app.scrollContent.getElementRef().nativeElement.scrollTop).toBe(10);
  });

  it(`Trigger ngAfterViewInit in platform server`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isBrowser = false;
    app.ngAfterViewInit();
  }));
  it(`Trigger ngAfterViewInit in platform browser`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isBrowser = true;
    app.documentLocation = {
      reload: () => { }
    } as any;
    app.windowLocation = {
      replace: () => { },
      href: 'http://test.com/tests'
    } as any;
    localStorage.removeItem('language');
    app.ngAfterViewInit();
  }));
  it(`Trigger ngAfterViewInit in platform browser with local state for language`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isBrowser = true;
    localStorage.setItem('language', 'en');
    app.documentLocation = {
      reload: () => { }
    } as any;
    app.windowLocation = {
      replace: () => { },
      href: 'http://test.com/tests'
    } as any;
    app.ngAfterViewInit();
  }));
  it('changeTheme to darkmode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const darkMode = false;
    localStorage.setItem('darkMode', darkMode.toString());
    app.darkMode = darkMode;
    app.themeForm.get('theme').setValue(true);
    app.changeTheme();
    expect((localStorage.getItem('darkMode') === 'true')).toBeTrue();
  });

  it('change language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.languageForm.get('language').setValue('FR');
    app.documentLocation = {
      reload: () => { }
    } as any;
    app.windowLocation = {
      replace: () => { },
      href: 'http://test.com/tests'
    } as any;
    app.changeLanguage();

  });

  it(`get matches`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.matches).toBeFalse();
  });

  it(`Trigger OnInit`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isBrowser = false;
    app.scrollContent = { getElementRef: () => (({ nativeElement: { scrollTop: 10 } }) as ElementRef<HTMLElement>) } as MatSidenavContent;
    app.ngOnInit();
    expect(app.scrollContent.getElementRef().nativeElement.scrollTop).toBe(10);
  });
});
