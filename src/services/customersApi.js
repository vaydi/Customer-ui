/* eslint-disable no-console */
import { CustomersApiUrlBase } from '../constant/url';

const customerApi = {
  async GetListeCustomers(token, currentPage, resultByPage) {

    const getListCustomers = `GetCustomers?currentPage=${currentPage}&resultByPage=${resultByPage}`;
    const url = `http://${CustomersApiUrlBase}${getListCustomers}`;
    const get = {
      headers: {
        token: { token },
      },
      method: 'GET',
    };

      const response = await fetch(url, get)
        .then(res => res.json())
        .then(res => res)
        .catch(error => console.log(error))

      return response;

  },
};

export default customerApi;
