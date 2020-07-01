import itRendersAllMutations from 'jest-it-renders-all-mutations';

import CustomerList from '..';

const mutations = [
  {
    name: 'with data',
    props: {
      listeCustomer: {
        customers: [
          {
            amout: 10,
            creation_date: '2019-11-07T10:47:35.526Z',
            order_ref: 'CP004822587',
            payment_option: {
              id: 154,
              name: 'Carte bancaire 3D 4X (Eureka)',
            },
            status: 'Undetermined',
            customer_num: 1,
            type: 'Autorisation',
          }
        ],
        pagination: { current_page: 1, nb_result: 100, result_by_page: 3, total_page: 33 },
      },
      requestCustomerData: jest.fn(),
      match: { params: {}, isExact: true, path: '', url: '' },
      location: {pathname: "/", search: "", hash: "", state: undefined}
    },
  },
  {
    name: 'without data',
    props: {
      listeCustomer: { customers: [], pagination: {} },
      requestCustomerData: jest.fn(),
    },
  },
];

describe(CustomerList.name, () => {
  itRendersAllMutations(CustomerList, mutations);
});
