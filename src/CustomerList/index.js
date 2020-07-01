/* eslint-disable react/destructuring-assignment */
import { func, number, shape } from 'prop-types';
import {Grid } from '@material-ui/core';
import React from 'react';


import { customerHeadCells, customerTabFiltre } from '../constant/customerConfig';
import TabFilter from '../ConnectedFilter';
import TableDefault from '../Table';
import customersListType from '../types/customersListType';


class CustomersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowsPerPage: props.rowsPerPage,
      currentPage: props.currentPage,
      token: 'Test_Token',
      tabName: ["ALL"],
    };
  }

  componentDidMount() {
    const { token, currentPage, rowsPerPage } = this.state;
    const { requestCustomerData } = this.props;
    requestCustomerData(token, currentPage, rowsPerPage);
    this.nameCustomerTabFilter(0);
  }

  nameCustomerTabFilter = event => {
    const name = customerTabFiltre.filter(x => x.id === event).map(i => i.name);
    this.setState({ tabName: name });
  };

  changeCurrentPage = page => {
    const { token, rowsPerPage } = this.state;
    const { requestCustomerData } = this.props;
    requestCustomerData(token, page + 1, rowsPerPage);
  };

  changeRowsPerPage = rowsPerPage => {
    const { token } = this.state;
    const { requestCustomerData } = this.props;
    this.setState({ rowsPerPage });
    requestCustomerData(token, 1, rowsPerPage);
  };

  customersDataFormating = customers => {
    const customer = customers.filter(item => {
        if (this.state.tabName[0] !== 'All')
        return item.type === this.state.tabName[0];

        return item;
      })
      .map(x => ({
        amount: `€ ${x.amount}`,
        customerNum: x.customer_num,
        orderRef: x.order_ref,
        creationDate: x.creation_date,
        paymentOption: x.payment_option.name,
        type: x.type,
        status: x.status,
      }));
    return customer;
  };

  render() {
    const { customers = [], pagination } = this.props.listeCustomer;
    const customersDataFormating = this.customersDataFormating(customers);

    return (
      <Grid item xs={12}>
        <TabFilter
          TabType={customerTabFiltre}
          onClickTab={event => this.nameCustomerTabFilter(event)}
        />
        {
          <TableDefault
            headCells={customerHeadCells}
            data={customersDataFormating}
            // extraDataFormating={customers}
            noDataMessage="Aucune customer trouvée"
            changePage={event => this.changeCurrentPage(event)}
            changeRowsPerPage={event => this.changeRowsPerPage(event)}
            pagination={pagination}
          />
        }
      </Grid>
    );
  }
}

CustomersList.defaultProps = {
  listeCustomer: {
    customers: [],
    pagination: {},
  },
  requestCustomerData: Function.prototype,
  currentPage: 1,
  rowsPerPage: 20,
};

CustomersList.propTypes = {
  listeCustomer: shape(customersListType),
  requestCustomerData: func,
  currentPage: number,
  rowsPerPage: number,
};

export default CustomersList;
