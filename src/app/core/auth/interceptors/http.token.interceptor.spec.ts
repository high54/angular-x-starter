import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService, OnlineOfflineService } from '../../database/services';
import { RouterTestingModule } from '@angular/router/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services';
import * as config from '../../config/api';
// Interfaces
import { IUser } from '../../../interfaces/user.interface';

describe('Core - Auth - Interceptor - HttpToken', () => {
    let interceptor: HttpTokenInterceptor;
    let httpMock: HttpTestingController;
    let onlineOfflineService: OnlineOfflineService;
    let authService: AuthService;

    const user: IUser = {
        _id: 'id',
        rememberMe: true,
        username: 'username',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };

    beforeEach(async(() => {
        /**
         * Agit comme un NgModule, on déclare est importe ce qui est utilisé
         * dans le composant/Service/Pipe/etc et dans le test en lui même.
         * Puis le composant/Service/Pipe/etc est compillé.
         */
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
            ],
            providers: [
                HttpTokenInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpTokenInterceptor,
                    multi: true,
                },
                { provide: MatSnackBar, useValue: { open: () => true } },
                { provide: StorageService, useValue: {} },
                OnlineOfflineService,
                AuthService
            ],
        }).compileComponents();
        interceptor = TestBed.get(HttpTokenInterceptor);
        httpMock = TestBed.get(HttpTestingController);
        onlineOfflineService = TestBed.get(OnlineOfflineService);
        authService = TestBed.get(AuthService);

        let store = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            }
        };
        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear')
            .and.callFake(mockLocalStorage.clear);
    }));

    it('Should create the interceptor', () => {
        expect(interceptor).toBeTruthy();
    });

    it('Should intercept request', () => {
        window.dispatchEvent(new Event('online'));
        localStorage.setItem('currentUser', JSON.stringify(user));
        authService.isLogged();
        authService.login('test', 'test', true).subscribe((resp) => {
            expect(resp).toBeTruthy();
        });


        const httpRequest = httpMock.expectOne(`${config.LOGIN_REGISTER_URI}/${config.LOGIN_EP}`);

        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    });


});
