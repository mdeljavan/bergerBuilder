import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const buildControls = ( props ) => {
  const controls = [
    { Label: 'Salad', type: 'salad' },
    { Label: 'Bacon', type: 'bacon' },
    { Label: 'Cheese', type: 'cheese' },
    { Label: 'Meat', type: 'meat' }
  ];
  return (
    <div className={ classes.BuildControls }>
      <p>Price: <strong>{ props.price.toFixed( 2 ) }</strong></p>
      { controls.map( ctrl => (
        <BuildControl
          key={ ctrl.Label }
          label={ ctrl.Label }
          added={ () => props.addedIngredient( ctrl.type ) }
          removed={ () => props.lessIngredient( ctrl.type ) }
          disableInfo={ props.disableInfo[ ctrl.type ] }
        />
      ) ) }
      <button
        className={ classes.OrderButton }
        disabled={ !props.purchasable }
        onClick={ props.purchasing}>
        { props.isAuth ? 'Order Now' : 'signin To Continue' }</button>
    </div>
  )
}

export default buildControls;