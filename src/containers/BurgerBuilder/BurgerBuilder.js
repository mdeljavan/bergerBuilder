import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from './../../hoc/Auxx/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from './../../store/actions/index';
import axios from './../../axios-order';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  updatedPurchasable = ( ingredients ) => {
    const sum = Object.keys( ingredients ).map( ingKey => (
      ingredients[ ingKey ]
    ) ).reduce( ( sum, el ) => (
      sum += el
    ), 0 );
    return sum > 0;
  };

  purchasingHandler = () => {
    const purchasing = !this.state.purchasing;
    if ( this.props.isAuthenticated ) {
      this.setState( { purchasing } );
    } else {
      this.props.onAuthRedirect( '/checkout' );
      this.props.history.push( '/signin' );
    }
    
  }
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push( '/checkout' );
  };
  componentDidMount () {
    this.props.initializeIngredient( axios );
  }
  render () {
    const disableInfo = { ...this.props.ingredients };
    for ( let key in disableInfo ) {
      disableInfo[ key ] = disableInfo[ key ] <= 0;
    }
    let burger = <Spinner />;
    let orderSummary = null;
    if ( this.props.ingredients ) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ingredients } />
          <BuildControls
            addedIngredient={ this.props.addIngredientHandler }
            lessIngredient={ this.props.removeIngredientHandler }
            disableInfo={ disableInfo }
            price={ this.props.totalPrice }
            isAuth={this.props.isAuthenticated}
            purchasable={ this.updatedPurchasable( this.props.ingredients ) }
            purchasing={ this.purchasingHandler } />
        </Aux>
      );
      orderSummary = <OrderSummary
        price={ this.props.totalPrice }
        ingredients={ this.props.ingredients }
        purchasing={ this.purchasingHandler }
        purchaseContinue={ this.purchaseContinueHandler } />
    }
    // if ( this.state.loading ) {
    //   orderSummary = <Spinner />;
    // }
    return (
      <Aux>
        <Modal purchasing={ this.purchasingHandler } show={ this.state.purchasing } >
          { orderSummary }
        </Modal>
        { this.props.error ? <p>the ingredients dont loaded...</p> : burger }
      </Aux>
    );
  };
};
const mapStateToProps = ( state ) => {
  return {
    ingredients: state.Bb.ingredients,
    totalPrice: state.Bb.totalPrice,
    error: state.Bb.error,
    isAuthenticated: state.auth.idToken!==null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: ( ingType ) => dispatch( actionCreator.AddIngredientHandler( ingType ) ),
    removeIngredientHandler: ( ingType ) => dispatch( actionCreator.RemoveIngredientHandler( ingType ) ),
    initializeIngredient: ( axios ) => dispatch( actionCreator.initializeIngredient( axios ) ),
    onInitPurchase: () => dispatch( actionCreator.purchaseInit() ),
    onAuthRedirect: (path) => dispatch(actionCreator.authRedirectPath(path))
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );