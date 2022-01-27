/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
  let num = 0;
  while(true) {
    num = (rand7() - 1) * 7 + rand7();
    if (num <= 40) return 1 + num % 10;
    num = (num - 41) * 7 + rand7();
    if (num <= 60) return 1 + num % 10;
    num = (num - 61) * 7 + rand7();
    if (num <= 20) return 1 + num % 10;
  }
};

/**
 * rand[n]() ��ʾ���� [1, n] �������
 * (randX() - 1) * Y + randY() ��ʾ���� [0, X*Y] �������
 */
