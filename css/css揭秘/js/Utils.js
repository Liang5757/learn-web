let Utils = {
    // ��ȡDom���
    $$: function (selector, context) {
        context = context || document;
        let elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);
    },
    
    // �������ʽ�����Ƿ�֧��
    testProperty: function (property) {
        let root = document.documentElement;
        
        if (property in root.style) {
            root.classList.add(property.toLowerCase());
            return true;
        }
        
        root.classList.add('no-' + property.toLowerCase());
        return false;
    },

    // ���ĳ�����������ֵ�Ƿ�֧��
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