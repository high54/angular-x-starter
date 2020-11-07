import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { AuthService } from 'src/app/core/auth/services';
import { StorageService } from './storage.service';
// Modules
import { IQueue, QueueStatus } from '../../models/database.model';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';

describe('Core - Database - Service - Storage', () => {
    let service: StorageService;
    beforeEach(waitForAsync(() => {
        /**
         * Agit comme un NgModule, on déclare est importe ce qui est utilisé
         * dans le composant/Service/Pipe/etc et dans le test en lui même.
         * Puis le composant/Service/Pipe/etc est compillé.
         */
        TestBed.configureTestingModule({
            imports: [
                ...materialModules
            ],
            declarations: [
            ],
            providers: [
                StorageService,
                { provide: MatSnackBar, useValue: { open: () => true } },
                { provide: AuthService, useValue: {} },
            ],
        }).compileComponents();
        service = TestBed.inject(StorageService);
    }));
    it('Should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('Should open the database', async () => {
        const spy = spyOn(service, 'openDB').and.callThrough();
        service.openDB();
        expect(spy).toHaveBeenCalled();
    });

    it('Return true when the database is open', async () => {
        const spy = spyOn(service, 'openDB').and.callThrough();
        await service.openDB();
        expect(spy).toHaveBeenCalled();
        expect(service.dbIsOpen).toBeTruthy();
    });

    it('Can add table to the local database', async () => {
        const spy = spyOn(service, 'openDB').and.callThrough();
        await service.openDB();
        expect(spy).toHaveBeenCalled();
        const addSpy = spyOn(service, 'add').and.callThrough();
        const testData: IQueue = {
            method: 'POST',
            status: QueueStatus.WAITING,
            uri: environment.apiUrlBase,
            params: 'none'
        };
        service.openDB();
        service.add('queues', testData);
        expect(addSpy).toHaveBeenCalled();
        const getTableSpy = spyOn(service, 'getTable').and.callThrough();
        const result = service.getTable('queues');
        expect(getTableSpy).toHaveBeenCalled();
        const getWhereAllSpy = spyOn(service, 'getWhereAll').and.callThrough();
        service.getWhereAll('queues', { method: 'POST' }).then((val: IQueue[]) => {
            if (val[0]) {
                expect(val[0].method).toEqual('POST');
            }
        });
        expect(getWhereAllSpy).toHaveBeenCalled();
        const whereFirstSpy = spyOn(service, 'getWhereFirst').and.callThrough();
        service.getWhereFirst('queues', { method: 'POST' }).then((val: IQueue) => {
            if (val) {
                expect(val.method).toEqual('POST');
            }
        });
        expect(whereFirstSpy).toHaveBeenCalled();

        const deleteSpy = spyOn(service, 'delete').and.callThrough();
        service.delete('queues', { id: 1 }).then((val) => {
            if (val) {
                expect(val).toEqual(1);
            }
        });
        expect(deleteSpy).toHaveBeenCalled();
    });
});
