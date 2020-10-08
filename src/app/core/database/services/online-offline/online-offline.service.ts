import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// Rxjs
import { Subject, Observable } from 'rxjs';
// Angular Material Components
import { MatSnackBar } from '@angular/material/snack-bar';

declare const window: any;

@Injectable({
    providedIn: 'root'
})
export class OnlineOfflineService {
    private internalConnectionChanged = new Subject<boolean>();

    constructor(
        private snackBar: MatSnackBar,
        @Inject(PLATFORM_ID) platformId
    ) {
        if (isPlatformBrowser(platformId)) {
            window.addEventListener('online', () => {
                this.updateOnlineStatus();
            });
            window.addEventListener('offline', () => {
                this.openSnackBar('Connexion au réseau perdu.', 'snackBar-danger');
                this.updateOnlineStatus();
            });
        }
    }

    get connectionChanged(): Observable<boolean> {
        return this.internalConnectionChanged.asObservable();
    }

    get isOnline(): boolean {
        return !!window.navigator.onLine;
    }
    private updateOnlineStatus(): void {
        this.internalConnectionChanged.next(window.navigator.onLine);
    }

    private openSnackBar(message: string, panelClass: string): void {
        this.snackBar.open(message, '', { duration: 2000, panelClass, verticalPosition: 'top' });
    }
}
