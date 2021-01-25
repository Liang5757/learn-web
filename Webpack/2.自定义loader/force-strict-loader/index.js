var loaderUtils = require("loader-utils");
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

module.exports = function (content, sourceMap) {
  var useStrictPrefix = '\'use strict\';\n\n';
  // �������棬����ļ������������û�з����仯ʱ��Ӧ����loaderֱ��ʹ�û���
  if (this.cacheable) {
    this.cacheable();
  }
  // ����source-map���Ա���ʵ�ʿ����������������̨�鿴Դ����
  // ���û�д��������޷�������ȷ��map�ļ�����dev tool�п��ܿ������ҵ�Դ��
  var options = loaderUtils.getOptions(this) || {};
  // ֻ���ڴ������л�ȡsourceMap���ߴ���һ��loader�д��������Ż��������
  if (options.sourceMap && sourceMap) {
    var currentReguest = loaderUtils.getCurrentRequest(this);
    var node = SourceNode.formStringWithSourceMap(
      content,
      new SourceMapConsumer(sourceMap)
    );
    node.prepend(useStrictPrefix);
    var result = node.toStringWithSourceMap({ file: currentReguest});
    var callback = this.async();
    callback(null, result.code, result.map.toJSON());
  }
  return useStrictPrefix + content;
}
