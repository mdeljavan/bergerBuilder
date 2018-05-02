import React from 'react';
import classes from './Order.css';
const order = ( props ) => {
  const ingredient = [];
  for ( let igName in props.ingredient ) {
    ingredient.push(
      {
        name:igName,
        amount: props.ingredient[ igName ]
      }
    );
  }
  const ingredientOutput = ingredient.map( ig => (
    <span
      key={ ig.name }
      style={ {
        'border': '1px solid #ccc',
        'margin': '10px 8px',
        'padding': '10px',
        'boxSizing':'border-box'
      } }>{ ig.name } ({ ig.amount })</span>
  ) );
  return (
    <div className={ classes.Order }>
      ingredient:  
      <div style={ {'margin': '20px',display:'flex',justifyContent:'space-around'} }>
        {ingredientOutput}
      </div>
      <p>Price: <strong>{ props.price }</strong></p>
    </div>
  );
}

export default order;