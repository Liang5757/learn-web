function format (name) {
  if (name === '') return '';
  
  let state = 2;
  let nameList = new Array(name.length).fill(''), length = 0;
  
  for (let i = 0; i < name.length; i++) {
    if (/[a-z0-9]/.test(name[i])) {
      state = 1;
      nameList[length] += name[i];
    } else if (/[A-Z]/.test(name[i])) {
      if (state === 1) {
        length++;
      }
      state = -1;
      nameList[length] += name[i];
    } else if (name[i] === '_') {
      state = 1;
      length++;
    }
  }
  let flag = false;
  nameList = nameList.map((name) => {
    if (name === '') {
      return;
    }
    if (!flag) {
      flag = true;
      return name.toLowerCase();
    }
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  });
  
  return nameList.join('');
}

console.log(format('TEST_VARIABLE'));
console.log(format('TestVariable'));
console.log(format('test_variable'));

console.log('6'.toLowerCase());
