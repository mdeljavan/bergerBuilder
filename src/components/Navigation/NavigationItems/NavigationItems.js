import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
  return (
    <ul className={ classes.NavigationItems } >
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      { props.isAuthenticated
        ? <NavigationItem link="/orders" exact>orders</NavigationItem>
        : null }
      { props.isAuthenticated
        ? <NavigationItem link="/Logout" exact>Logout</NavigationItem>
        : <NavigationItem link="/signin" exact>Authenticate</NavigationItem>
      }
    </ul>
  )

};
export default navigationItems;