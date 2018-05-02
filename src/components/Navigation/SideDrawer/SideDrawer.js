import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx/Aux';

const sideDrawer = ( props ) => {

  return (
    <Aux>
      <Backdrop show={ props.show } clicked={ props.closeSideDrawer}/>
      <div
        className={ [ classes.SideDrawer, props.show ? classes.Open : classes.Close ].join( ' ' ) }
        onClick={ props.closeSideDrawer}>
        <div className={ classes.Logo }>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={ props.isAuth }/>
        </nav>
      </div>
    </Aux>

  );
};

export default sideDrawer;