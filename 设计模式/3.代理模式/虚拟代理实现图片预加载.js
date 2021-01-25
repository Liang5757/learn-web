let badImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  let img = new Image;

  img.onload = function () {
    imgNode.src = img.src; // 图片加载完成后替换loading
  };

  return {
    setSrc: function (src) {
      imgNode.src = "file://loading.gif"; // 先显示loading图片
      img.src = src; // 虚拟dom结构加载图片
    }
  }
})

// 虚拟代理
let myImage = (function () {
  let imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

let proxyImage = (function () {
  let img = new Image;

  img.onload = function () {
    myImage.setSrc(this.src);
  };

  return {
    setSrc: function (src) {
      myImage.setSrc("file://loading.gif");
      img.src = src;
    }
  }
})
