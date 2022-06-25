let map = {
  '(': ')',
  '[': ']',
  '{': '}'
};

function isValid (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case '(':
      case '[':
      case '{':
        stack.push(s[i]);
        break;
      case ')':
      case ']':
      case '}':
        if (map[stack[stack.length - 1]] === s[i]) {
          stack.pop();
        } else {
          return false;
        }
    }
  }
  
  return stack.length === 0;
}

console.log(isValid("([)]"));
