function format (name) {
  name = name.replace(/_|((?<=[a-z0-9])\B(?=[A-Z]))/g, ' ');
  let nameList = name.split(' ');
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
