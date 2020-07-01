import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestCustomerData } from '../ConnectedCustomersList/Redux/actions';
import TabFilter from '../Tab';

const mapStateToProps = state => ({
  listeCustomer: state.listeCustomer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCustomerData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabFilter);
