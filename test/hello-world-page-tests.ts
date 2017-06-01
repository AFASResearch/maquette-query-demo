import { createTestProjector } from 'maquette-query';
import { createHelloWorldPage } from '../src/hello-world-page';
import { Page } from 'material-maquette';
import { expect } from 'chai';

describe('hello-world-page', () => {

  let projector = createTestProjector();
  let inputQuery = projector.query('input');
  let outputQuery = projector.query('.output');
  let page: Page | undefined;

  beforeEach(() => {
    page = createHelloWorldPage({});
    projector.initialize(page.renderPlaceholders['content']);
  });

  it('outputs "hello you!" when no name has been entered', () => {
    expect(outputQuery.textContent).to.equal('Hello you!');
  });

  it('greets the user by the name he has entered in one input event (using drag and drop for example)', () => {
    inputQuery.simulate.input({ value: 'AmsterdamJS' });
    expect(outputQuery.textContent).to.equal('Hello AmsterdamJS!');
  });

  it('outputs the value currently being typed', () => {
    inputQuery.simulate.keyPress('J', '', 'J');
    expect(outputQuery.textContent).to.equal('Hello J!');
    inputQuery.simulate.keyPress('O', 'J', 'Jo');
    expect(outputQuery.textContent).to.equal('Hello Jo!');
  });

});
