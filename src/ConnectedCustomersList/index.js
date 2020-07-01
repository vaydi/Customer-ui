
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestCustomerData } from "./Redux/actions";
import Customer from '../CustomersList'

const mapStateToProps = state => ({ listeCustomer: state.listeCustomer });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestCustomerData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
