import { createTestProjector } from 'maquette-query';
import { createHelloWorldPage } from '../src/hello-world-page';
import { Page } from 'material-maquette';
import { expect } from 'chai';

describe('hello-world-page', () => {

  let projector = createTestProjector();
  let input = projector.query('input');
  let output = projector.query('.output');
  let page: Page | undefined;

  beforeEach(() => {
    page = createHelloWorldPage({});
    projector.initialize(page.renderPlaceholders['content']);
  });

  it('outputs "hello you!" when no name has been entered', () => {
    expect(output.textContent).to.equal('Hello you!');
  });

  it('greets the user by the name he has entered in one input event (using drag and drop for example)', () => {
    input.simulate.input({ value: 'Johan' });
    expect(output.textContent).to.equal('Hello Johan!');
  });

  it('outputs the value currently being typed', () => {
    input.simulate.keyPress('J', '', 'J');
    expect(output.textContent).to.equal('Hello J!');
    input.simulate.keyPress('O', 'J', 'Jo');
    expect(output.textContent).to.equal('Hello Jo!');
  });

});
