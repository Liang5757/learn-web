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
let openAcCommand = {
  execute: function () {
    console.log('�򿪿յ�');
  }
};
// ����ĵ��Ӻ�������������һ��ģ����Կ�����һ������������ϴ򿪵��Ӻʹ����������
let openTvCommand = {
  execute: function () {
    console.log('�򿪵���');
  }
};
let openSoundCommand = {
  execute: function () {
    console.log('������');
  }
};
let macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);
// ���š��򿪵��Ժʹ��¼ QQ ������
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
let macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

// ���ڰ����е�������ϳ�һ�����������
let macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// ����ң�����󶨡��������
let setCommand = (function (command) {
  document.getElementById('button').onclick = function () {
    command.execute();
  }
})(macroCommand);
