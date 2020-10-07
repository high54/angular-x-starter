import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenavContent } from '@angular/material/sidenav';
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
  @ViewChild('scrollContent', { static: false }) private scrollContent !: MatSidenavContent;
  public themeForm = this.fb.group({
    darkMode: false
  });
  public mobileQuery: MediaQueryList;
  public title = $localize`:Application name:Angular X Starter`;
  public progressMode = 'indeterminate';
  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private onlineOfflineService: OnlineOfflineService,
    private storageService: StorageService,
    private synchronizationService: SynchronizationService,
    private fb: FormBuilder
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

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
  public changeTheme(): void {
    const { value } = this.themeForm;
    localStorage.setItem('darkMode', value.darkMode.toString());
  }
  get darkMode(): AbstractControl {
    return this.themeForm.get('darkMode').value;
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
}
