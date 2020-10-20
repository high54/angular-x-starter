import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject, ApplicationRef } from '@angular/core';
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
// Angular Material
import { MatDialog } from '@angular/material/dialog';
// Components
import { InstallUpdateComponent } from './core/ui/components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContent', { static: false }) public scrollContent !: MatSidenavContent;

  public title = $localize`:Application name:${environment.appName}`;
  public btnAriaLabelSideNav = ':Button toggle side nav:Open side navigation';
  public btnAriaLabelToggleDarkMode = ':Button toggle dark mode:Activate dark mode';
  public progressMode = 'indeterminate';
  public isBrowser = false;
  public darkMode = false;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService,
    private storageService: StorageService,
    private synchronizationService: SynchronizationService,
    @Inject(PLATFORM_ID) private platformId,
    private updates: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

  }

  public ngOnInit(): void {
    if (this.isBrowser) {
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
        this.darkMode = darkMode === 'true';
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.isBrowser) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
  }
  public changeTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  get matches(): boolean {
    return this.isBrowser ? this.mobileQuery.matches : true;
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
            if (install) {
              document.location.reload();
            }
          });
        });
      });

    }

  }
}
