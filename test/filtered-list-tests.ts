import { createTestProjector } from 'maquette-query';
import { expect } from 'chai';
import { ListItem } from 'material-maquette';
import { createFilteredList } from '../src/filtered-list';
import { createServicesMock, ServicesMock } from './test-utilities';

describe('filtered-list', () => {

  let projector = createTestProjector();
  let filterInput = projector.query('input');
  let listItems = projector.queryAll('li');
  let servicesMock: ServicesMock;
  let items: ListItem[];

  beforeEach(() => {
    items = [
      { text: 'JQuery', key: 1 },
      { text: 'Angular', key: 2 },
      { text: 'React', key: 3 },
      { text: 'Maquette', key: 4 },
    ];
    servicesMock = createServicesMock();
    let filteredList = createFilteredList(servicesMock, {
      getItems: () => items
    });
    projector.initialize(filteredList.renderMaquette);
  });

  it('Shows all items when no filter text is given', () => {
    expect(listItems).to.have.length(4);
  });

  it('Lowercases the entered filter text', () => {
    filterInput.simulate.input({ value: 'E' });
    expect(filterInput.properties.value).to.equal('e');
  });

  it('Only shows only items that match the filter text', () => {
    filterInput.simulate.input({ value: 'q' });
    expect(listItems).to.have.length(2);
    expect(listItems.getResult(0).textContent).to.equal('JQuery');
    expect(listItems.getResult(1).textContent).to.equal('Maquette');
  });

});
