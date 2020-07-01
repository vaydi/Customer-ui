import itRendersAllMutations from 'jest-it-renders-all-mutations';

import TableDefault from '..';

const mutations = [
  {
    name: 'with all data',
    props: {
      labels: ['1', '2', '3'],
      data: [{ 1: '1' }, { 2: '2' }, { 3: '3' }],
      extraDataFormating: [],
      pending: false,
      noDataMessage: 'Aucune donnée',
      pagination: false,
      rowsPerPage: 10,
    },
  },
  {
    name: 'without data',
    props: {
      labels: [],
      data: [],
    },
  },
];

describe(TableDefault.name, () => {
  itRendersAllMutations(TableDefault, mutations);
});
