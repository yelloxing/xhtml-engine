const fs = require('fs');
const rollup = require('rollup');
const Terser = require('terser');
const babel = require('@babel/core');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const cuf = require('cuf');

let packageJSON = JSON.parse(fs.readFileSync('./package.json'));

// 命令行传递的参数
const parsed = cuf.option({}, process.argv);

console.log(parsed);

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

console.log(
  "\x1B[30m" +
  "🌊 xhtml-engine" +
  "\n------------------------------------------------------------" +
  "\n xhtml字符串解析引擎" +
  "\x1B[39m\n"
);

let banner = `/*!
* xhtml-engine v`+ packageJSON.version + `
* (c) 2020-`+ new Date().getFullYear() + ` ` + packageJSON.author + ` ` + packageJSON.repository.url + `
* License: `+ packageJSON.license + `
*/\n`;

async function build(inputOptions, outputOptions) {

  console.log("\x1B[30m rollup模块整合：**/*.js → " + parsed.output[0] + "index.rollup.js \x1B[39m\n");

  // 模块打包
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);

  console.log("\x1B[33m>> rollup模块整合完毕！ \n\x1B[39m");

  console.log("\x1B[30m babel转义：" + parsed.output[0] + "index.rollup.js → " + parsed.output[0] + "index.babel.js \x1B[39m\n");
  // babel转义
  babel.transformFile(parsed.output[0] + "index.rollup.js", {}, function (err, result) {
    if (result) {
      fs.writeFileSync(parsed.output[0] + "index.babel.js", result.code);

      console.log("\x1B[33m>> babel转义成功！ \n\x1B[39m");

      console.log("\x1B[30m 压缩混淆：" + parsed.output[0] + "index.babel.js → " + parsed.output[0] + "index.js \x1B[39m\n");
      // 压缩混淆
      let data = Terser.minify(result.code);
      if (!result.error) {
        fs.writeFileSync(parsed.output[0] + "index.js", data.code);

        console.log("\x1B[33m>> Terser压缩混淆成功！ \n\x1B[39m");
      } else {
        console.log("\x1B[35m>> Terser压缩混淆失败！\n\x1B[39m" + data.error);
      }

    } else {
      console.log("\x1B[35m>> babel转义失败！\n\x1B[39m" + result.error);
    }
  });

}

build({
  "input": parsed.entry[0] + "entry.js",
  "plugins": [

    // 帮助 Rollup 查找外部模块，然后安装
    rollupPluginNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),

    // 将CommonJS模块转换为 ES2015 供 Rollup 处理
    rollupPluginCommonjs({
      include: "node_modules/**",
      exclude: []
    })

  ]
}, {
  "file": parsed.output[0] + "index.rollup.js",
  "format": "iife",
  "name": "index.rollup",
  banner
});