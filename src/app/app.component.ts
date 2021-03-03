import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  PLATFORM_ID,
  Inject,
  ApplicationRef,
  InjectionToken
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenavContent } from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { SwUpdate } from '@angular/service-worker';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
// RxJs
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';
// Angular Material
import { MatDialog } from '@angular/material/dialog';
// Components
import { InstallUpdateComponent } from './core/ui/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContent', { static: true }) public scrollContent !: MatSidenavContent;

  public title = $localize`:Application name:${environment.appName}`;
  public btnAriaLabelSideNav = ':Button toggle side nav:Open side navigation';
  public btnAriaLabelToggleDarkMode = ':Button toggle dark mode:Activate dark mode';
  public progressMode = 'indeterminate';
  public isBrowser = false;
  public darkMode = false;
  public langague!: string;
  public themeForm = this.fb.group({
    theme: [false]
  });

  public languageForm = this.fb.group({
    language: ''
  });

  public documentLocation = isPlatformBrowser(this.platformId) ? document.location : null;
  public windowLocation = isPlatformBrowser(this.platformId) ? window.location : null;
  private mobileQuery!: MediaQueryList;
  private mobileQueryListener!: () => void;

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private updates: SwUpdate,
    private appRef: ApplicationRef,
    private fb: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

  }
  get matches(): boolean {
    return this.isBrowser ? this.mobileQuery.matches : true;
  }
  public ngOnInit(): void {
    if (this.isBrowser) {
      this.checkForUpdate();
    }
  }
  public ngAfterViewInit(): void {
    this.loadTheme();
    this.loader();
  }


  public ngOnDestroy(): void {
    if (this.isBrowser) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
  }
  public changeTheme(): void {
    const { value } = this.themeForm;
    this.darkMode = value.theme;
    localStorage.setItem('darkMode', JSON.stringify(value.theme));
  }
  public changeLanguage(): void {
    const { value } = this.languageForm;
    this.langague = value.language;
    localStorage.setItem('language', this.langague);
    if (this.windowLocation !== null) {
      this.redirect();
    }

  }
  private loadTheme(): void {
    if (this.isBrowser) {
      const darkModeStored = localStorage.getItem('darkMode');
      const darkMode = darkModeStored ? JSON.parse(darkModeStored) : false;
      this.darkMode = darkMode;
      this.themeForm.patchValue({
        theme: darkMode
      });
    }
  }


  private redirect(): void {
    if (this.windowLocation !== null) {
      const [protocol, , host, , ...rest] = this.windowLocation.href.split('/');
      const newLocation = `${protocol}//${host}/${this.langague}/${rest.join('/')}`;
      this.windowLocation.replace(newLocation);
    }
  }


  private loader(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.progressMode = 'indeterminate';
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.scrollContent.getElementRef().nativeElement.scrollTop = 0;
          setTimeout(() => {
            this.progressMode = 'determinate';
          }, 1000);
          break;
        }
      }
    });
  }
  private checkForUpdate(): void {
    if (this.updates.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
      everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
      this.updates.available.subscribe(event => {
        this.updates.activateUpdate().then(() => {
          const dialogRef = this.dialog.open(InstallUpdateComponent, {
            width: '250px',
          });
          dialogRef.afterClosed().subscribe((install) => {
            if (install && this.documentLocation !== null) {
              this.documentLocation.reload();
            }
          });
        });
      });

    }

  }
}
