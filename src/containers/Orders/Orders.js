import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './../../components/order/Order';
import axios from './../../axios-order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token,this.props.userId);
  }
  render () {
    let orders = <Spinner />;
    if ( !this.props.loading ) {
      orders = this.props.orders.map( order => {
        return <Order
          key={ order.id }
          ingredient={ order.ingredients }
          price={ order.price.toFixed(3) }/>
      } );
    };
    return (
      <div >
        { orders }

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    orders: state.o.orders,
    loading: state.o.loading,
    token: state.auth.idToken,
    userId:state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch( actions.fetchOrders(token,userId) )
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( Orders, axios ));