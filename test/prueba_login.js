import axios from 'axios';
import qs from 'qs';
import { Agent } from 'https';
const data = qs.stringify({
    grant_type: 'password',
    client_id: 'cIGhYzy75LwxzSVFb9k4BsSavT0a',
    client_secret: 'T9PjTVNCvvONGAof4Rec_70BZVvuYAts8PmDt5aikPga',
    username: 'monitoreador',
    password: 'rPdgKxh5LLgBih9*',
    scope: 'openid groups profile roles internal_role_mgt_view'
});

axios.post('https://10.12.24.205:9443/oauth2/token', data, {
    proxy: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://10.12.24.33:10410'
    },
    httpsAgent: new Agent({ rejectUnauthorized: false })
})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.error(err.response?.data || err.message);
    });
