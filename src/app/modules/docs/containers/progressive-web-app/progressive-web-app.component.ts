import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressive-web-app',
  templateUrl: './progressive-web-app.component.html',
  styleUrls: ['./progressive-web-app.component.scss']
})
export class ProgressiveWebAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get checkForUpdate(): string {
    return `private checkForUpdate(): void {
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
    } `;
  }

}
