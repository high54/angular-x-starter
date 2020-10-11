# Angular X Starter

Le projet a pour but de proposer une structure de projet prête à l'emploi pour le développement d'application web, mobile et de bureau.

La structure est découpée en deux sections : `Core` et `Modules`.

- [Angular X Starter](#angular-x-starter)
  - [Core](#core)
  - [Modules](#modules)
- [Fonctionnalités](#fonctionnalités)
  - [Server Side Rendering - SSR](#server-side-rendering---ssr)
  - [Progressive Web App - PWA](#progressive-web-app---pwa)
  - [Design Responsive](#design-responsive)
  - [Base de données NoSQL](#base-de-données-nosql)
  - [Online/Offline synchronisation](#onlineoffline-synchronisation)
  - [Internationalisation - I18N](#internationalisation---i18n)
  - [Accessibilité - A11Y](#accessibilité---a11y)
  - [Search Engine Optimisation - SEO](#search-engine-optimisation---seo)
  - [Continuous Integration / Continuous Delivery - CI/CD](#continuous-integration--continuous-delivery---cicd)
  - [SonarQube - Code Quality](#sonarqube---code-quality)
  - [Dark and Light Mode - UX](#dark-and-light-mode---ux)
- [Documentation technique](#documentation-technique)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)


## Core

La section `Core` s'occupe de tout ce qui est chargé à la première connexion de l'utilisateur. Ainsi on retrouve toutes les fonctionnalités néccessaire au bon fonctionnement de l'application : interface utilisateur, synchronisation des données, authentification, configuration.

## Modules

La section `Modules` correspond à la partie métier de l'application. Toutes les fonctionnalités qui sont disponible dans `Modules` sont de préférence mise en lazy loading afin d'apporter à l'utilisateur uniquement ce qu'il souhaite consulter, sans pour autant surcharger le réseau. 

Cela permet également d'ajouter une couche de sécurité supplémentaire en évitant que du code sensible ne soit transmit à un utilisateur n'ayant pas les droits.

# Fonctionnalités

## Server Side Rendering - SSR

Rendu côté serveur des pages pour un chargement plus rapide.
Mise en cache des requêtes pour réduire les appelles au backend/web service.


## Progressive Web App - PWA

Application installable sur Smartphone et PC.
Améliore la rapidité de chargement en installant l'interface utilisateur et les assets sur l'appareil.


## Design Responsive

Une seule application pour PC et Smatphone.


## Base de données NoSQL

Base de données NoSQL avec IndexedDB.


## Online/Offline synchronisation

Enregistrement en base de données local des requêtes effectué lorsque l'application est hors ligne.
Synchronisation avec le backend une fois la connexion rétablie.


## Internationalisation - I18N

Internationalisation des textes statique de l'application via @angular/localize en anglais US et en français FR.

L'ensemble de texte statique sont extrait dans des fichiers déstiné aux logiciels professionnel de traduction.
Cela comporte le texte à traduire et le contexte.


## Accessibilité - A11Y

Permettre aux personnes en situation de handicap de consulter en toute simplicité l'application.


## Search Engine Optimisation - SEO

Intégration des informations pour le SEO via divers méchanisme.


## Continuous Integration / Continuous Delivery - CI/CD

Intégration continue avec l'ensemble des tests présent sur les élements du starter.
Déploiement continue avec les fichiers de configuration pour Docker.


## SonarQube - Code Quality

SonarQube prêt configuré.


## Dark and Light Mode - UX

Le changement de théme est déjà inclus, il n'y a plus cas configurer vos couleurs.


# Documentation technique
Démarrer l'application :

- `npm i`

- `ng serve:ssr`



|                      Module                       |                       Documentation                       |
| :-----------------------------------------------: | :-------------------------------------------------------: |
|                  Authentication                   | [Consulter la documentation](src/app/core/auth/README.md) |
| Base de données et synchronisation offline/online |  [Consulter la documentation](src/app/core/database/README.md)   |
|            Internationalisation - I18N            |  [Consulter la documentation](/INTERNATIONALIZATION.md)   |



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
