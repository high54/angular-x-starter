# Angular X Starter

Le projet a pour but de proposer une structure de projet prête à l'emploi pour le développement d'application web, mobile et de bureau.

La structure est découpée en deux sections : `Core` et `Modules`.

- [Angular X Starter](#angular-x-starter)
  - [Core](#core)
  - [Modules](#modules)
- [Fonctionnalités](#fonctionnalités)
  - [Server Side Rendering](#server-side-rendering)
  - [Progressive Web App - PWA](#progressive-web-app---pwa)
  - [Design Responsive](#design-responsive)
  - [Online/offline synchronisation](#onlineoffline-synchronisation)
- [Documentation technique](#documentation-technique)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)


## Core

La section `Core` s'occupe de tout ce qui est chargé à la première connexion de l'utilisateur. Ainsi on retrouve toute les fonctionnalités néccaissaire au bon fonctionnement de l'application : interface utilisateur, synchronisation des données, authentification, configuration.

## Modules

La section `Modules` correspond à la partie métier de l'application. Toutes les fonctionnalités qui sont disponible dans `Modules` sont de préférence mise en lazy loading afin d'apporter à l'utilisateur uniquement ce qu'il souhaite consulter, sans pour autant surcharger le réseau. 

Cela permet également d'ajouter une couche de sécurité supplémentaire en évitant que du code sensible ne soit transmit à un utilisateur n'ayant pas les droits.

# Fonctionnalités

## Server Side Rendering

Pré compilation des pages pour un chargement plus rapide.
Mise en cache des requêtes pour réduire les appelles au backend/web service.

## Progressive Web App - PWA

Application installable sur Smartphone et PC.
Améliore la rapidité de chargement en installant l'interface utilisateur et les assets sur l'appareil.

## Design Responsive

Une seule application pour PC et Smatphone.

## Online/offline synchronisation

Mise en cache des requêtes en cas de coupure internet.
Synchronisation avec le backend une fois la connexion rétablie.


# Documentation technique

|     Module     |                      Documentation                      |
| :------------: | :-----------------------------------------------------: |
| User Interface | [Consulter la documentation](src/app/core/ui/README.md) |
|                |                                                         |
|                |                                                         |


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
