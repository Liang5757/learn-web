function interval(func, wait) {
  let timer = null;

  function interFunc() {
    func.call(null);
    timer = setTimeout(interFunc, wait);
  }
  timer = setTimeout(interFunc, wait);

  return timer;
}
