## Server Side Rendering

### Bloquer certaines fonctionnalités côté client

``` typescript
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-example',
  templateUrl: './example-component.html'
})
export class ExampleComponent {
    public isBroswer = false;

    constructor(
    @Inject(PLATFORM_ID) private platformId
    ) {
        this.isBroswer = isPlatformBrowser(this.platformId);
    }

}

```