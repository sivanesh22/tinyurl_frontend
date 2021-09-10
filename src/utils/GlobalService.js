import { RestDataSource } from './RestDataSource';
// import { resturls } from 'globals/utils/apiurls';

class GlobalService {
    static generalSelect = (callback, url = '', values = {}, method = 'POST', urlType = 'api') => {
      this.rds = new RestDataSource();
      this.rds.GetData((respdata) => {
        callback(respdata);
      }, url, values, method, urlType);
    };
}
export default GlobalService;