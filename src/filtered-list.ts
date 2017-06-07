import { createTextfield, createList, ListItem, MaterialMaquetteServicesBase } from 'material-maquette';
import { h } from 'maquette';
import { createStaggerAppearAnimation } from './animations/appear';
import { createDisppearAnimation } from './animations/disappear';

export interface FilteredListConfig {
  getItems(): ListItem[];
}

export let createFilteredList = (context: MaterialMaquetteServicesBase, config: FilteredListConfig) => {

  let filterText = ''; // 'private' state

  let matchesFilterText = (item: ListItem) => {
    return !filterText || item.text.toLowerCase().indexOf(filterText) !== -1;
  };

  let filterTextfield = createTextfield(context, {
    setValue: (text: string) => filterText = text.toLowerCase(),
    getValue: () => filterText,
    label: () => 'Filter',
    id: 'filter'
  });

  let list = createList(context, {
    getItems: () => config.getItems().filter(matchesFilterText),
    extraClasses: ['filtered-list'],
    itemEnterAnimation: createStaggerAppearAnimation(context),
    itemExitAnimation: createDisppearAnimation(context)
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
