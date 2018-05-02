import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';
const initState = {
  loading: false,
  idToken: null,
  error: null,
  userId: null,
  redirectPath: '/'
};
const authStart = ( state, action ) => {
  return updateObject( state, {
    loading: true
  } )
};
const authSuccess = ( state, action ) => {
  return updateObject( state, {
    idToken: action.idToken,
    userId: action.localId,
    loading: false,
    error: null
  } )
}
const authFail = ( state, action ) => {
  return updateObject( state, {
    idToken: null,
    userId: null,
    loading: false,
    error: action.error
  } );
};
const authLogout = ( state, action ) => {
  return updateObject( state, {
    userId: null,
    idToken: null,
    redirectPath:'/'
  } )
};
const authRedirectPath = ( state, action ) => {
  return updateObject( state, {
    redirectPath: action.path
  } )
};

const reducer = ( state = initState, action ) => {
  switch ( action.type ) {
    case actionTypes.AUTH_START: return authStart( state, action );
    case actionTypes.AUTH_SUCCESS: return authSuccess( state, action );
    case actionTypes.AUTH_FAIL: return authFail( state, action );
    case actionTypes.AUTH_LOGOUT: return authLogout( state, action );
    case actionTypes.AUTH_REDIRECT_PATH: return authRedirectPath( state, action );
    default: return state;
  }
}
export default reducer;