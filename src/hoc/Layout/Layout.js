import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from './../Auxx/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  closeSideDrawer = () => {
    this.setState( {
      showSideDrawer: false
    } );
  };
  showSideDrawer = () => {
    this.setState( prevState => {
      return ({showSideDrawer:!prevState.showSideDrawer});
    })
  }
  render () {
    return (
      <Aux>
        <Toolbar
          showSideDrawer={ this.showSideDrawer }
          isAuth={ this.props.isAuthenticated }/>
        <SideDrawer
          show={ this.state.showSideDrawer }
          closeSideDrawer={ this.closeSideDrawer }
          isAuth={ this.props.isAuthenticated }/>
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </Aux>
    );
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};
export default connect(mapStateToProps)(Layout);