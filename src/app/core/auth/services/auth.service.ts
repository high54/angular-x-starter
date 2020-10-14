import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
// Rxjs
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
// Models
import { IUser } from '../../../interfaces/user.interface';
// Services

/**
 * Service d'authentification de déconnexion et d'inscription des utilisateurs.
 * Effectue des requêtes HTTP vers l'API ou le web service.
 * Si l'utilisateur est authentifié, les données sont enregistrées dans une variable
 * tant qu'il est présent sur l'application.
 * @TODO --> EFFECTUER LA DECONNEXION / INSCRIPTION
 * @author Julien Bertacco 2019.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Permet de récup les données d'un utilisateur connecté.
  public currentUser: Observable<IUser>;
  // SSR
  public isBrowser = false;
  /**
   * Quand l'utilisateur effectue une opération de connexion / déconnexion,
   * un événement est dispatché afin propager l'information.
   */
  private currentUserSubject: BehaviorSubject<IUser>;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  // User label that may be displayed.
  private userLabel = new BehaviorSubject('');
  currentUserLabel = this.userLabel.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.isLogged();
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): IUser {
    if (this.isBrowser) {
      return this.currentUserSubject.value;
    }
  }

  /**
   * This method update the user currently logged using the new one passed as parameter.
   * It takes the role and the id of the user passed as parameter in order to impersonate this user.
   * @param updatedUser Updated user to set as logged.
   */
  public setCurrentUserLoggedAs(asUser: IUser): void {
    if (this.isBrowser) {
      const currentUserAsJSON = JSON.parse(localStorage.getItem('currentUser'));
      const currentUser: IUser = currentUserAsJSON as IUser;
      currentUser.role = asUser.role;
      currentUser.id = asUser.id;

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      this.userLabel.next(currentUser.firstName + ' ' + currentUser.lastName);

      this.currentUserSubject.next(currentUser);
    }
  }

  /**
   * Vérification si l'utilisateur peut se connecter avec le token enregistré
   * dans le local storage.
   * L'utilisateur doit avoir coché la case "Rester connecté(e)" alias rememberMe du modèle utilisateur.
   */
  public isLogged(): void {
    if (this.isBrowser) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) as IUser;
      this.currentUserSubject = new BehaviorSubject<IUser>(null);
      if (currentUser) {
        this.currentUserSubject.next(currentUser);
      } else {
        this.logout();
      }
    }
  }

  /**
   * Effectue une requête HTTP POST sur le web service d'authentification
   * avec les identifiants de l'utilisateur afin de le connecter.
   * En cas de réussite, le Json Web Token est enregistré dans le local storage,
   * et un événement est dispatché à l'application pour activer les fonctionnalités
   * lié à un utilisateur.
   * @param username identifiant de connexion de l'utilisateur.
   * @param password mot de passe de connexion de l'utilisateur.
   * @param rememberMe Si l'utilisateur souhaite rester connecté.
   */
  public login(username: string, password: string, rememberMe: boolean): Observable<IUser> {
    // Call auth API:
    const loginPayload = JSON.stringify({ idOrUsernameOrEmail: username, password });
    return this.http.post<any>(`${environment.loginRegisterUri}${environment.loginEp}`, loginPayload, this.httpOptions)
      .pipe(catchError((error: any) => throwError(JSON.stringify(error))), concatMap(authApiResp => {
        const newUser: IUser = {
          id: authApiResp.body.user.userId,
          username: authApiResp.body.user.username,
          email: authApiResp.body.user.email,
          givenName: authApiResp.body.user.givenName,
          role: authApiResp.body.user.groups[0],
          isActivated: authApiResp.body.user.isActivated,
          created: authApiResp.body.user.created,
          lastActive: authApiResp.body.user.lastActive,
          token: authApiResp.body.token
        };
        this.currentUserSubject.next(newUser);
        // Call user app data API:
        return this.http.get<IUser>(`${environment.apiUrlBase}${environment.usersEp}${newUser.id}`)
          .pipe(map((userApiResp) => {
            newUser.firstName = userApiResp.firstName;
            newUser.lastName = userApiResp.lastName;

            if (this.isBrowser && rememberMe) {
              localStorage.setItem('currentUser', JSON.stringify(newUser));
            }
            this.currentUserSubject.next(newUser);
            return newUser;
          }), catchError((error: any) => throwError(JSON.stringify(error))));
      }));
  }

  /**
   * Supprime du local storage le Json Web Token de l'utilisateur.
   * Et dispatche un événément afin d'indiquer que l'utilisateur n'est plus connecté.
   * TODO --> EFFECTUER UNE REQUETE HTTP POUR INDIQUER AU WEB SERVICE DE DECONNECTER L'USER
   */
  public logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }

}
