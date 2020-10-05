import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  public title = 'Angular X Starter';
  public isLoading = false;
  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService,
    private storageService: StorageService,
    private synchronizationService: SynchronizationService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  public ngOnInit(): void {
    this.loader();
    this.onlineOfflineService.connectionChanged.subscribe((connection) => {
      if (connection) {
        this.storageService.openDB().then((isOpen: boolean) => {
          this.synchronizationService.sync();
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  private loader(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          window.scrollTo(0, 0);
          break;
        }
      }
    });
  }
}
