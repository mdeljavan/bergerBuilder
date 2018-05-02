import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from './../../components/UI/input/input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import Aux from './../../hoc/Auxx/Aux';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler.js';
import axios from './../../axios-order';
import { updateObject, checkValidity } from './../../shared/utility';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'EMAIL ADDRESS',
          type: 'email'
        },
        value: '',
        validations: {
          isRequired: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'PASSWORD',
          type: 'password'
        },
        value: '',
        validations: {
          isRequired: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };
  
  changeInputHandler = ( event, elementName ) => {

    const updatedControls = updateObject( this.state.controls, {
      [ elementName ]: updateObject( this.state.controls[ elementName ], {
        valid: checkValidity( event.target.value, this.state.controls[ elementName ].validations ),
        touched: true,
        value: event.target.value
      } )
    } );
    this.setState( { controls: updatedControls } );
  };

  authHandler = ( event ) => {
    event.preventDefault();
    this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
  };
  switchHandler = () => {
    this.setState( prevState => {
      return { isSignup: !prevState.isSignup };
    } )
  };
  render () {
    const form = [];
    for ( let key in this.state.controls ) {
      form.push( {
        id: key,
        element: this.state.controls[ key ]
      } );
    };
    const inputs = form.map( input => {
      return (
        <Input
          key={ input.id }
          value={ input.element.value }
          elementConfig={ input.element.elementConfig }
          inValid={ !input.element.valid }
          touched={ input.element.touched }
          shouldValidation={ input.element.validations }
          changed={ ( event ) => this.changeInputHandler( event, input.id ) }
        />
      );
    } );

    let authData = <Spinner />
    if ( !this.props.loading ) {
      authData = (
        <Aux>
          <form onSubmit={ this.authHandler }>
            { inputs }
            <Button btnType="Success">Submit</Button>
          </form>
          <Button
            clicked={ this.switchHandler }
            btnType="Danger">Switch To { this.state.isSignup ? 'Signin' : 'Signup' }</Button>
        </Aux>
      );
    };
    let errorMessage = null;
    if ( this.props.error ) {
      errorMessage = (
        <p>{ this.props.error.message }</p>
      )
    }

    let isAuthenticated = null;
    if ( this.props.isAuthenticated ) {
      isAuthenticated = <Redirect to={ this.props.redirectPath } />
    }
    return (
      <div className={ classes.Auth }>
        { isAuthenticated }
        { errorMessage }
        { authData }
      </div>
    );
  };
};
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    redirectPath: state.auth.redirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( email, password, isSignup ) => dispatch( actions.authenticate( email, password, isSignup ) )
  };
};
export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Auth, axios ) );