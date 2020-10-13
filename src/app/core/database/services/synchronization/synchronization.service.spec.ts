import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/auth/services';
import { IQueue, QueueStatus } from '../../models/database.model';
import { SynchronizationService } from './synchronization.service';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../../../environments/environment';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('Core - Database - Service - Synchronization', () => {
    let storage: StorageService;
    beforeEach(async(() => {
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
                StorageService
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
    it('should sync ', async () => {
        const { service, httpTestingController } = setup();
        const spy = spyOn(service, 'sync').and.callThrough();
        await service.sync();
        const req = httpTestingController.expectOne(`${environment.apiUrlBase}`);
        req.flush({ status: 200 });
        expect(spy).toHaveBeenCalled();
    });
});
