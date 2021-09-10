import axios from 'axios';

const AXIOS= axios.create({
    baseURL:'http://192.168.1.107:3000',
    timeout:1000,
    headers: {
        Accept: application/json,
        'Content-Type': 'application/json; charset=utf-8'
    }
  
    
  })


  export default AXIOS;