let AjaxUtil = {
    // ����ѡ��
    options : {
        method: "get", // Ĭ���ύ�ķ���,get post
        url: "", // �����·�� required
        params: {}, // ����Ĳ���
        type: 'text', // ���ص����ݵ�����,text,xml,json
        callback: function() {}// �ص����� required
    },

    //����һ��XMLHttpRequest����
    createRequest : function() {
        let xhr;
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");// IE6���ϰ汾
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");// IE6���°汾
            } catch (e) {
                try {
                    xhr = new XMLHttpRequest();
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/xml");
                    }
                } catch (e) {
                    alert("�����������֧��Ajax");
                }
            }
        }
        return xhr;
    },

    // ���û���ѡ��
    setOptions : function(newOptions) {
        for (let pro in newOptions) {
            this.options[pro] = newOptions[pro];
        }
    },

    // ��ʽ���������
    formatParameters : function() {
        const paramsArray = [];
        const params = this.options.params;
        for (let pro in params) {
            let paramValue = params[pro];
            paramsArray.push(pro + "=" + paramValue);
        }
        return paramsArray.join("&");
        // url=&callback=&type=text
    },

    // ״̬�ı�Ĵ���
    readystatechange : function(xhr) {
        // ��ȡ����ֵ
        let returnValue;
        if (xhr.readyState === 4 && xhr.status === 200) {
            switch (this.options.type) {
                case "xml":
                    returnValue = xhr.responseXML;
                    break;
                case "json":
                    const jsonText = xhr.responseText;
                    if(jsonText) {
                        returnValue = eval("(" + jsonText + ")");
                    }
                    break;
                default:
                    returnValue = xhr.responseText;
                    break;
            }
            if (returnValue) {
                this.options.callback.call(this, returnValue);
            } else {
                this.options.callback.call(this);
            }
        }
    },

    // ����Ajax����
    request : function(options) {
        const ajaxObj = this;

        // ���ò���
        ajaxObj.setOptions.call(ajaxObj, options);

        // ����XMLHttpRequest����
        const xhr = ajaxObj.createRequest.call(ajaxObj);

        // ���ûص�����
        xhr.onreadystatechange = function() {
            ajaxObj.readystatechange.call(ajaxObj, xhr);
        };

        // ��ʽ������
        const formatParams = ajaxObj.formatParameters.call(ajaxObj);

        // ����ķ�ʽ
        const method = ajaxObj.options.method;
        let url = ajaxObj.options.url;

        if ("GET" === method.toUpperCase()) {
            url += "?" + formatParams;
        }

        // ��������
        xhr.open(method, url, true);

        if ("GET" === method.toUpperCase()) {
            xhr.send(null);
        } else if ("POST" === method.toUpperCase()) {
            // �����POST�ύ����������ͷ��Ϣ
            xhr.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");
            xhr.send(formatParams);
        }
    }
};