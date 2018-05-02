import * as actionType from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';
const INGREDIENT_PRICE = {
  salad: .5,
  cheese: .7,
  meat: 1.5,
  bacon: .3
}
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const addIngredient = ( state, action ) => {
  const updateIngredients = updateObject( state.ingredients, {
    [ action.ingType ]: state.ingredients[ action.ingType ] + 1
  } );
  const updateState = updateObject( state, {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[ action.ingType ]
  } )
  return updateState;
};
const removeIngredient = ( state, action ) => {
  const updateIngredients = updateObject( state.ingredients, {
    [ action.ingType ]: state.ingredients[ action.ingType ] - 1
  } );
  const updateState = updateObject( state, {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[ action.ingType ]
  } )
  return updateState;
};

const setIngredient = ( state, action ) => {
  const updateState = updateObject( state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false
  } )
  return updateState;
};
const fetchIngredientsFail = ( state, action ) => {
  const updateState = updateObject( state, { error: true } )
  return updateState;
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionType.ADD_INGREDIENT: return addIngredient( state, action );
    case actionType.REMOVE_INGREDIENT: return removeIngredient( state, action );
    case actionType.SET_INGREDIENT: return setIngredient( state, action );
    case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail( state, action );
    default: return state;
  }
};
export default reducer;


