import { TestBed,  waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
// Modèles
import { IUser } from 'src/app/interfaces/user.interface';
// Configuration
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Services
import { AuthService } from './auth.service';
import { HttpTokenInterceptor } from '../interceptors';
import { MatSnackBar } from '@angular/material/snack-bar';
// Mocks
import { materialModules } from 'src/app/mocks/material-modules.mock';

describe('Core - Auth - Service - Auth', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    const user: IUser = {
        id: '1',
        username: 'username',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCT4fwpMeJf36POk6yJV_adQssw5c'
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ...materialModules
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
                AuthService,
                { provide: MatSnackBar, useValue: { open: () => true } },
                { provide: Router, useValue: {} }
            ],
        }).compileComponents();

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
        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);

        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear')
            .and.callFake(mockLocalStorage.clear);
    }));
    /**
     * Après chaque test on remet à zero les données
     * du controller de test HTTP.
     */
    afterEach(() => {
        httpTestingController.verify();
    });
    afterAll(() => {
        TestBed.resetTestingModule();
    });
    /**
     * Mise en place de la simulation des requêtes HTTP
     * que le service va effectuer.
     */

    function setup(): AuthService {
        authService = TestBed.inject(AuthService);
        return authService;
    }

    it('should call isLogged', () => {
        const spy = spyOn(authService, 'isLogged');
        authService.isLogged();
        expect(spy).toHaveBeenCalled();
    });

    it('should try isLogged without user', () => {
        const spy = spyOn(authService, 'isLogged').and.callThrough();
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.removeItem('currentUser');
        authService.isLogged();
        expect(spy).toHaveBeenCalled();
    });

    it('should login', () => {
        window.dispatchEvent(new Event('online'));
        localStorage.setItem('currentUser', JSON.stringify(user));
        const auth: AuthService = setup();
        auth.login('test', 'test', true).subscribe((resp) => {
            expect(resp).toBeTruthy();
        });
        const httpAuthRequest = httpTestingController.expectOne(`${environment.loginRegisterUri}${environment.loginEp}`);
        const userAuth = {
            userId: '1',
            username: 'username',
            email: 'test@test.com',
            givenName: 'givenName',
            isActivated: true,
            created: new Date(),
            lastActive: new Date(),
            token: 'token',
            groups: [
                'role'
            ]
        };
        const authApiResp = {
            user: userAuth
        };
        httpAuthRequest.flush(authApiResp);
        expect(httpAuthRequest.request.headers.has('Authorization')).toEqual(true);
        const httpUserRequest = httpTestingController.expectOne(`${environment.apiUrlBase}${environment.usersEp}${userAuth.userId}`);
        httpUserRequest.flush({ firstName: 'firstName', lastName: 'lastName' });
    });

    it('Should login can catch and throw error - Login()', () => {
        spyOn(authService, 'login').and.callThrough();
        const erMsg = 'Testing Error';
        authService.login('test', 'test', true).subscribe((data) => fail('should have failed with the 500 error'), (err: any) => {
            expect(authService.login).toHaveBeenCalled();
            const errorObject = JSON.parse(err);
            expect(errorObject.status).toEqual(500, 'status');
            expect(errorObject.error).toEqual(erMsg, 'message');
        });

        const req = httpTestingController.expectOne(`${environment.loginRegisterUri}${environment.loginEp}`);
        req.flush(erMsg, { status: 500, statusText: erMsg });
    });

    it('get currentUserValue return a user object', () => {
        authService.isBrowser = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        authService.isLogged();
        expect(authService.currentUserValue).toEqual(user);
    });

    it('should be able to setCurrentUserLoggedAs', () => {
        const currentUser = { firstName: 'firstName', lastName: 'lastName', role: 'role', id: '1' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        authService.setCurrentUserLoggedAs({ firstName: 'firstName', lastName: 'lastName', role: 'new_role', id: '1' });
        const newUser = JSON.parse(localStorage.getItem('currentUser'));
        expect(newUser.role).toBe('new_role');
    });
    it('get currentUserValue return a user object with platform server', () => {
        authService.isBrowser = false;
        localStorage.setItem('currentUser', JSON.stringify(user));
        authService.isLogged();
        expect(authService.currentUserValue).toEqual(undefined);
    });

    it('should call isLogged with platform server', () => {
        authService.isBrowser = false;
        const spy = spyOn(authService, 'isLogged');
        authService.isLogged();
        expect(spy).toHaveBeenCalled();
    });


    it('should be able to setCurrentUserLoggedAs', () => {
        authService.isBrowser = false;
        const currentUser = { firstName: 'firstName', lastName: 'lastName', role: 'role', id: '1' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        authService.setCurrentUserLoggedAs({ firstName: 'firstName', lastName: 'lastName', role: 'new_role', id: '1' });
        const newUser = JSON.parse(localStorage.getItem('currentUser'));
        expect(newUser.role).toBe('role');
    });

});
