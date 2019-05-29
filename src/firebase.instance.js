import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-firebase-learning.firebaseio.com/'
});

export default instance;