// 封装为ajax函数
function Ajax(type, url, data, success, failed) {
    // 创建Ajax对象
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    type = type.toUpperCase();
    // 定义随机的一个数字，用来跟在url后面，防止浏览器缓存我们的这个请求结果
    let random = Math.random();

    if (typeof data === 'object') {
        let str = '';
        for (let key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }

    // 新建请求
    if (type === 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();
    } else if (type === 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样POST数据，请使用 setRequestHeader() 来添加 http头
        xhr.setRequestHeader("Content-type", "appliaction/x-www-form-urlencoded");
        xhr.send(data);
    }

    //处理返回数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    }
}