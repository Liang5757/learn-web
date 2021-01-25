let AjaxUtil = {
    // 基础选项
    options : {
        method: "get", // 默认提交的方法,get post
        url: "", // 请求的路径 required
        params: {}, // 请求的参数
        type: 'text', // 返回的内容的类型,text,xml,json
        callback: function() {}// 回调函数 required
    },

    //创建一个XMLHttpRequest对象
    createRequest : function() {
        let xhr;
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");// IE6以上版本
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");// IE6以下版本
            } catch (e) {
                try {
                    xhr = new XMLHttpRequest();
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/xml");
                    }
                } catch (e) {
                    alert("您的浏览器不支持Ajax");
                }
            }
        }
        return xhr;
    },

    // 设置基础选项
    setOptions : function(newOptions) {
        for (let pro in newOptions) {
            this.options[pro] = newOptions[pro];
        }
    },

    // 格式化请求参数
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

    // 状态改变的处理
    readystatechange : function(xhr) {
        // 获取返回值
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

    // 发送Ajax请求
    request : function(options) {
        const ajaxObj = this;

        // 设置参数
        ajaxObj.setOptions.call(ajaxObj, options);

        // 创建XMLHttpRequest对象
        const xhr = ajaxObj.createRequest.call(ajaxObj);

        // 设置回调函数
        xhr.onreadystatechange = function() {
            ajaxObj.readystatechange.call(ajaxObj, xhr);
        };

        // 格式化参数
        const formatParams = ajaxObj.formatParameters.call(ajaxObj);

        // 请求的方式
        const method = ajaxObj.options.method;
        let url = ajaxObj.options.url;

        if ("GET" === method.toUpperCase()) {
            url += "?" + formatParams;
        }

        // 建立连接
        xhr.open(method, url, true);

        if ("GET" === method.toUpperCase()) {
            xhr.send(null);
        } else if ("POST" === method.toUpperCase()) {
            // 如果是POST提交，设置请求头信息
            xhr.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");
            xhr.send(formatParams);
        }
    }
};