import {createTextfield, createList, ListItem, MaterialMaquetteServicesBase} from "material-maquette";
import {h} from "maquette";
import {createAppearAnimation} from "./animations/appear";

export interface FilteredListConfig {
  getItems(): ListItem[];
}

export let createFilteredList = (context: MaterialMaquetteServicesBase, config: FilteredListConfig) => {

  let filterText = '';

  let filterTextfield = createTextfield(context, {
    setValue: (text: string) => filterText = text.toLocaleLowerCase(),
    getValue: () => filterText,
    label: () => 'Filter',
    id: 'filter'
  });

  let matchesFilterText = (item: ListItem) => {
    return !filterText || item.text.toLowerCase().indexOf(filterText) !== -1;
  };

  let list = createList(context, {
    getItems: () => config.getItems().filter(matchesFilterText),
    extraClasses: ['bordered-list'],
    itemEnterAnimation: createAppearAnimation(context)
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
