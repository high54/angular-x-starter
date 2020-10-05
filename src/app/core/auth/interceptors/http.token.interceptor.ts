import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// Rxjs
import { Observable } from 'rxjs';
// Services
import { AuthService } from '../services/auth.service';
// Gestion des données en mode hors ligne
import { OnlineOfflineService, StorageService } from '../../database/services';
import { QueueStatus } from '../../database/models/database.model';
/**
 * Intercepte les requêtes HTTP afin de placer le Json Web Token (JWT) ou le Bearer, etc.. dans le header de la requête.
 * Uniquement si l'utilisateur est connecté.
 * @author Julien Bertacco 2019.
 */
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private onlineOfflineService: OnlineOfflineService,
        private storageService: StorageService
    ) { }

    public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * Step 1 :
         * Tester si le navigateur est connecté
         * Step 2 :
         * Vérifier si l'utilisateur dispose d'un token
         * Step 3.1 :
         * Si connexion internet: POST les données
         * Step 3.2 :
         * Si pas de connexion ou serveur hors ligne : Stock les données dans le BDD local pour les envoyer après
         */
        if (this.onlineOfflineService.isOnline) {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: ''
            };
            const currentUser = this.authService.currentUserValue;
            if (currentUser && currentUser.token) {
                headers.Authorization = `Bearer ${currentUser.token}`;
            }
            const request = httpRequest.clone({ setHeaders: headers });
            return next.handle(request);
        } else {
            // Stockage dans la base de données
            this.storageService.add('queues', {
                uri: httpRequest.url,
                payload: JSON.stringify(httpRequest.body),
                status: QueueStatus.WAITING,
                method: httpRequest.method,
                params: httpRequest.params
            });
        }

    }
}
