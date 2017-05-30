import { Page } from 'material-maquette';
import {h} from "maquette";

export let createHelloWorldPage = (dependencies: {}): Page => {

 let yourName = ''; // Piece of data

  // Plain event handler
  let handleNameInput = (evt: Event) => {
    yourName = (evt.target as HTMLInputElement).value;
  };

  // This function uses the 'hyperscript' notation to create the virtual DOM.
  let renderMaquette = () => {
    return h('div', [
      h('input', {
        type: 'text', placeholder: 'What is your name?',
        value: yourName, oninput: handleNameInput
      }),
      h('p.output', ['Hello ' + (yourName || 'you') + '!'])
    ]);
  };

  return {
    exit: () => undefined,
    renderPlaceholders: {
      title: () => h('div', ['Hello world']),
      content: renderMaquette
    }
  };
};