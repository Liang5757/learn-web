let closeDoorCommand = {
  execute: function () {
    console.log('关门');
  }
};
let openPcCommand = {
  execute: function () {
    console.log('开电脑');
  }
};
let openQQCommand = {
  execute: function () {
    console.log('登录 QQ');
  }
};
let MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (let i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
};
let macroCommand = MacroCommand();

macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
