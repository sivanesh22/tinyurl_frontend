
import Axios from 'axios';
import { restbaseurl } from './Constants';


export class RestDataSource {
    SendRequest = async (method, url, callback, data = {}) => {
        try {
            let c1 = '';
            if (localStorage.getItem('c1')) {
                c1 = localStorage.getItem('c1');
            }
            const req = Axios.request({
                baseURL: restbaseurl,
                method,
                url,
                data,
                withCredentials:true,
                headers: { Authorization: c1 },
            });
            const resp = await req;
            const respdata = resp.data;
            if (resp.status === 200) {
                callback(respdata);
            }
          
        } catch (err) {
            if (
                err.response
                && err.response.status === 401
                && err.response.data.message === 'Invalid token'
            ) {
                
                // document.location.href = '/login'
            } else if (err.response && err.response.status === 401) {
                alert('Unauthorized.Please try logging in again')
                // navigation.Login()
                // this.props.navigation.navigate('Login')
                // document.location.href = '/login'
            } else if (err.response && err.response.status === 500) {
                console.log('Error in backend')
            }
        }
    };

    async GetData(callback, url, data = {}, method = 'GET', urlType = 'api') {
        this.SendRequest(method, url, callback, data, urlType);
    }

    async Save(callback, url, data) {
        this.SendRequest('post', url, callback, data);
    }

}