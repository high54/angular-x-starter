import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject, ApplicationRef } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
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
// Services
import { OnlineOfflineService, StorageService, SynchronizationService } from './core/database/services';
// RxJs

import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContent', { static: false }) private scrollContent !: MatSidenavContent;
  public themeForm = this.fb.group({
    darkMode: false
  });
  public title = $localize`:Application name:${environment.appName}`;
  public btnAriaLabelSideNav = ':Button toggle side nav:Open side navigation';
  public btnAriaLabelToggleDarkMode = ':Button toggle dark mode:Activate dark mode';
  public progressMode = 'indeterminate';
  public isBrowserPlatform = false;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService,
    private storageService: StorageService,
    private synchronizationService: SynchronizationService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId,
    private updates: SwUpdate,
    private appRef: ApplicationRef
  ) {
    if (isPlatformBrowser(platformId)) {
      this.isBrowserPlatform = true;
    }
    if (this.isBrowserPlatform) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

  }

  public ngOnInit(): void {
    if (this.isBrowserPlatform) {
      this.checkForUpdate();
      this.loader();
      this.onlineOfflineService.connectionChanged.subscribe((connection) => {
        if (connection) {
          this.storageService.openDB().then((isOpen: boolean) => {
            if (isOpen) {
              this.synchronizationService.sync();
            }
          });
        }
      });
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode !== null) {
        this.themeForm.patchValue({ darkMode: darkMode === 'true' });
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.isBrowserPlatform) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
  }
  public changeTheme(): void {
    const { value } = this.themeForm;
    localStorage.setItem('darkMode', value.darkMode.toString());
  }
  get darkMode(): AbstractControl {
    return this.themeForm.get('darkMode');
  }
  get matches(): boolean {
    return this.isBrowserPlatform ? this.mobileQuery.matches : true;
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
      this.updates.available.subscribe(event => {
        this.updates.activateUpdate().then(() => {
          if (window.confirm(`Une mise à jour est disponible, souhaitez vous l'installer ?`)) {
            document.location.reload();
          }
        });
      });
      // Allow the app to stabilize first, before starting polling for updates with `interval()`.
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
    }

  }
}
