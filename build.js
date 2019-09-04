const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

axios({
    url: 'http://localhost:' + process.env.PORT + '/build-all',
    method: 'GET',
}).then(response => {
    console.log(response.data);
}).catch(error => {
    console.log(error);
});
