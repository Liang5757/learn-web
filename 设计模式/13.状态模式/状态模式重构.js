let OffLightState = function (light) {
  this.light = light;
};
OffLightState.prototype.buttonWasPressed = function () {
  console.log("弱光"); // offLightState 对应的行为
  this.light.setState(this.light.weakLightState);// 切换状态到 weakLightState
};

let WeakLightState = function (light) {
  this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function () {
  console.log("强光"); // weakLightState 对应的行为
  this.light.setState(this.light.strongLightState); //切换状态到 strongLightState
};

let StrongLightState = function (light) {
  this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
  console.log("关灯"); // strongLightState 对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

// 改写 Light 类，使用状态对象记录当前的状态
let Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};

// 提供一个 方法来切换 light 对象的状态
Light.prototype.init = function () {
  let button = document.createElement("button"),
    self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = "开关";
  this.currState = this.offLightState;
  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  };
};
Light.prototype.setState = function (newState) {
  this.currState = newState;
};

let light = new Light();
light.init();
