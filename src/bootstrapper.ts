import { createDemoPage } from './demo-page';
import { createServicesBase, createRouter } from 'material-maquette';
import { toolbar } from 'material-components-web';
import { createHelloWorldPage } from './hello-world-page';

let services = createServicesBase(window);
let router = createRouter(services, {
  projector: services.projector,
  document: window.document,
  match: (url: string) => {
    switch (url) {
      case '/hello':
        return createHelloWorldPage(services);
      case '/demo':
        return createDemoPage(services);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // let toolbarComponent = toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
  // toolbarComponent.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

  router.start({
    titleElement: document.querySelector('#placeholder-title')!,
    contentElement: document.querySelector('#placeholder-content')!
  });
});
