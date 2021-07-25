const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const os = require('os')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {

  // ������������ڡ�
  win = new BrowserWindow({ width: 800, height: 600 })

  // Ȼ�����Ӧ�õ� index.html��
  win.loadFile('index.html')

  // �򿪿����߹���
  win.webContents.openDevTools()

  // �� window ���رգ�����¼��ᱻ������
  win.on('closed', () => {
    // ȡ������ window ����������Ӧ��֧�ֶര�ڵĻ���
    // ͨ����Ѷ�� window ��������һ���������棬
    // ���ͬʱ����Ӧ��ɾ����Ӧ��Ԫ�ء�
    win = null
  })
}

// Electron ���ڳ�ʼ����׼��
// �������������ʱ���������������
// ���� API �� ready �¼����������ʹ�á�
app.on('ready', createWindow)

// ��ȫ�����ڹر�ʱ�˳���
app.on('window-all-closed', () => {
  // �� macOS �ϣ������û��� Cmd + Q ȷ�����˳���
  // ������󲿷�Ӧ�ü���˵����ᱣ�ּ��
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // ��macOS�ϣ�������dockͼ�겢��û���������ڴ�ʱ��
  // ͨ����Ӧ�ó��������´���һ�����ڡ�
  if (win === null) {
    createWindow()
  }
})
