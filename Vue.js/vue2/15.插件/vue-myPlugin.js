(function () {
    const myPlugin = {};

    myPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或属性
        Vue.myGlobalMethods = function () {
            console.log("Vue函数对象的方法myGlobalMethods()");
        };

        // 2. 添加全局资源
        Vue.directive('my-directive', function (el, binding) {
            el.textContent = binding.value.toUpperCase();
        });

        // 4. 添加实例方法
        Vue.prototype.$myMethods = function () {
            console.log("Vue实例对象的方法$myMethods()");
        };
    };

    window.myPlugin = myPlugin;
})();