import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/auth/services';
import { IQueue, QueueStatus } from '../../models/database.model';
import { SynchronizationService } from './synchronization.service';
import { StorageService } from '../storage/storage.service';
import * as config from '../../../config/api';

describe('Core - Database - Service - Synchronization', () => {
    let service: SynchronizationService;
    let httpMock: HttpTestingController;
    let storage: StorageService;
    beforeEach(async(() => {
        /**
         * Agit comme un NgModule, on déclare est importe ce qui est utilisé
         * dans le composant/Service/Pipe/etc et dans le test en lui même.
         * Puis le composant/Service/Pipe/etc est compillé.
         */
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
            ],
            providers: [
                SynchronizationService,
                { provide: MatSnackBar, useValue: { open: () => true, dismiss: () => true } },
                StorageService
            ],
        }).compileComponents();
        service = TestBed.get(SynchronizationService);
        httpMock = TestBed.get(HttpTestingController);
        storage = TestBed.get(StorageService);

    }));
    afterEach(() => {
        httpMock.verify();
    });
    it('Should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('Should sync the Queue', () => {
        storage.openDB().then(() => {
            const syncSpy = spyOn(service, 'sync').and.callThrough();
            service.sync();
            expect(syncSpy).toHaveBeenCalled();
        });
    });
    it('Should post data', async () => {
        storage.openDB().then(() => {
            let valeurTemp = [];
            storage.getWhereAll('queues', { status: QueueStatus.WAITING }).then((value: IQueue[]) => {
                valeurTemp = value;
                const syncSpy = spyOn(service, 'sync').and.callThrough();
                if (valeurTemp.length > 0) {
                    service.sync();
                    const req = httpMock.expectOne(valeurTemp[0].uri);
                    req.flush({ status: 200, statusText: 'OK' });
                    expect(syncSpy).toHaveBeenCalled();
                }
            });
        });

    });

});
