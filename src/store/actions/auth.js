import * as actionTypes from './actionTypes';
import axios from 'axios';
const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = ( idToken, localId ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId
  };
};

const authFail = ( error ) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};
const auhtLogout = () => {
  localStorage.removeItem( 'token' );
  localStorage.removeItem( 'userId' );
  localStorage.removeItem( 'expirationDate' );
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const logout = ( logOutTime ) => {
  return dispatch => {
    setTimeout( () => {
      return dispatch( auhtLogout() )
    }, logOutTime * 1000 );
  };
};
export const authenticate = ( email, password, isSignup ) => {
  const api = 'AIzaSyDgsXXF9lvFjdp5mSj1AErtQiVRc-pXggU';
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${ api }`;
  if ( !isSignup ) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${ api }`;
  }
  return dispatch => {
    dispatch( authStart() );
    axios.post( url, authData )
      .then( response => {
        const token = response.data.idToken;
        const userId = response.data.localId;
        const expiresIn = response.data.expiresIn;
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'userId', userId );
        localStorage.setItem( 'expirationDate', new Date( new Date().getTime() + expiresIn * 1000 ) );
        dispatch( authSuccess( token, userId ) );
        dispatch( logout( expiresIn ) );
      } )
      .catch( err => {
        dispatch( authFail( err.response.data.error ) );
      } );
  };
};

export const authRedirectPath = ( path ) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path
  };
};

export const autoSignin = () => {
  return dispatch => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      const userId = localStorage.getItem( 'userId' );
      const expirationDate = new Date( localStorage.getItem( 'expirationDate' ) );
      if ( expirationDate > new Date() ) {
        dispatch( authSuccess( token, userId ) );
        const expireTime = ( expirationDate.getTime() - new Date().getTime() ) / 1000;
        dispatch( logout( expireTime ) );
      } else {
        dispatch( auhtLogout() );
      }
    } else {
      dispatch( auhtLogout() );
    };
  };
};