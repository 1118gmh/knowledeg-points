if (typeof axios !== 'undefined') {
    axios.defaults.baseURL = 'http://127.0.0.1:8686';
    axios.defaults.validateStatus = function(status) {
        return /^(2|3)\d{2}$/.test(status);
    };
    axios.interceptors.response.use(result => {
        return result.data;
    }, (reason) => {
        return Promise.reject(reason);
    });
    axios.defaults.transformRequest = data => {
        //data：请求主体中需要传递给服务器的内容
        let str = ``;
        for (let attr in data) {
            if (data.hasOwnProperty(attr)) {
                str += `${attr}=${data[attr]}&`
            }
        }
        return str.substring(0, str.length - 1);
    };
    // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencode';
    // axios.defaults.withCredentials = true;
}