import * as actionTypes from "./actionTypes";

export const AddIngredientHandler = ( ingType ) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingType
  }
};
export const RemoveIngredientHandler = ( ingType ) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingType
  }
};
const setIngredients = ( ingredients ) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  }
};
const fetchIngredientsFailed = (  ) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
};
export const initializeIngredient = ( axios ) => {
  return dispatch => {
    axios.get( '/ingredients.json' )
      .then( ingredients => {
         dispatch( setIngredients( ingredients.data ) )
      } )
      .catch( err => {
        dispatch(fetchIngredientsFailed)
      } )
  }
};