// ��װΪajax����
function Ajax(type, url, data, success, failed) {
    // ����Ajax����
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    type = type.toUpperCase();
    // ���������һ�����֣���������url���棬��ֹ������������ǵ����������
    let random = Math.random();

    if (typeof data === 'object') {
        let str = '';
        for (let key in data) {
            str += key + '=' + data[key] + '&';
        }
        data = str.replace(/&$/, '');
    }

    // �½�����
    if (type === 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();
    } else if (type === 'POST') {
        xhr.open('POST', url, true);
        // �����Ҫ�� html ������POST���ݣ���ʹ�� setRequestHeader() ����� httpͷ
        xhr.setRequestHeader("Content-type", "appliaction/x-www-form-urlencoded");
        xhr.send(data);
    }

    //����������
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