## Progressive Web App

Cette fonctionnalité permet aux utilisateurs d'installer sur smartphone et ordinateur l'application.
 
Cela a pour avantage de fidéliser l'utilisateur en lui proposant une application parfaitement intégré à son
appareil. Mais également de réduire les temps de chargement.


  ### Avantages
  
- Temps de chargement après installation;
- Expérience utilisateur via l'intégration à l'appareil.

---

 ### Fonctionnalités

- Installation des assets et des contenus statique;
- Mise en cache des requêtes non dynamique;
- Installation des mises à jours automatique;
- Vérification en arrière plan des mises à jour.


---

### Configurer la vérification des mises à jours et leurs installation

``` typescript

  private checkForUpdate(): void {
    if (this.updates.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
      everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
      this.updates.available.subscribe(event => {
        this.updates.activateUpdate().then(() => {
          const dialogRef = this.dialog.open(InstallUpdateComponent, {
            width: '250px',
          });
          dialogRef.afterClosed().subscribe((install) => {
            if (install) {
              document.location.reload();
            }
          });
        });
      });

    }

  }

  ```