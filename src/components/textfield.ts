import { Component, h } from 'maquette';
import { ApplicationContext } from '../interfaces';
import { textfield } from 'material-components-web';

export interface TextfieldConfig {
  id: string;
  label(): string;
  getValue(): string;
  setValue(newValue: string): void;
}

export let createTextfield = (context: ApplicationContext, config: TextfieldConfig): Component => {
  let {label, id, getValue, setValue} = config;
  let enhancer = context.mdcService.createEnhancer(textfield.MDCTextfield);

  let handleInput = (evt: Event) => {
    let input = evt.target as HTMLInputElement;
    setValue(input.value);
  };

  return {
    renderMaquette: () => {
      return h('div.mdc-textfield', {afterCreate: enhancer.handleCreate, afterUpdate: enhancer.handleUpdate }, [
        h('input.mdc-textfield__input', { id, oninput: handleInput, value: getValue() }),
        h('label.mdc-textfield__label', { for: id }, [label()])
      ]);
    }
  };
};
