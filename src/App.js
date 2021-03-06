import React, { Component } from 'react';
import { connect } from 'react-redux';
import Templte from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component {
  componentDidMount () {
    this.props.onAutoSingin();
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/signin" component={ Auth } />
        <Route path="/" exact component={ BurgerBuilder } />
        <Redirect to="/" />
      </Switch>
    );
    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders" component={ Orders } />
          <Route path="/signin" component={ Auth } />
          <Route path="/logout" component={ Logout } />
          <Route path="/" exact component={ BurgerBuilder } />
          <Redirect to="/" />
        </Switch>
      )

    }
    return (
      <Templte>
        {routes}
      </Templte>
    );
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSingin: () => dispatch( actions.autoSignin() )
  }
}
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
