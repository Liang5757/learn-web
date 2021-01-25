class Model {
  constructor(sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
  }

  takePhoto() {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
  };
}

for (let i = 1; i <= 50; i++) {
  let maleModel = new Model('male', 'underwear' + i);
  maleModel.takePhoto();
}

for (let j = 1; j <= 50; j++) {
  let femaleModel = new Model('female', 'underwear' + j);
  femaleModel.takePhoto();
}
