import { add as addEvent } from 'crossvent';

const documentElement = document.documentElement;

function draggable (dom) {
  let _moveX, _moveY;
  let active = false;
  
  initEvents();
  
  function initEvents () {
    touchy(dom, 'mousedown', mousedown);
    touchy(documentElement, 'mousemove', mousemove);
    touchy(documentElement, 'mouseup', mouseup);
  }
  
  function mousedown (e) {
    active = true;
    e = getEventHost(e);
    _moveX = e.clientX;
    _moveY = e.clientY;
  }
  
  function mousemove (e) {
    if (!active) {
      return;
    }
    e = getEventHost(e);
    const { x, y, height, width } = dom.getBoundingClientRect();
    const curLeft = x + e.clientX - _moveX;
    const curTop = y + e.clientY - _moveY;
    
    dom.style.left = `${curLeft}px`;
    dom.style.top = `${curTop}px`;
    
    dom.style.left = `${clamp(curLeft, 0, documentElement.clientWidth - width - 1)}px`;
    dom.style.top = `${clamp(curTop, 0, documentElement.clientHeight - height)}px`;
    _moveX = e.clientX;
    _moveY = e.clientY;
  }
  
  function mouseup () {
    active = false;
  }
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getEventHost (e) {
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

let touchy = function (el, type, fn) {
  const touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  const pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  const microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (window.navigator.pointerEnabled) {
    touchy = function (el, type, fn) {
      addEvent(el, pointers[type], fn);
    };
  } else if (window.navigator.msPointerEnabled) {
    touchy = function (el, type, fn) {
      addEvent(el, microsoft[type], fn);
    };
  } else {
    touchy = function (el, type, fn) {
      addEvent(el, touch[type], fn);
      addEvent(el, type, fn);
    };
  }
  
  touchy(el, type, fn);
};

export {
  draggable
};
