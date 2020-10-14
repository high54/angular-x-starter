import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Services
import { StorageService } from '../storage/storage.service';
// Rxjs
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// Models
import { QueueStatus, IQueue } from '../../models/database.model';
// Angular Material Components
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
})
export class SynchronizationService {
    constructor(
        private storageService: StorageService,
        private httpClient: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    public async sync(): Promise<void> {
        await this.storageService.getWhereAll('queues', { status: QueueStatus.WAITING }).then((value: IQueue[]) => {
            this.openSnackBar();
            if (value && value.length > 0) {
                value.forEach(element => {
                    switch (element.method) {
                        case 'POST':
                            this.postData(element);
                            break;
                    }
                });
            }
            this.closeSnackBar();
            return true;
        });
    }

    private postData(element: any): void {
        this.httpClient.post<any>(element.uri, element.payload).pipe(
            map((value) => {
                this.storageService.delete('queues', { id: element.id }).then((deleteResult) => {
                }).catch((err) => {
                    console.log(err);
                });
                return value;
            })).pipe(catchError((error: any) => throwError(JSON.stringify(error)))).subscribe();
    }

    private openSnackBar(): void {
        this.snackBar.open('Synchronisation des données...', '', { duration: 2000, verticalPosition: 'top' });
    }
    private closeSnackBar(): void {
        this.snackBar.dismiss();
    }
}
