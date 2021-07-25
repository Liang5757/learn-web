function isEmptyObject (obj) {
  return JSON.stringify(obj) === "{}"
}

function isEmptyObjectByJquery (obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
