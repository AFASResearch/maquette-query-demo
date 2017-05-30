import {h} from "maquette";
import {createToolbar, MaterialMaquetteServicesBase, ListItem, Page} from "material-maquette";
import {createFilteredList} from "./filtered-list";
import * as faker from "faker";

export let createDemoPage = (context: MaterialMaquetteServicesBase) => {

  let lastKey = -1;
  let createRandomItem = (): ListItem => ({
    key: lastKey++,
    startIcon: 'person',
    text: faker.name.firstName() + ' ' + faker.name.lastName()
    //faker.system.commonFileName(faker.system.commonFileExt(), faker.system.commonFileType())
  });

  let items: ListItem[] = [];
  for (let i = 0; i < 3; i++) {
    items.push(createRandomItem());
  }

  setInterval(() => {
    items.push(createRandomItem());
    context.projector.scheduleRender();
  }, 1000);

  let filteredList = createFilteredList(context, {
    getItems: () => items
  });

  let page: Page = {
    renderPlaceholders: {
      title: () => h('div', ['List of attendees']),
      content: () => h('div.main', [
        filteredList.renderMaquette()
      ])
    },
    exit: () => undefined
  };

  return page;
};
