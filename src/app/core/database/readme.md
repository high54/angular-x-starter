# Database module


Le module  database permet la prise en charge de la perte de connexion de l'application en stockant les requêtes effecuté.
Une fois la connexion rétablie, les requêtes sont renvoyé au web service/api/backend dans l'ordre ou elles ont était émise.

- [Database module](#database-module)
  - [IndexedDB](#indexeddb)
  - [LocalStorage](#localstorage)

## IndexedDB

Système NoSQL permettant de gérer une application totalement hors ligne.
Permet de stocker des données à hauteur de 50% de l'espace disque libre sur le poste utilisateur.

Support sur les différents navigateur :
https://caniuse.com/#search=indexeddb

Le modèle de base qu'IndexedDB utilise est le suivant :

- Ouvrir une base de données.
- Créer un objet de stockage dans la base de données. 
- Démarrer une transaction, et faire des requêtes pour faire quelques opérations sur des bases de données, comme ajouter, ou récupérer des données.
- Attendre que l'exécution soit terminée, en écoutant le bon type d'événement DOM.
- Faire quelque chose avec les résultats (qui peuvent être trouvés dans l'objet de la requête).

## LocalStorage

La propriété localStorage vous permet d'accéder à un objet local Storage. Le localStorage est similaire au sessionStorage. La seule différence : les données stockées dans le localStorage n'ont pas de délai d'expiration, alors que les données stockées dans le sessionStorage sont nettoyées quand la session navigateur prend fin — donc quand on ferme le navigateur.

