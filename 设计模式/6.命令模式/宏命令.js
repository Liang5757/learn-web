let closeDoorCommand = {
  execute: function () {
    console.log('����');
  }
};
let openPcCommand = {
  execute: function () {
    console.log('������');
  }
};
let openQQCommand = {
  execute: function () {
    console.log('��¼ QQ');
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
