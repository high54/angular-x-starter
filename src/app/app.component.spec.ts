import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SwUpdate, UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';
// Components
import { AppComponent } from './app.component';
import * as fromUIComponents from './core/ui/components';
// Mocks
import { materialModules } from './mocks/material-modules.mock';
// Rxjs
import { EMPTY, of } from 'rxjs';
import { Observable, Subject } from 'rxjs';

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
const mockSwUpdate = {
  isEnabled: true,
  activated: EMPTY,
  available: EMPTY,
  checkForUpdate: () => of(null).toPromise<void>(),
  activateUpdate: () => of(null).toPromise<void>()
};
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        ...materialModules
      ],
      declarations: [
        AppComponent,
        ...fromUIComponents.components
      ],
      providers: [
        { provide: SwUpdate, useClass: SwUpdateServerMock }
      ]
    }).compileComponents();
  }));

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
    spyOn(window, 'confirm').and.returnValue(false);
    expect(app.ngOnInit()).toBeTruthy();
  });
  it('changeTheme to darkmode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const darkMode = false;
    localStorage.setItem('darkMode', darkMode.toString());
    app.darkMode.setValue(true);
    app.changeTheme();
    expect((localStorage.getItem('darkMode') === 'true')).toBeTrue();
  });
});
