import {ApplicationContext} from "./interfaces";
import {createTextfield} from "./components/textfield";
import {createList, ListItem} from "./components/list";
import {h} from "maquette";

export interface FilteredListConfig {
  getItems(): ListItem[];
}

export let createFilteredList = (context: ApplicationContext, config: FilteredListConfig) => {

  let filterText = '';

  let filterTextfield = createTextfield(context, {
    setValue: (text) => filterText = text.toLocaleLowerCase(),
    getValue: () => filterText,
    label: () => 'Filter',
    id: 'filter'
  });

  let matchesFilterText = (item: ListItem) => {
    return !filterText || item.text.toLowerCase().indexOf(filterText) !== -1;
  };

  let list = createList(context, {
    getItems: () => config.getItems().filter(matchesFilterText),
    extraClasses: ['bordered-list']
  });

  return {
    renderMaquette: () => {
      return h('div.FilteredList', [
        h('div.mdc-form-field', [
          filterTextfield.renderMaquette()
        ]),
        list.renderMaquette()
      ]);
    }
  };
};