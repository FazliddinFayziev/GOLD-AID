import axios from 'axios';
const BASE_URL = 'https://gold-aid.onrender.com/api/v1';

export default axios.create({
    baseURL: BASE_URL
});

// ALL APIS:
//   /isregistered
//   /login
//   /register
//   /newtoken