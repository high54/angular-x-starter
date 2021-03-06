## Démarrer

### Assumptions

Cette documentation considère que vous êtes déjà famillier avec Angular, HTML, CSS, JavaScript, et les derniers standars, comme les classes et modules. Les exemples de code sont écrit en TypeScript. La plus grande partie du code peut être écrit avec la dernière version de JavaScript, avec les types pour l'injection de dépendance et les décorateurs pour les métadonnées. 

### Architecture

L'application est composé de deux ensembles principaux :

- Core
- Modules


La partie **Core**  correspond à des fonctionnalités qui sont essentiel au bon fonctionnement de l'application. Ils seront chargé au démarrage de l'application.

La partie **Modules** correspond à des fonctionnaltiés qui peuvent être chargé paresseusement en fonction du niveau d'accès ou de l'utilisation. VOus pouvez consulter la section dédiée au chargement paresseux pour en savoir plus à ce sujet.

Chacune des fonctionnalités à sont identité propre. Elle est autonome est indépendante des autres fonctionnalité pour garantire l'évolution de l'application et éviter du code spaghetti.
Cela permet également le transfert d'un module d'une application à l'autre. En some, chaque fonctionnalité est une application dans l'application que l'on raccordre via une route. C'est comparable à des micro services qui sont servit par une gateway.

#### Avantages et inconvéniants

- Une équipe de développeur peut facilement se répartir sur différents modules;
- Les modules peuvent être réutilisé dans d'autres applications;
- En cas de maintenance évolutive ou corrective, l'impact est isolé au module;
- Le chargement de l'application est plus rapide car il contient le minimum pour démarrer;
- La sécurité est "renforcé" en ne chargant que les sources dont l'utilisateur a accès.


- Demande plus de réflexion avant de débuter le développement pour bien déssiner le module


