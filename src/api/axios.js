import axios from 'axios';
const BASE_URL = 'https://myserverip.net/api/v1';

// OLD URL:
// https://goldenaid.onrender.com

export default axios.create({
    baseURL: BASE_URL
});

// ALL APIS:
//   /isregistered
//   /login
//   /register
//   /newtoken