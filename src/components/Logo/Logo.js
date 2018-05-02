import React from 'react';
import imgLogo from './../../assets/images/127 burger-logo.png';
import classes from './Logo.css';
const logo = (props) => {
  return (
    <div className={ classes.Logo}>
      <img src={imgLogo } alt="MyBurger" />
    </div>
  )
}

export default logo;