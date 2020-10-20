import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private metaService: Meta,
    private titleService: Title
  ) {
    this.metaService.addTag({ property: 'og:site_name', content: environment.appName });
  }

  set title(title: string) {
    this.metaService.removeTag('property="og:title"');
    this.metaService.removeTag('name="twitter:title"');
    this.titleService.setTitle(`${environment.appName} - ${title}`);
    this.metaService.addTag({ property: 'og:title', content: `${environment.appName} - ${title}` });
    this.metaService.addTag({ name: 'twitter:title', content: `${environment.appName} - ${title}` });
  }

  set description(description: string) {
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

}
