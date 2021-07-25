function isPlainObject (target) {
  // 1.���ų����Բ���Object��
  if (!target || Object.prototype.toString.call(target) !== "[object Object]") return false;
  
  // 2.�ж��Ƿ���ԭ�ͣ�û��ԭ�͵��Ǽ򵥶���
  const proto = Object.getPrototypeOf(target);
  if (!proto) return true;
  
  // 3.�ж��乹�캯���Ƿ�Ϊ Object
  const ctor = proto.constructor;
  return typeof ctor === "function" && ctor === Object;
}


console.log(isPlainObject("join"))
