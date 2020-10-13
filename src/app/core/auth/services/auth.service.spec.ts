import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Data, ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
// Modèles
import { IUser } from 'src/app/interfaces/user.interface';

// Rxjs
import { Subscription, Observable, of, throwError } from 'rxjs';
// Configuration
import { HttpErrorResponse, HttpResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
// Services
import { AuthService } from './auth.service';
import { HttpTokenInterceptor } from '../interceptors';
import { MatSnackBar } from '@angular/material/snack-bar';
// Mocks
import { materialModules } from 'src/app/mocks/material-modules.mock';
/**
 * Test unitaire Module Users Service Users
 * @author Julien Bertacco 2019.
 */
describe('Core - Auth - Service - Auth', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    const user: IUser = {
        id: '1',
        username: 'username',
        // tslint:disable-next-line: max-line-length
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };

    /**
     * Remet à zero l'état du composant/Service/Pipe/etc et des dépendances avant chaque test
     * afin de ne pas polluer les tests par les valeurs émissent lors de précédent tests.
     */
    beforeEach(async(() => {
        /**
         * Agit comme un NgModule, on déclare est importe ce qui est utilisé
         * dans le composant/Service/Pipe/etc et dans le test en lui même.
         * Puis le composant/Service/Pipe/etc est compillé.
         */
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

    /**
     * Test la méthode createUser() qui ajoute une utilisateur.
     * Est-ce que le service effectue bien une requête HTTP de type
     * POST sur l'URL de l'API ?
     * Et est-ce que l'objet envoyé est bien retourné ?
     */
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
    it('should call logout', () => {
        const spy = spyOn(authService, 'logout');
        authService.logout();
        expect(spy).toHaveBeenCalled();
    });
    it('should login', () => {
        window.dispatchEvent(new Event('online'));
        localStorage.setItem('currentUser', JSON.stringify(user));
        const auth: AuthService = setup();
        auth.login('test', 'test', true).subscribe((resp) => {
            expect(resp).toBeTruthy();
        });
        const httpRequest = httpTestingController.expectOne(`${environment.loginRegisterUri}${environment.loginEp}`);
        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
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

        localStorage.setItem('currentUser', JSON.stringify(user));
        authService.isLogged();
        expect(authService.currentUserValue).toEqual(user);
    });
});
