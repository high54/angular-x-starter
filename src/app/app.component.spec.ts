import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SwUpdate, UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';
import { Router, NavigationError, ActivatedRoute } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import * as fromUIComponents from './core/ui/components';
// Mocks
import { materialModules } from './mocks/material-modules.mock';
// Rxjs
import { of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
// Services
import { OnlineOfflineService, StorageService, SynchronizationService } from './core/database/services';
// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { ElementRef } from '@angular/core';
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
export class StorageServiceMock {
  public openDB(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}

const onlineOfflineService = {
  connectionChanged: of((true))
};
const synchronizationService = {
  sync: () => ({})
};

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
  beforeEach(async(() => {
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
      providers: [
        { provide: SwUpdate, useClass: SwUpdateServerMock },
        { provide: Router, useValue: routerMock },
        { provide: OnlineOfflineService, useValue: onlineOfflineService },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: SynchronizationService, useValue: synchronizationService },
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
    const spy = spyOn(synchronizationService, 'sync').and.callFake(() => ({}));
    app.scrollContent = { getElementRef: () => (({ nativeElement: { scrollTop: 10 } }) as ElementRef<HTMLElement>) } as MatSidenavContent;
    app.ngOnInit();
    expect(app.scrollContent.getElementRef().nativeElement.scrollTop).toBe(10);
  });

  it('changeTheme to darkmode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const darkMode = false;
    localStorage.setItem('darkMode', darkMode.toString());
    app.darkMode.setValue(darkMode);
    app.changeTheme();
    expect((localStorage.getItem('darkMode') === 'false')).toBeTrue();
  });

  it(`get matches`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.matches).toBeFalse();
  });
});
