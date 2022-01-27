import path from 'path';
import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import { terser } from 'rollup-plugin-terser';
import packageJSON from './package.json';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const getPath = _path => path.resolve(__dirname, _path);
const name = packageJSON.name;
const isDev = process.env.NODE_ENV !== 'production';

const outputConfigs = [{
  file: getPath(`./dist/${name}.esm.js`),
  format: `es`
}];

const commonConfig = {
  input: getPath('./src/index.js'),
  plugins: [
    resolve(),
    commonjs(),
    !isDev && terser({
      compress: {
        ecma: 2015,
        pure_getters: true
      },
      safari10: true,
      format: {
        comments: false
      }
    }),
    isDev && livereload(),
    isDev && serve({
      open: true,
      port: 8888,
      contentBase: './dist',
    })
  ]
};

const buildConf = options => Object.assign({}, commonConfig, options);

export default outputConfigs.map(output => buildConf({
  output: {
    name: packageJSON.name,
    sourcemap: true,
    ...output
  }
}));
