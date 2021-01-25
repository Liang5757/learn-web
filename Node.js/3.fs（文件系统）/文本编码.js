const fs = require('fs');

// BOM���Ƴ�
// BOM���ڱ��һ���ı��ļ�ʹ��Unicode���룬�䱾����һ��Unicode�ַ���"\uFEFF"��
// λ���ı��ļ�ͷ�����ڲ�ͬ��Unicode�����£�BOM�ַ���Ӧ�Ķ������ֽ����£�
//     Bytes      Encoding
// ----------------------------
//     FE FF       UTF16BE
//     FF FE       UTF16LE
//     EF BB BF    UTF8
// ��ȻBOM���˱���ļ���������ã�����������js�ļ��ϲ���һ���ļ�������ļ��м京��BOM�ַ����ͻᵼ�����������
// ������ȥ��BOM�Ĵ���
function readText(pathname) {
  let bin = fs.readFileSync(pathname);

  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }

  return bin.toString('utf-8');
}

// GBK���벻��NodeJS����֧�ַ�Χ�ڣ���Ҫ���� iconv-lite �����������ת������
let iconv = require('iconv-lite');

function readGBKText(pathname) {
  let bin = fs.readFileSync(pathname);

  return iconv.decode(bin, 'gbk');
}
