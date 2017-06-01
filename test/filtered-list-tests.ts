import { createTestProjector } from 'maquette-query';
import { expect } from 'chai';
import { ListItem } from 'material-maquette';
import { createFilteredList } from '../src/filtered-list';
import { createServicesMock, ServicesMock } from './test-utilities';

describe('filtered-list', () => {

  let projector = createTestProjector();
  let filterInputQuery = projector.query('input');
  let listItemsQuery = projector.queryAll('li');
  let servicesMock: ServicesMock;
  let items: ListItem[];

  beforeEach(() => {
    items = [
      { text: 'Theodore Windler', key: 1 },
      { text: 'Theresa Boehm', key: 2 },
      { text: 'Jacey Lueilwitz', key: 3 },
      { text: 'Jeanette Emmerich', key: 4 }
    ];
    servicesMock = createServicesMock();
    let filteredList = createFilteredList(servicesMock, {
      getItems: () => items
    });
    projector.initialize(filteredList.renderMaquette);
  });

  it('shows all items when no filter text is given', () => {
    expect(listItemsQuery).to.have.length(4);
  });

  it('lowercases the entered filter text', () => {
    filterInputQuery.simulate.input({ value: 'E' });
    expect(filterInputQuery.properties.value).to.equal('e');
  });

  it('only shows items that match the filter text', () => {
    filterInputQuery.simulate.input({ value: 'j' });
    expect(listItemsQuery).to.have.length(2);
    expect(listItemsQuery.getResult(0).textContent).to.equal('Jacey Lueilwitz');
    expect(listItemsQuery.getResult(1).textContent).to.equal('Jeanette Emmerich');
  });

});
