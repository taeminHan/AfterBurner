import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

export const callGet = async () => {
    try{
        return instance.request({
            method: 'get',
            url: '/cart'
        });
    }
    catch(e){
        console.error(e);
        return null;
    }
}