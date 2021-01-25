var loaderUtils = require("loader-utils");
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

module.exports = function (content, sourceMap) {
  var useStrictPrefix = '\'use strict\';\n\n';
  // 开启缓存，如果文件输入和其依赖没有发生变化时，应该让loader直接使用缓存
  if (this.cacheable) {
    this.cacheable();
  }
  // 开启source-map可以便于实际开发者在浏览器控制台查看源代码
  // 如果没有处理，最终无法生成正确的map文件，在dev tool中可能看到错乱的源码
  var options = loaderUtils.getOptions(this) || {};
  // 只有在从配置中获取sourceMap或者从上一个loader中传递下来才会继续处理
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
