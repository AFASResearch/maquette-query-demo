import {Component, h} from "maquette";
import {ApplicationContext} from "../interfaces";
import {createAppearAnimation} from "../animations/appear";

export interface ListItem {
  /**
   * To make sure items do not morph
   */
  key: Object;
  startIcon?: string;
  text: string;
}

export interface ListConfig {
  avatarList?: boolean;
  extraClasses?: string[];
  getItems(): ListItem[];
}

let createSelector = (base: string, configured: {[className: string]: boolean}, extraClasses?: string[]) => {
  let result = base;
  let addClass = (className: string) => {
    result += `.${className}`;
  };
  Object.keys(configured).forEach(className => {
    if (configured[className]) {
      addClass(className);
    }
    if (extraClasses) {
      extraClasses.forEach(addClass);
    }
  });
  return result;
};

export let createList = (context: ApplicationContext, config: ListConfig): Component => {
  let { getItems, avatarList } = config;

  let enterAnimation = createAppearAnimation(context);

  let renderItem = (item: ListItem) => {
    return h('li.mdc-list-item', { key: item.key, enterAnimation }, [
      item.startIcon ? h('span.mdc-list-item__start-detail.gray-bg', [
        h('i.material-icons', {'aria-hidden': 'true'}, [item.startIcon])
      ]) : undefined,
      h('span.mdc-list-item__text', [ item.text ])
    ]);
  };

  let selector = createSelector('ul.mdc-list', {'mdc-list--avatar-list': avatarList}, config.extraClasses);
  return {
    renderMaquette: () => {
      return h(selector, getItems().map(renderItem))
    }
  }
};
