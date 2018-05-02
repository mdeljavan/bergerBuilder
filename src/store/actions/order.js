import * as actionTypes from './actionTypes';
import axios from './../../axios-order';

const purchaseBurgerSuccess = ( id, orderData ) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData

  };
};

const purchaseBurgerFail = ( error ) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};
const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = ( orderData, token ) => {
  return dispatch => {
    dispatch( purchaseBurgerStart() );
    axios.post( '/order.json?auth='+ token, orderData )
      .then( order => {
        dispatch( purchaseBurgerSuccess( order.data, orderData ) );
      } )
      .catch( err => {
        dispatch( purchaseBurgerFail( err ) );
      } );
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};


const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

const fetchOrdersSuccess = ( orders ) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};
const fetchOrdersFail = ( error ) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrders = (token,userId) => {
  return dispatch => {
    dispatch( fetchOrdersStart() );
    axios.get( `/order.json?auth=${token}&orderBy="userId"&equalTo="${userId}"` )
      .then( res => {
        const orders = [];
        for ( let key in res.data ) {
          orders.push( {
            ...res.data[ key ],
            id: key
          } );
        };
        dispatch( fetchOrdersSuccess( orders ) );
      } )
      .catch( err => {
        dispatch( fetchOrdersFail( err ) );
      } );
  };
};