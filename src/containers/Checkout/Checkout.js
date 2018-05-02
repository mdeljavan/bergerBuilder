import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from './../../components/order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  continueHandler = () => {
    this.props.history.push( '/checkout/contact-data' );
  };
  cancelHandler = () => {
    this.props.history.push( '/' );
  };
  render () {
    let checkoutSummary = <Redirect to="/"/>;
    if ( this.props.ingredients ) {
      
      checkoutSummary = (
        <div>
          {this.props.purchased? <Redirect to="/"/>: null}
          <CheckoutSummary
            ingredients={ this.props.ingredients }
            continueClicked={ this.continueHandler }
            cancelClicked={ this.cancelHandler } />
          <Route component={ ContactData } path={ this.props.match.url + '/contact-data' } />
        </div>
      )
    }
    return checkoutSummary;
  };
};
const mapStateToProps = state => {
  return {
    ingredients: state.Bb.ingredients,
    purchased:state.o.purchased
  }
}

export default connect( mapStateToProps )( Checkout );