import { createDemoPage } from './demo-page';
import { createServicesBase, createRouter } from 'material-maquette';
import { toolbar } from 'material-components-web';
import {createHelloWorldPage} from "./hello-world-page";

let services = createServicesBase(window);
let router = createRouter(services, {
  projector: services.projector,
  document: window.document,
  match: (url: string) => {
    switch (url) {
      case '/hello':
        return createHelloWorldPage(services);
      case '/demo':
        return  createDemoPage(services);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {

  let toolbarComponent = toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
  toolbarComponent.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

  let placholderElements = document.querySelectorAll('[id^="placeholder-"]') as Object as HTMLElement[];
  let placeholders: {[placeholderId: string]: HTMLElement} = {};
  for(let element of placholderElements) {
    placeholders[element.id.substr(12)] = element;
  }
  router.start(placeholders);
});
