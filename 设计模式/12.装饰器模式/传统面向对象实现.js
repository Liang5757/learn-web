let Plane = function () {};
Plane.prototype.fire = function () {
  console.log("发射普通子弹");
};

// 导弹类
let MissileDecorator = function (plane) {
  this.plane = plane;
};
MissileDecorator.prototype.fire = function () {
  this.plane.fire();
  console.log("发射导弹");
};

// 原子弹类
let AtomDecorator = function (plane) {
  this.plane = plane;
};
AtomDecorator.prototype.fire = function () {
  this.plane.fire();
  console.log("发射原子弹");
};

let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
