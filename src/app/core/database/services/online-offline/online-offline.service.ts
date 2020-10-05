import { Injectable } from '@angular/core';
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

    get connectionChanged(): Observable<boolean> {
        return this.internalConnectionChanged.asObservable();
    }

    get isOnline(): boolean {
        return !!window.navigator.onLine;
    }

    constructor(
        private snackBar: MatSnackBar
    ) {
        window.addEventListener('online', () => {
            this.updateOnlineStatus();
        });
        window.addEventListener('offline', () => {
            this.openSnackBar('Connexion au réseau perdu.', 'snackBar-danger');
            this.updateOnlineStatus();
        });
    }

    private updateOnlineStatus(): void {
        this.internalConnectionChanged.next(window.navigator.onLine);
    }

    private openSnackBar(message: string, panelClass: string): void {
        this.snackBar.open(message, '', { duration: 2000, panelClass, verticalPosition: 'top' });
    }
}
