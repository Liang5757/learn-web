let Utils = {
    // 获取Dom结点
    $$: function (selector, context) {
        context = context || document;
        let elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
    },
    
    // 检测多个样式属性是否被支持
    testProperty: function (property) {
        let root = document.documentElement;
        
        if (property in root.style) {
            root.classList.add(property.toLowerCase());
            return true;
        }
        
        root.classList.add('no-' + property.toLowerCase());
        return false;
    },

    // 检测某个具体的属性值是否支持
    testValue: function (id, value, property) {
        let root = document.documentElement;
        let dummy = document.createElement('p');
        dummy.style[property] = value;

        if (dummy.style[property]) {
            root.classList.add(id);
            return true;
        }

        root.classList.add('no-' + id);
        return false;
    },
};