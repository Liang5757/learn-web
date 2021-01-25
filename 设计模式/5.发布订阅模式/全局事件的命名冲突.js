let Event = (function () {
  let namespaceCache = {},
    each = function (ary, fn) {
      let ret;
      for (let i = 0, l = ary.length; i < l; i++) {
        let n = ary[i];
        ret = fn.call(n, i, n);
      }
      return ret;
    };

  function _listen(key, fn, cache) {
    if (!cache[key]) {
      cache[key] = [];
    }
    cache[key].push(fn);
  }

  function _remove(key, cache, fn) {
    if (cache[key]) {
      if (fn) {
        for (let i = cache[key].length; i >= 0; i--) {
          if (cache[key] === fn) {
            cache[key].splice(i, 1);
          }
        }
      } else {
        cache[key] = [];
      }
    }
  }

  function _trigger(cache, event, ...args) {
    let stack = cache[event];
    if (!stack || !stack.length) {
      return;
    }
    return each(stack, function () {
      return this.apply(this, args);
    });
  }

  function _create(namespace = 'default') { // 命名空间默认为default
    let cache = {},
      offlineStack = [], // 离线事件
      ret = {
        listen: function (key, fn, last) {
          _listen(key, fn, cache);
          if (offlineStack === null) {
            return;
          }
          if (last === 'last') {
          } else {
            each(offlineStack, function () {
              this();
            });
          }
          offlineStack = null;
        },
        one: function (key, fn, last) {
          _remove(key, cache);
          this.listen(key, fn, last);
        },
        remove: function (key, fn) {
          _remove(key, cache, fn);
        },
        trigger: function () {
          let fn,
            args = [cache, ...arguments];
          fn = function () {
            return _trigger.apply(this, args);
          };
          if (offlineStack) {
            return offlineStack.push(fn);
          }
          return fn();
        }
      };
    return namespace ?
      (namespaceCache[namespace] ? namespaceCache[namespace] :
        namespaceCache[namespace] = ret)
      : ret;
  }

  return {
    create: _create,
    one: function (key, fn, last) {
      let event = this.create();
      event.one(key, fn, last);
    },
    remove: function (key, fn) {
      let event = this.create();
      event.remove(key, fn);
    },
    listen: function (key, fn, last) {
      let event = this.create();
      event.listen(key, fn, last);
    },
    trigger: function () {
      let event = this.create();
      event.trigger.apply(this, arguments);
    }
  };
})();

Event.create('namespace1').listen('click', function (a) {
  console.log(a);
})

Event.create('namespace1').trigger('click', 1);

Event.create('namespace2').listen('click', function (a) {
  console.log(a);
})

Event.create('namespace2').trigger('click', 2);
