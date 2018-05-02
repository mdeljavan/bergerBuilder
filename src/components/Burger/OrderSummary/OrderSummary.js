import React from 'react';
import Aux from '../../../hoc/Auxx/Aux';
import Button from './../../UI/Button/Button';
const orderSummary = ( props ) => {
  const ingredients = { ...props.ingredients };
  const OrderSummary = Object.keys( ingredients ).map( ingKey => (
    <li key={ ingKey }>
      <span style={ { textTransform: 'capitalize' } }>
        { ingKey } :
      </span>
      { ingredients[ ingKey ] }
    </li>
  ) )
  return (
    <Aux>
      <h3> Your Order</h3>
      <p>ThankYou for your purchase</p>
      <p>You select these ingredients for berger</p>
      <ul>
        { OrderSummary }
      </ul>
      <p><strong>Total Price: { props.price.toFixed( 2 ) }</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType={ 'Danger' } clicked={ props.purchasing }>Cancel</Button>
      <Button btnType={ 'Success' } clicked={ props.purchaseContinue }>Continue</Button>
    </Aux>


  )
}

export default orderSummary;