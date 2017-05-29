import { Component, h, VNodeChild } from 'maquette';
import { toolbar } from 'material-components-web';
import { ApplicationContext } from '../interfaces';

export interface ToolbarConfig {
  title(): VNodeChild;
}

export let createToolbar = (context: ApplicationContext, config: ToolbarConfig): Component => {
  let { title } = config;

  let enhancer = context.mdcService.createEnhancer(toolbar.MDCToolbar);

  return {
    renderMaquette: () => {
      return h('div.mdc-toolbar', { afterCreate: enhancer.handleCreate, afterUpdate: enhancer.handleUpdate }, [
        h('div.mdc-toolbar__row', [
          h('section.mdc-toolbar__section.mdc-toolbar__section--align-start', [
            h('span.mdc-toolbar__title', [ title() ])
          ])
        ])
      ]);
    }
  };
};
