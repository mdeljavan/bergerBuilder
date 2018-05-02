import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/input/input';
import * as actionCreator from './../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../../axios-order';
import { updateObject, checkValidity } from '../../../shared/utility';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Name',
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Email',
          type: 'email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Streer',
          type: 'text'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      ZIPCode: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'ZIP Code',
          type: 'text'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deleveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [ {
            value: 'fastest',
            displayedValue: 'Fastest'
          },
          {
            value: 'cheapest',
            displayedValue: 'Cheapest'
          } ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    }
  };
  
  orderHandler = ( event ) => {
    event.preventDefault();
    let orderData = {};
    for ( let key in this.state.orderForm ) {
      orderData[ key ] = this.state.orderForm[ key ].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData,
      userId: this.props.userId
    };
    this.props.onPurchaseForm( order, this.props.token );
  }
  changeHandler = ( event, inputIdentifire ) => {
    const updatedOrderForm = updateObject( this.state.orderForm, {
      [ inputIdentifire ]: updateObject( this.state.orderForm[ inputIdentifire ], {
        value: event.target.value,
        touched: true,
        valid: checkValidity( event.target.value, this.state.orderForm[ inputIdentifire ].validation )
      } )
    } )
    this.setState( {
      orderForm: updatedOrderForm
    } )
  }
  render () {
    const inputs = [];
    const orderForm = this.state.orderForm;
    let formIsValid = true;
    for ( let inpName in orderForm ) {
      inputs.push( {
        id: inpName,
        config: orderForm[ inpName ]
      } );
      if ( !orderForm[ inpName ].valid ) {
        formIsValid = false;
      }
    }
    let form = (
      <form onSubmit={ this.orderHandler }>
        { inputs.map( inp => (
          <Input
            key={ inp.id }
            elementType={ inp.config.elementType }
            elementConfig={ inp.config.elementConfig }
            value={ inp.config.value }
            label={ inp.id }
            inValid={ !inp.config.valid }
            shouldValidation={ inp.config.validation }
            touched={ inp.config.touched }
            changed={ ( event ) => this.changeHandler( event, inp.id ) }
          />
        ) ) }
        <Button
          type='submite'
          btnType="Success"
          disabled={ !formIsValid }
        >
          ORDER</Button>
      </form>
    );
    if ( this.props.loading ) {
      form = <Spinner />
    }
    return (
      <div className={ classes.ContactData }>
        <h4>Please insert your data</h4>
        { form }
      </div>
    );
  };
};
const mapStateToProps = state => {
  return {
    ingredients: state.Bb.ingredients,
    price: state.Bb.totalPrice,
    error: state.o.error,
    orderData: state.o.orderData,
    loading: state.o.loading,
    userId: state.auth.userId,
    token: state.auth.idToken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPurchaseForm: ( orderData, token ) => dispatch( actionCreator.purchaseBurger( orderData, token ) )
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) );