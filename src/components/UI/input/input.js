import React from 'react';
import classes from './input.css';
const input = ( props ) => {
  let inputElement = null;
  const className = [ classes.InputElement ];
  if ( props.inValid && props.shouldValidation && props.touched) {
    className.push( classes.InValid );
  } 
  switch ( props.elementType ) {
    case 'textarea':
      inputElement = <textarea
        className={ className.join( ' ' ) }
        { ...props.elementConfig }
        value={ props.value }
        onChange={ props.changed }
      />
      break;
    case 'select':
      inputElement = (
        <select className={ className.join( ' ' ) }
          value={ props.value }
          onChange={ props.changed }>
          { props.elementConfig.options.map( option => (
            <option
              key={ option.value }
              value={ option.value }
            >
              { option.displayedValue }
            </option>
          ) ) }
        </select> );
      break;
    default:
      inputElement = <input
        className={ className.join( ' ' ) }
        { ...props.elementConfig }
        value={ props.value }
        onChange={ props.changed }
      />;
      break;
  }
  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{ props.label }</label>
      { inputElement }
    </div>

  )
}

export default input;