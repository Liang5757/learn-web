// 通用的对象池
let objectPoolFactory = function (createObjFn) {
  let objectPool = [];

  return {
    create: function () {
      return objectPool.length === 0 ?
        createObjFn.apply(this, arguments) : objectPool.shift();
    },

    recover: function (obj) {
      objectPool.push(obj);
    },
  };
};

let iframeFactory = objectPoolFactory(function () {
  let iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  iframe.onload = function () {
    iframe.onload = null; // 防止 iframe 重复加载的 bug
    iframeFactory.recover(iframe);// iframe 加载完成之后回收节点
  };
  return iframe;
});

let iframe1 = iframeFactory.create();
iframe1.src = "http:// baidu.com";

let iframe2 = iframeFactory.create();
iframe2.src = "http:// QQ.com";

setTimeout(function () {
  let iframe3 = iframeFactory.create();
  iframe3.src = "http:// 163.com";
}, 3000);
