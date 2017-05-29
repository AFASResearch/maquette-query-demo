import {h} from "maquette";
import {createToolbar} from "./components/toolbar";
import {ApplicationContext} from "./interfaces";
import {createFilteredList} from "./filtered-list";
import * as faker from "faker";
import {ListItem} from "./components/list";

export let createDemoPage = (context: ApplicationContext) => {

  let lastKey = -1;
  let createRandomItem = (): ListItem => ({
    key: lastKey++,
    startIcon: 'person',
    text: faker.name.firstName() + ' ' + faker.name.lastName()
    //faker.system.commonFileName(faker.system.commonFileExt(), faker.system.commonFileType())
  });

  let items = [];
  for (let i = 0; i < 3; i++) {
    items.push(createRandomItem());
  }

  setTimeout(() => {
    items.push(createRandomItem());
    context.projector.scheduleRender();
  }, 1000);

  let toolbar = createToolbar(context, {
    title: () => 'Demo'
  });

  let filteredList = createFilteredList(context, {
    getItems: () => items
  });

  let handleAfterCreate = () => setTimeout(context.mdcService.afterAppUpdate);
  let page = {
    renderMaquette: () => {
      return h('div', {
        afterCreate: handleAfterCreate,
        afterUpdate: context.mdcService.afterAppUpdate
      },  [
        toolbar.renderMaquette(),
        h('div.main', [
          filteredList.renderMaquette()
        ])
      ]);
    },
    exit: () => undefined
  };

  return page;
};
