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
        service = TestBed.inject(SynchronizationService);
        httpMock = TestBed.inject(HttpTestingController);
        storage = TestBed.inject(StorageService);

    }));
    afterEach(() => {
        httpMock.verify();
    });
    it('Should create the service', () => {
        expect(service).toBeTruthy();
    });

});
