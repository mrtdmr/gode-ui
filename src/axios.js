import axios from 'axios';
const instance = axios.create({ baseURL: 'https://gode-db.firebaseio.com/' });
export default instance;
