import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get('authToken');
}

export const removeToken = () => {
    Cookies.remove('authToken',{path: '/'});
}