(function (global) {
  var id = 0,
    container = document.getElementsByTagName("head")[0];
  
  function jsonp(options) {
    if(!options || !options.url) return;
    
    var scriptNode = document.createElement("script"),
      data = options.data || {},
      url = options.url,
      callback = options.callback,
      fnName = "jsonp" + id++;
    
    // ��ӻص�����
    data["callback"] = fnName;
    
    // ƴ��url
    var params = [];
    for (var key in data) {
      params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
    url += params.join("&");
    scriptNode.src = url;
    
    // ���ݵ���һ�������Ļص�������Ҫִ�еĻ�����¶Ϊһ��ȫ�ַ���
    global[fnName] = function (ret) {
      callback && callback(ret);
      container.removeChild(scriptNode);
      delete global[fnName];
    }
    
    // ������
    scriptNode.onerror = function () {
      callback && callback({error:"error"});
      container.removeChild(scriptNode);
      global[fnName] && delete global[fnName];
    }
    
    scriptNode.type = "text/javascript";
    container.appendChild(scriptNode)
  }
  
  global.jsonp = jsonp;
  
})(this);

jsonp({
  url : "www.example.com",
  data : {id : 1},
  callback : function (ret) {
    console.log(ret);
  }
});
