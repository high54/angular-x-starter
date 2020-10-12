import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnlineOfflineService } from './online-offline.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/auth/services';
import { of } from 'rxjs';
// Mocks
import { materialModules } from '../../../../mocks/material-modules.mock';
describe('Core - Database - Service - Online Offline', () => {
    let service: OnlineOfflineService;
    beforeEach(async(() => {
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
                OnlineOfflineService,
                { provide: MatSnackBar, useValue: { open: () => true } },
                { provide: AuthService, useValue: {} },
            ],
        }).compileComponents();
        service = TestBed.inject(OnlineOfflineService);
    }));

    it('Should return true isOnline', () => {
        const spy = spyOnProperty(service, 'isOnline').and.callThrough();
        expect(spy).toBeTruthy();
    });

    it('Should return false when the navigator goes offline', () => {
        const spy = spyOnProperty(service, 'isOnline').and.callThrough();
        window.dispatchEvent(new Event('offline'));
        if (service.isOnline) {
            expect(service.isOnline).toBeTruthy();
        } else {
            expect(service.isOnline).toBeFalsy();
        }
        expect(spy).toHaveBeenCalled();
    });
    it('should triggeer the connectionChanged when connection goes offline', () => {
        const spy = spyOnProperty(service, 'connectionChanged').and.callThrough();
        window.dispatchEvent(new Event('offline'));
        service.connectionChanged.subscribe();
        expect(spy).toHaveBeenCalled();
    });

});
