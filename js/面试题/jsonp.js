function request (options) {
  // todo
  let script = document.createElement("script");
  script.src = options.src;
  return new Promise((resolve, reject) => {
    script.onload = function (e) {
      clearTimeout(abortTimeout);
      script.parentNode.removeChild(script);
      resolve();
    }
	
    script.onerror = function (e) {
      clearTimeout(abortTimeout);
      script.parentNode.removeChild(script);
      reject();
    }
    
    // ��ʱ������
    if (options.timeout > 0) abortTimeout = setTimeout(function () {
      reject();
    }, options.timeout);
  })
}

// �÷�
request({src: "test.jsonp", timeout: 2000}).then(() => {}).catch(() => {});
