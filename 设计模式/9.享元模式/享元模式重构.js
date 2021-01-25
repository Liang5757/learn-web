// 只需要区别男女模特
//  那我们先把 underwear 参数从构造函数中 移除，构造函数只接收 sex 参数
class Model {
  constructor(sex) {
    this.sex = sex;
  }

  takePhoto() {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
  };
}

// 分别创建一个男模特对象和一个女模特对象
let maleModel = new Model('male'),
  femaleModel = new Model('female');

// 给男模特依次穿上所有的男装，并进行拍照
for (let i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto();
}

// 给女模特依次穿上所有的女装，并进行拍照
for (let j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j;
  femaleModel.takePhoto();
}
// 只需要两个对象便完成了同样的功能
