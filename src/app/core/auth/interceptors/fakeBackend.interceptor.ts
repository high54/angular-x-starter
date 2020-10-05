import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// Rxjs
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// Interfaces
import { IUser } from '../../../interfaces/user.interface';

/**
 * Utilisé pour simuler un service d'authentification des utilisateurs
 * Les requêtes HTTP qui pointe vers "/auth" sont interceptée :
 * Si la requête présente les identifiants de l'utilisateur alors on les compare avec ceux
 * du tableaux "users".
 * S'il y a une correspondance entre les identifiants envoyé et un des utilisateurs
 * alors on retourne des informations de l'utilisateur sur un status 200.
 * @author Julien Bertacco 2019.
 */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: IUser[] = [
            {
                id: '5cf4ed45baa9354ec03fbf2c', username: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin',
                email: 'admin@mail.com', role: 'admin', createAt: 1555577651
            },
            {
                id: '564851498465', username: 'test', password: 'test', firstName: 'Test', lastName: 'User',
                email: 'user@mail.com', role: 'user', createAt: 1555577651
            },
            {
                id: '98497815644984653', username: 'apr', password: 'apr', firstName: 'Test', lastName: 'User',
                email: 'user@mail.com', role: 'approving', createAt: 1555577651
            }
        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/login') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) {
                    return this.error('Username or password is incorrect');
                }
                return this.ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: `fake-jwt-token`,
                    role: user.role,
                    createAt: user.createAt
                });
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
    // private helper functions
    private ok(body): Observable<HttpResponse<any>> {
        return of(new HttpResponse({ status: 200, body }));
    }
    private unauthorised(): Observable<never> {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }
    private error(message): Observable<never> {
        return throwError({ status: 400, error: { message } });
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
