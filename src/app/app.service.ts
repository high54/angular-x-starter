import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// App configuration
import * as config from './config';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private metaService: Meta,
    private titleService: Title
  ) { }

  public setPageName(title: string): void {
    this.titleService.setTitle(`${config.APP_NAME} - ${title}`);
  }

}
