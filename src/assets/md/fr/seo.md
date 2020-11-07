## Search Engine Optimization


Le service d'application `app.service.ts` fournit deux méthodes pour mettre à jour les meta tags de description et de titre :

Modification du titre de la page :

```typescript

  set title(title: string) {
    this.metaService.removeTag('property="og:title"');
    this.metaService.removeTag('name="twitter:title"');
    this.titleService.setTitle(`${environment.appName} - ${title}`);
    this.metaService.addTag({ property: 'og:title', content: `${environment.appName} - ${title}` });
    this.metaService.addTag({ name: 'twitter:title', content: `${environment.appName} - ${title}` });
  }

```


Modification de la description de la page :

```typescript

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

  ```

