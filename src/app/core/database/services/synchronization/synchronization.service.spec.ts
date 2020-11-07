import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { SynchronizationService } from './synchronization.service';
import { StorageService } from '../storage/storage.service';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';

export class StorageServiceMock {
    public getWhereAll(): Promise<any> {
        return new Promise((resolve) => {
            resolve([
                { method: 'POST', uri: environment.apiUrlBase, payload: {} }
            ]);
        });
    }
    public delete(): Promise<any> {
        return new Promise((resolve) => resolve());
    }
}
describe('Core - Database - Service - Synchronization', () => {
    let storage: StorageService;
    beforeEach(waitForAsync(() => {
        /**
         * Agit comme un NgModule, on déclare est importe ce qui est utilisé
         * dans le composant/Service/Pipe/etc et dans le test en lui même.
         * Puis le composant/Service/Pipe/etc est compillé.
         */
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ...materialModules
            ],
            declarations: [
            ],
            providers: [
                SynchronizationService,
                { provide: MatSnackBar, useValue: { open: () => true, dismiss: () => true } },
                { provide: StorageService, useClass: StorageServiceMock }
            ],
        }).compileComponents();
        storage = TestBed.inject(StorageService);

    }));
    afterEach(() => {
        const { httpTestingController } = setup();
        httpTestingController.verify();
    });
    function setup(): {
        service: SynchronizationService;
        httpTestingController: HttpTestingController;
    } {
        const service = TestBed.inject(SynchronizationService);
        const httpTestingController = TestBed.inject(HttpTestingController);
        return { service, httpTestingController };
    }
    it('Should create the service', () => {
        const { service } = setup();
        expect(service).toBeTruthy();
    });
    it('should sync without error', async () => {
        const { service, httpTestingController } = setup();
        const spy = spyOn(service, 'sync').and.callThrough();
        await service.sync();
        const req = httpTestingController.expectOne(`${environment.apiUrlBase}`);
        req.flush({ status: 200 });
        expect(spy).toHaveBeenCalled();
    });
});
