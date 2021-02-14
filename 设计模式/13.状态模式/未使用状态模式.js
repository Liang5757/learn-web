let Light = function () {
  this.state = "off"; // 给电灯设置初始状态 off
  this.button = null;// 电灯开关按钮
};

Light.prototype.init = function () {
  let button = document.createElement("button"),
    self = this;
  button.innerHTML = "开关";
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.buttonWasPressed();
  };
};

Light.prototype.buttonWasPressed = function () {
  if (this.state === "off") {
    console.log("开灯");
    this.state = "on";
  } else if (this.state === "on") {
    console.log("关灯");
    this.state = "off";
  }
};

let light = new Light();
light.init();
