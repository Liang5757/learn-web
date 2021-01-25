//IE8及以下不兼容addEventListener()事件绑定函数，而支持attachEvent()函数
//注册原生监听事件
export const on = (function() {
	if (document.addEventListener) {
		return function(element, event, handler) {
			if (element && event && handler) {
				element.addEventListener(event, handler, false);
			}
		};
	} else {
		return function(element, event, handler) {
			if (element && event && handler) {
				element.attachEvent("on" + event, handler);
			}
		};
	}
})();

//注销原生监听事件
export const off = (function() {
	if (document.removeEventListener) {
		return function(element, event, handler) {
			if (element && event) {
				element.removeEventListener(event, handler, false);
			}
		};
	} else {
		return function(element, event, handler) {
			if (element && event) {
				element.detachEvent("on" + event, handler);
			}
		};
	}
})();
