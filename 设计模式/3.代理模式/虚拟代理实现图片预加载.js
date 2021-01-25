let badImage = (function () {
  let imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  let img = new Image;

  img.onload = function () {
    imgNode.src = img.src; // ͼƬ������ɺ��滻loading
  };

  return {
    setSrc: function (src) {
      imgNode.src = "file://loading.gif"; // ����ʾloadingͼƬ
      img.src = src; // ����dom�ṹ����ͼƬ
    }
  }
})

// �������
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
