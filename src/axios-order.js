import axios from 'axios';

const instance = axios.create( {
  baseURL: 'https://react-burger-project-cdf26.firebaseio.com/'
} );
export default instance;