let miniConsole = (function () {
  let cache = [];
  let handler = function (e) {
    if (e.keyCode === 113) {
      let script = document.createElement("script");
      script.onload = function () {
        for (let i = 0, fn; fn = cache[i++];) {
          fn();
        }
      };
      script.src = "miniConsole.js";
      document.getElementsByClassName("head")[0].appendChild(script);
      document.body.removeEventListener("keydown", handler); // 只加载一次miniConsole.js
    }
  }

  document.body.addEventListener("keydown", handler, false);

  return {
    log: function () {
      let args = arguments;
      cache.push(function () {
        return miniConsole().log.apply(miniConsole().args);
      })
    }
  }
})();

miniConsole.log(11);
