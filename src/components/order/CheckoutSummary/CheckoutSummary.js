import React from 'react';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary = ( props ) => {
  return (
    <div className={ classes.CheckoutSummary}>
      <h1>We hope tastest burger for you</h1>
      <Burger ingredients={ props.ingredients } />
      <Button
        btnType="Danger"
        clicked={ props.cancelClicked }>CANCELE</Button>
      <Button
        btnType="Success"
        clicked={ props.continueClicked }>CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;