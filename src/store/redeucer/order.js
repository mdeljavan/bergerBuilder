import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';
const initState = {
  error: false,
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseInit = ( state, action ) => {
  const updateState = updateObject( state, {
    purchased: false
  } );
  return updateState;
};
const purchaseBurgerStart = ( state, action ) => {
  const updateState = updateObject( state, {
    loading: true
  } );
  return updateState;
};
const purchaseBurgerSuccess = ( state, action ) => {
  const updateState = updateObject( state, {
    error: false,
    loading: false,
    purchased: true
  } );
  return updateState;
};
const purchaseBurgerFail = ( state, action ) => {
  const updateState = updateObject( state, {
    error: true,
    loading:false
  } );
  return updateState;
};
const fetchOrdersStart = ( state, action ) => {
  const updateState = updateObject( state, {
    loading: true
  } );
  return updateState;
};
const fetchOrdersSuccess = ( state, action ) => {
  const updateState = updateObject( state, {
    loading: false,
    orders: action.orders
  } );
  return updateState;
};
const fetchOrdersFail = ( state, action ) => {
  const updateState = updateObject( state, {
    loading: false,
    error: action.error
  } );
  return updateState;
};
const reducer = ( state = initState, action ) => {
  switch ( action.type ) {
    case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart( state, action );
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action );
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
    default: return state;
  }
}

export default reducer;
