import { Injectable, ApplicationRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
// App configuration
import * as config from './config';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private updates: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.metaService.addTag({ property: 'og:site_name', content: config.APP_NAME });
  }

  public setTitle(title: string): void {
    this.metaService.removeTag('property="og:title"');
    this.metaService.removeTag('name="twitter:title"');
    this.titleService.setTitle(`${config.APP_NAME} - ${title}`);
    this.metaService.addTag({ property: 'og:title', content: `${config.APP_NAME} - ${title}` });
    this.metaService.addTag({ name: 'twitter:title', content: `${config.APP_NAME} - ${title}` });

  }

  public setDescription(description: string): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="twitter:description"');
    this.metaService.removeTag('property="og:description"');
    this.metaService.addTags([
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { property: 'og:description', content: description },
    ]);
  }

  public addTags(tags: any[]): void {
    this.metaService.addTags(tags);
  }

  public checkForUpdate(): void {
    console.log('bonjour')

    this.updates.available.subscribe(event => {
      console.log(event);
      this.updates.activateUpdate().then(() => document.location.reload());
    });
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());

  }

}
