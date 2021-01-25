class Folder {
  constructor(name) {
    this.name = name;
    this.parent = null; // 增加this.parent 属性
    this.files = [];
  }

  add(file) {
    file.parent = this; // 设置父对象
    this.files.push(file);
  }

  scan() {
    console.log('开始扫描文件夹: ' + this.name);
    for (let i = 0, file, files = this.files; file = files[i++];) {
      file.scan();
    }
  };

  remove() {
    if (!this.parent) { // 根节点或者树外的游离节点
      return;
    }
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      let file = files[l];
      if (file === this) {
        files.splice(l, 1);
      }
    }
  };
}

class File {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }

  add() {
    throw new Error('不能添加在文件下面');
  }

  scan() {
    console.log('开始扫描文件: ' + this.name);
  }

  remove() {
    if (!this.parent) { //根节点或者树外的游离节点
      return;
    }

    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      let file = files[l];
      if (file === this) {
        files.splice(l, 1);
      }
    }
  };
}

let folder = new Folder('学习资料');
let folder1 = new Folder('JavaScript');

folder1.add(new File('JavaScript 设计模式与开发实践'));
folder.add(folder1);
folder.add(new File('深入浅出Node.js'));
folder1.remove(); //移除文件夹
folder.scan();
