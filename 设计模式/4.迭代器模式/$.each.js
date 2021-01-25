// �ж��Ƿ���window������������window�����и�window����
function isWindow( obj ) {
  return obj != null && obj === obj.window;
}

// jqueryԴ�룬�ж��Ƿ������������
function isArrayLike( obj ) {
  //  �Ƿ����length ����
  let length = !!obj && obj.length,
    type = typeof obj;
  // �ų�function window
  if ( typeof type === "function" || isWindow( obj ) ) {
    return false;
  }
  // �����жϣ� type === "array"  �������жϣ�����length����ֵ�� lengthֵΪ�����Ҵ���0�� obj[length - 1] ���ڣ�
  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

function each(obj, callback) {
  let length, i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj
}

let data = { 0: "a", 1: "b", length: 2 }
each(data, (key, val) => {
  console.log(key, val);
});
