## Getting started

### Assumptions

These docs assume that you are already familiar with Angular, HTML, CSS, JavaScript, and some of the tools from the latest standards, such as classes and modules. The code samples are written using TypeScript. Most Angular code can be written with just the latest JavaScript, using types for dependency injection and using decorators for metadata.


### Architecture

L'application est composé de deux ensemble principaux :

- Core
- Modules


La partie **Core**  correspond à des modules de fonctionnalités qui sont essentiel au bon fonctionnement de l'application. Ils seront chargé au démarrage de l'application.

La partie **Modules** correspond à des fonctionnaltiés qui peuvent être chargé paresseusement en fonction du niveau d'accès ou de l'utilisation.

Chacune des fonctionnalités à sont identité propre. Elle est autonome est indépendante des autres fonctionnalité pour garantire l'évolution de l'application et éviter du code spaghetti.
Cela permet également le transfert d'un module d'une application à l'autre. En some, chaque fonctionnalité est une application dans l'application que l'on raccordre via une route. C'est comparable à des micro services qui sont servit par une gateway.

#### Avantages et inconvéniants

- Une équipe de développeur peut facilement se répartir sur différents modules;
- Les modules peuvent être réutilisé dans d'autres applications;
- En cas de maintenance évolutive ou corrective, l'impact est isolé au module;
- Le chargement de l'application est plus rapide car il contient le minimum pour démarrer;
- La sécurité est "renforcé" en ne chargant que les sources dont l'utilisateur a accès.


- Demande plus de réflexion avant de débuter le développement pour bien déssiner le module


