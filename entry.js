import isArray from '@yelloxing/core.js/isArray';
import isString from '@yelloxing/core.js/isString';
import xhtmlToJson from '@hai2007/algorithm/xhtmlToJson.js';

let Engine = function (template, indexs) {
  return new Engine.prototype.init(template, indexs);
};

Engine.prototype.init = function (template, indexs) {

  // 维护内置的tree
  this.__DomTree__ = isArray(template) ? template : xhtmlToJson(template);

  // 记录当前查询到的结点
  if (isArray(indexs)) {
    for (let i = 0; i < indexs.length; i++) this[i] = indexs[i];
    this.length = indexs.length;
  } else {
    this[0] = 0;
    this.length = 1;
  }

  return this;

};

Engine.prototype.__new__ = function (template, indexs) {
  return Engine(template, indexs);
};

// 扩展引擎方法
Engine.prototype.extend = function (source) {
  for (let key in source) this[key] = source[key];
  return this;
};

Engine.prototype.valueOf = function () {
  if (this.length <= 0) {
    return null;
  } else {
    let tag = this.__DomTree__[this[0]];
    return tag.type == 'text' ? tag.content : {
      tagName: tag.name,
      attrs: tag.attrs
    };
  }
};

Engine.prototype.toString = function () {

  let str = "[";
  for (let i = 0; i < this.length; i++) {
    let value = Engine(this.__DomTree__, [this[i]]).valueOf();
    str += (isString(value) ? value : JSON.stringify(value)) + ",";
  }
  return str.replace(/,$/, '') + "]";
};

/**
 * 扩展原型方法
 * -------------------------
 */

import { parent, parents, children, siblings, next, nextAll, prev, prevAll, eq } from './tools/Search';
import { innerHTML, outerHTML, attr } from './tools/Operate';

Engine.prototype.extend({

  // 结点查找
  parent, parents, children, siblings, next, nextAll, prev, prevAll, eq,

  // 属性等基本操作
  innerHTML, outerHTML, attr

});

Engine.prototype.init.prototype = Engine.prototype;

// 判断当前环境，如果不是浏览器环境
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Engine;
}
// 浏览器环境下
else {
  window.xHtmlEngine = Engine;
}