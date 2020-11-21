"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
* xhtml-engine v3.0.0
* (c) 2020-2020 心叶 git+https://github.com/yelloxing/xhtml-engine.git
* License: MIT
*/
(function () {
  'use strict';

  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * 判断是不是一个可以作为长度的整数（比如数组下标）
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * 判断是不是一个类似数组的对象，是否可以通过length迭代
   *
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArrayLike(value) {
    return value != null && typeof value != 'function' && isLength(value.length);
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 和isArrayLike类似，不过特别排除以下类型：
   *  1.字符串
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArraySpec(value) {
    return isArrayLike(value) && !isString(value);
  }
  /**
   * 判断一个值是不是数组。
   *
   * @since V0.3.1
   * @public
   * @param {*} value 需要判断类型的值
   * @param {boolean} notStrict 是否不严格检查类型（默认false，如果为true表示判断是不是一个类似数组的类型）
   * @returns {boolean} 如果是数组返回true，否则返回false
   */


  function isArray(value, notStrict) {
    if (notStrict) {
      return isArraySpec(value);
    }

    return Array.isArray(value);
  }

  var $RegExp = {
    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    blankReg: new RegExp("[\\x20\\t\\r\\n\\f]"),
    blanksReg: /^[\x20\t\r\n\f]{0,}$/
  };
  var toString$1 = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType$1(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString$1.call(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function _isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType$1(value) === '[object String]';
  }

  var isString$1 = _isString; // 分析结点的属性

  function analyseTag(attrString) {
    var attr = {},
        index = 0;
    attrString = attrString.trim();

    var getOneAttr = function getOneAttr() {
      // 属性名和属性值
      var attrName = "",
          attrValue = ""; // 先寻找属性名

      for (; index < attrString.length; index++) {
        // 寻找属性名的时候遇到空白或结尾的时候，肯定没有属性值
        if ($RegExp.blanksReg.test(attrString[index]) || index == attrString.length - 1) {
          attrName += attrString[index]; // 如果属性名是空白，就不需要记录了

          if (!$RegExp.blanksReg.test(attrName)) {
            attr[attrName.trim()] = "";
          }

          index += 1;
          break;
        } // 如果遇到等号，说明属性名寻找结束了
        else if (attrString[index] == '=') {
            // 接着寻找属性值
            index += 1; // 由于属性可能由引号包裹或直接暴露

            var preCode = null,
                preLeng = -1; // 如果是由'或者"包裹

            if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
              preCode = attrString.substr(index, 1);
              preLeng = 1;
              index += 1;
            } // 如果是由\'或\"包裹
            else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
                preCode = attrString.substr(index, 2);
                preLeng = 2;
                index += 2;
              } // 开始正式寻找属性值
            // 如果没有包裹，是直接暴露在外面的
            // 我们寻找到空格或结尾即可


            if (preCode !== null) {
              for (; index < attrString.length; index++) {
                if (attrString.substr(index, preLeng) == preCode) {
                  attr[attrName.trim()] = attrValue.trim();
                  index += 2;
                  break;
                } else {
                  attrValue += attrString[index];
                }
              }
            } // 如果是包裹的
            // 我们确定寻找到对应的包裹闭合即可
            else {
                for (; index < attrString.length; index++) {
                  if ($RegExp.blanksReg.test(attrString[index])) {
                    attr[attrName.trim()] = attrValue.trim();
                    index += 1;
                    break;
                  } else {
                    attrValue += attrString[index];
                  }
                }
              }

            break;
          } else {
            attrName += attrString[index];
          }
      } // 如果还有字符串，继续解析


      if (index < attrString.length) {
        getOneAttr();
      }
    };

    getOneAttr();
    return attr;
  }

  function nextTagFun(template) {
    var i = -1,
        // 当前面对的字符
    currentChar = null; // 如果前面是获取的js或css，还有pre等开始标签，比较特殊，直接寻址闭合的

    var preIsSpecial = false,
        specialCode = "";
    var specialTag = ['script', 'pre', 'style', 'code']; // 获取下一个字符

    var next = function next() {
      currentChar = i++ < template.length - 1 ? template[i] : null;
      return currentChar;
    }; // 获取往后n个值


    var nextNValue = function nextNValue(n) {
      return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next(); // 剔除开头的空白

    while ($RegExp.blankReg.test(currentChar) && i < template.length - 1) {
      next();
    }
    /**
     * 一个Tag存在哪些类型？如下：
     * 1.<tag-name>       { tagName:'tag-name', type:'beginTag', attrs:{} }      开始标签
     * 2.</tag-name>      { tagName:'tag-name', type:'endTag'   }                结束标签
     * 3.<tag-name />     { tagName:'tag-name', type:'fullTag',  attrs:{} }      自闭合标签
     * 4.text             { tagName:'text',     type:'textcode' }                文本结点
     * 5.<!-- text -->    { tagName:'text',     type:'comment'  }                注释
     * 6.<!DOCTYPE text>  { tagName:'text',     type:'DOCTYPE'  }                声明
     *
     *
     */


    return function () {
      var tag = currentChar,
          tagObj = {};
      if (tag == null) return null;
      /**
       * 特殊标签内容获取
       * ========================================
       */
      // 如果是获取特殊标签里面的内容
      // 先不考虑里面包含'</XXX>'

      if (preIsSpecial) {
        tagObj.type = 'textcode';
        tagObj.tagName = tag;

        while (nextNValue(specialCode.length + 3) != '</' + specialCode + '>' && i < template.length) {
          tagObj.tagName += next();
        }

        tagObj.tagName = tagObj.tagName.replace(/<$/, '');
        preIsSpecial = false;
        return tagObj;
      }
      /**
       * 特殊标签获取
       * ========================================
       */
      // 针对特殊的comment


      if (nextNValue(4) == '<!--') {
        tagObj.type = 'comment';
        tagObj.tagName = tag;

        while (nextNValue(3) != '-->' && i < template.length) {
          tagObj.tagName += next();
        }

        next();
        next();
        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
        return tagObj;
      } // 针对特殊的doctype


      if (nextNValue(9) == '<!DOCTYPE') {
        tagObj.type = 'DOCTYPE';
        tagObj.tagName = tag;

        while (nextNValue(1) != '>' && i < template.length) {
          tagObj.tagName += next();
        }

        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
        return tagObj;
      }
      /**
       * 普通的
       * ========================================
       */
      // 如果是期望归结非文本结点
      else if (tag == '<') {
          // 标记是否处于属性值是字符串包裹中
          var isAttrString = false,
              attrLeftValue = null,
              attrLeftLen = null; // 如果在包裹中或者没有遇到‘>’说明没有结束

          while (isAttrString || currentChar != '>' && i < template.length) {
            tag += next(); // 如果是包裹里面，试探是否即将遇到了结束

            if (isAttrString) {
              var next23Value = nextNValue(attrLeftLen + 1).substring(1);

              if (next23Value == attrLeftValue) {
                isAttrString = false;
              }
            } // 如果在包裹外面，试探是否即将进入包裹
            else {
                var _next23Value = nextNValue(2);

                if (_next23Value == '="' || _next23Value == "='") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 1;
                  isAttrString = true;
                }

                _next23Value = nextNValue(3);

                if (_next23Value == '=\"' || _next23Value == "=\'") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 2;
                  isAttrString = true;
                }
              }
          } // 针对特殊的结束标签


          if (/^<\//.test(tag)) {
            tagObj.tagName = tag.replace(/^<\//, '').replace(/>$/, '');
            tagObj.type = 'endTag';
          } else {
            if (/\/>$/.test(tag)) {
              tagObj.type = 'fullTag';
              tag = tag.replace(/\/>$/, '');
            } else {
              tagObj.type = 'beginTag';
              tag = tag.replace(/>$/, '');
            }

            tag = tag.replace(/^</, '');
            tagObj.tagName = "";
            var _i = 0;

            for (; _i < tag.length; _i++) {
              if (tag[_i] == ' ') break;
              tagObj.tagName += tag[_i];
            }

            var attrString = tag.substring(_i);

            if ($RegExp.blanksReg.test(attrString)) {
              tagObj.attrs = {};
            } else {
              tagObj.attrs = analyseTag(attrString);
            }
          }
        } // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;

            while (nextNValue(1) != '<' && i < template.length) {
              tagObj.tagName += next();
            }

            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
          } // 如果遇到开始script或者style、pre等特殊标签，标记开始获取特殊文本


      if (tagObj.type == 'beginTag') {
        if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
          preIsSpecial = true;
          specialCode = tagObj.tagName;
        }
      } // 如果遇到结束script或者style、pre等特殊标签，标记结束获取特殊文本
      else if (tagObj.type == 'endTag') {
          if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
            preIsSpecial = false;
          }
        }

      next();
      return tagObj;
    };
  } // 分析deep
  // 我们会在这里校对那些没有结束标签的开始标签
  // 这步结束以后，每个都是一个单独的标签
  // 也就是不用再区分开始或闭合了


  function analyseDeep(tagArray) {
    // 闭合标签
    tagArray = closeTag(tagArray);
    var deep = 0,
        tagDeepArray = [];
    tagArray.forEach(function (tag) {
      if (tag.type == 'beginTag') {
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: ++deep,
          __tagType__: "double"
        });
      } else if (tag.type == 'endTag') {
        deep -= 1;
      } else if (tag.type == 'textcode') {
        // 如果是文本
        tagDeepArray.push({
          type: "text",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else if (tag.type == 'comment') {
        // 如果是注释
        tagDeepArray.push({
          type: "comment",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else {
        // 如果是自闭合结点
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: deep + 1,
          __tagType__: "single"
        });
      }
    });
    return tagDeepArray;
  } // 标记所有没有闭合结点的直接自闭合


  var closeTag = function closeTag(tagArray) {
    var needClose = [];
    tagArray.forEach(function (tag, i) {
      if (tag.type == 'beginTag') {
        needClose.push([i, tag.tagName]);
      } else if (tag.type == 'endTag') {
        while (needClose.length > 0) {
          var needCloseTag = needClose.pop();

          if (needCloseTag[1] == tag.tagName) {
            break;
          } else {
            tagArray[needCloseTag[0]].type = 'fullTag';
          }
        }
      }
    });
    return tagArray;
  };
  /*!
   * 🔪 - 解析xhtml为json对象返回
   * https://github.com/hai2007/algorithm.js/blob/master/xhtmlToJson.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2020-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  // 获取一棵DOM树
  // noIgnore为true表示不忽略任何标签


  function xhtmlToJson(template, noIgnore) {
    if (!isString$1(template)) throw new Error("Template must be a String!"); // 获取读取下一个标签对象

    var nextTag = nextTagFun(template.trim());
    var tag = nextTag(),
        DomTree = [];

    while (tag != null) {
      if (tag.type == 'textcode' && $RegExp.blanksReg.test(tag.tagName)) ;else if (tag.type == 'DOCTYPE') ;else if (tag.type == 'comment') {
        // 注释目前也默认过滤掉，除非显示声明不忽略
        if (noIgnore) {
          DomTree.push(tag);
        }
      } else {
        DomTree.push(tag);
      }
      tag = nextTag();
    } // 分析层次


    DomTree = analyseDeep(DomTree);
    /**
     * 模仿浏览器构建的一棵树,每个结点有如下属性：
     *
     * 1.parentNode index  父结点
     * 2.childNodes []     孩子结点
     * 3.preNode    index  前一个兄弟结点
     * 4.nextNode   index  后一个兄弟结点
     *
     * 5.attrs:{}          当前结点的属性
     * 6.name              节点名称
     * 7.type              节点类型（tag和text）
     * 8.content           文本结点内容
     *
     * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
     */

    var presNode = [null],
        preDeep = 0;

    for (var i = 0; i < DomTree.length; i++) {
      // 当前结点
      var currentIndex = i,
          currentDeep = DomTree[i].__deep__;
      DomTree[i].childNodes = [];
      DomTree[i].preNode = null;
      DomTree[i].nextNode = null; // 前置三个结点

      var lastPre = presNode[presNode.length - 1];
      var last2Pre = presNode.length > 1 ? presNode[presNode.length - 2] : null; // 如果遇到的是兄弟结点

      if (currentDeep == preDeep) {
        // 修改兄弟关系
        DomTree[currentIndex].preNode = lastPre;
        DomTree[lastPre].nextNode = currentIndex; // 修改父子关系

        DomTree[currentIndex].parentNode = last2Pre;
        DomTree[last2Pre].childNodes.push(currentIndex); // 校对presNode

        presNode[presNode.length - 1] = currentIndex;
      } // 如果是遇到了孩子
      else if (currentDeep > preDeep) {
          // 修改兄弟关系
          // todo
          // 修改父子关系
          DomTree[currentIndex].parentNode = lastPre;
          if (lastPre != null) DomTree[lastPre].childNodes.push(currentIndex); // 校对presNode

          presNode.push(currentIndex);
        } // 如果是遇到了祖先
        else {
            var preTempIndex = presNode[presNode.length - 1 - (preDeep - currentDeep)];
            var preTemp2Index = presNode[presNode.length - 2 - (preDeep - currentDeep)]; // 修改兄弟关系

            DomTree[currentIndex].preNode = preTempIndex;
            if (preTempIndex != null) DomTree[preTempIndex].nextNode = currentIndex; // 修改父子关系

            DomTree[currentIndex].parentNode = preTemp2Index;
            if (preTemp2Index != null) DomTree[preTemp2Index].childNodes.push(currentIndex); // 校对presNode

            for (var _i2 = 0; _i2 < preDeep - currentDeep; _i2++) {
              presNode.pop();
            }

            presNode[presNode.length - 1] = currentIndex;
          }

      preDeep = currentDeep;
    }

    return DomTree;
  } // 选中当前维护的第index


  function eq(index) {
    if (this.length > index) {
      return this.__new__(this.__DomTree__, [this[index]]);
    } else {
      return this.__new__(this.__DomTree__, []);
    }
  }
  /**
   * 提供结点查找相关方法
   * ---------------------------
   */
  // 查找父亲


  function parent() {
    var pNode = null;

    if (this.length > 0) {
      pNode = this.__DomTree__[this[0]].parentNode;
    }

    return this.__new__(this.__DomTree__, pNode == null ? [] : [pNode]);
  } // 查找祖宗


  function parents() {
    var pNodes = [];

    if (this.length > 0) {
      var pNode = this.__DomTree__[this[0]].parentNode;

      while (pNode != null) {
        pNodes.push(pNode);
        pNode = this.__DomTree__[pNode].parentNode;
      }
    }

    return this.__new__(this.__DomTree__, pNodes);
  } // 查找孩子


  function children() {
    var childNodes = [];

    if (this.length > 0) {
      childNodes = this.__DomTree__[this[0]].childNodes;
    }

    return this.__new__(this.__DomTree__, childNodes);
  } // 查找同胞


  function siblings() {
    var siblingNodes = [];

    if (this.length > 0) {
      siblingNodes = [this[0]]; // 寻找前面的同胞

      var preSibling = this.__DomTree__[this[0]].preNode;

      while (preSibling != null) {
        siblingNodes.unshift(preSibling);
        preSibling = this.__DomTree__[preSibling].preNode;
      } // 寻找后面的同胞


      var nextSibling = this.__DomTree__[this[0]].nextNode;

      while (nextSibling != null) {
        siblingNodes.push(nextSibling);
        nextSibling = this.__DomTree__[nextSibling].nextNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  } // 下一个兄弟


  function next() {
    var siblingNode = [];

    if (this.length > 0) {
      // 寻找后面的第一个同胞
      var nextSibling = this.__DomTree__[this[0]].nextNode;

      if (nextSibling != null) {
        siblingNode.push(nextSibling);
      }
    }

    return this.__new__(this.__DomTree__, siblingNode);
  } // 后续全部兄弟


  function nextAll() {
    var siblingNodes = [];

    if (this.length > 0) {
      // 寻找后面的同胞
      var nextSibling = this.__DomTree__[this[0]].nextNode;

      while (nextSibling != null) {
        siblingNodes.push(nextSibling);
        nextSibling = this.__DomTree__[nextSibling].nextNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  } // 前一个兄弟


  function prev() {
    var siblingNode = [];

    if (this.length > 0) {
      // 寻找前面的第一个同胞
      var preSibling = this.__DomTree__[this[0]].preNode;

      if (preSibling != null) {
        siblingNode.unshift(preSibling);
      }
    }

    return this.__new__(this.__DomTree__, siblingNode);
  } // 前置全部兄弟


  function prevAll() {
    var siblingNodes = [];

    if (this.length > 0) {
      // 寻找前面的同胞
      var preSibling = this.__DomTree__[this[0]].preNode;

      while (preSibling != null) {
        siblingNodes.unshift(preSibling);
        preSibling = this.__DomTree__[preSibling].preNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  }
  /**
   * 判断一个值是不是number。
   *
   * @since V0.1.3
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是number返回true，否则返回false
   */


  function isNumber(value) {
    return typeof value === 'number' || value !== null && _typeof(value) === 'object' && getType(value) === '[object Number]';
  }

  function addItemIndex(item, index) {
    // 孩子结点
    for (var i = 0; i < item.childNodes.length; i++) {
      item.childNodes[i] += index;
    } // 前一个结点


    if (isNumber(item.preNode)) item.preNode += index; // 后一个结点

    if (isNumber(item.nextNode)) item.nextNode += index; // 父亲结点

    if (isNumber(item.parentNode)) item.parentNode += index;
    return item;
  }

  function mountItem(targetItem, sourceItem) {
    // 孩子结点
    targetItem.childNodes = sourceItem.childNodes;

    if (sourceItem.name != 'null-engine-frame') {
      // 如果是结点
      if (sourceItem.type == 'tag') {
        targetItem.name = sourceItem.name;
        targetItem.attrs = sourceItem.attrs;
        targetItem.__tagType__ = sourceItem.__tagType__;

        if (targetItem.type == 'text') {
          delete targetItem.content;
        }
      } // 如果是文本
      else {
          targetItem.content = sourceItem.content;

          if (targetItem.type == 'tag') {
            delete targetItem.attrs;
            delete targetItem.name;
            delete targetItem.__tagType__;
          }
        }

      targetItem.type = sourceItem.type;
    }
  } // 获取对象的模板


  function getTemplate(target) {
    // 如果是文本结点
    if (target[0].type == 'text') return target[0].content;
    /**
     * 为了避免使用递归，我们定义一个计算数组needCalcs来登记已经计算过的结果和待计算的内容
     * 虽然需要频繁插入，可是感觉问题不大，并且数组的话，方便最后模板的获取
     * 
     * 算法思想：来自深度优先遍历树图
     * 
     */

    var needCalcs = [target.__DomTree__[target[0]]],
        index = 0,
        currentNode,
        attrsString,
        needReplace; // 如果还有没有处理的，继续

    while (index < needCalcs.length) {
      // 寻找第一个没有计算的
      do {
        currentNode = needCalcs[index++];
      } while (isString(currentNode));

      if (!currentNode) {
        break;
      }
      /**
       * 对当前面对的进行处理(计算当前模板)
       */
      //  如果是标签


      if (currentNode.type == 'tag') {
        attrsString = ""; // 只有是标签，属性一定存在

        for (var key in currentNode.attrs) {
          attrsString += "".concat(key, "=\"").concat(currentNode.attrs[key], "\" ");
        } // 这种情况稍微麻烦点，需要登记开头和结尾，而且需要插入孩子


        if (currentNode.__tagType__ == 'double') {
          needReplace = []; // 登记开头

          needReplace.push("<".concat(currentNode.name, " ").concat(attrsString, ">")); // 登记孩子

          for (var i = 0; i < currentNode.childNodes.length; i++) {
            needReplace.push(target.__DomTree__[currentNode.childNodes[i]]);
          } // 登记结尾


          needReplace.push("</".concat(currentNode.name, ">"));
          needCalcs.splice.apply(needCalcs, [index - 1, 1].concat(_toConsumableArray(needReplace)));
        } // 如果不是有开始和结束标签的，一定没有孩子
        else {
            needCalcs[index - 1] = "<".concat(currentNode.name, " ").concat(attrsString, "/>");
          }
      } // 如果是文本
      else {
          needCalcs[index - 1] = currentNode.content;
        }
    }

    return needCalcs.join("");
  } // 设置对象模板


  function setTemplate(target, template) {
    var len = target.__DomTree__.length; // 追加维护的数组中

    for (var i = 1; i < template.length; i++) {
      template[i].__deep__ += target.__DomTree__[target[0]].__deep__ - 1;

      target.__DomTree__.push(addItemIndex(template[i], len - 1));
    } // 挂载到结点


    mountItem(target.__DomTree__[target[0]], addItemIndex(template[0], len - 1));
  } // 获取或设置innerHTML


  function innerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!'); // 设置

    if (isString(HTMLtemplate)) {
      setTemplate(this, xhtmlToJson("<null-engine-frame>" + HTMLtemplate + "</null-engine-frame>"));
      return this;
    } // 获取
    else {
        var template = "",
            childNodes = this.children();

        for (var i = 0; i < childNodes.length; i++) {
          template += getTemplate(childNodes.eq(i));
        }

        return template;
      }
  } // 获取或设置outerHTML


  function outerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!'); // 设置

    if (isString(HTMLtemplate)) {
      setTemplate(this, xhtmlToJson(HTMLtemplate));
      return this;
    } // 获取
    else {
        return getTemplate(this);
      }
  } // 属性的获取和设置


  function attr(name, value) {
    if (this.length <= 0) throw new Error('Null pointer!');

    if (arguments.length > 1) {
      this.__DomTree__[this[0]].attrs[name] = value;
      return this;
    } else {
      return this.__DomTree__[this[0]].attrs[name];
    }
  }

  var Engine = function Engine(template, indexs) {
    return new Engine.prototype.init(template, indexs);
  };

  Engine.prototype.init = function (template, indexs) {
    // 维护内置的tree
    this.__DomTree__ = isArray(template) ? template : xhtmlToJson(template); // 记录当前查询到的结点

    if (isArray(indexs)) {
      for (var i = 0; i < indexs.length; i++) {
        this[i] = indexs[i];
      }

      this.length = indexs.length;
    } else {
      this[0] = 0;
      this.length = 1;
    }

    return this;
  };

  Engine.prototype.__new__ = function (template, indexs) {
    return Engine(template, indexs);
  }; // 扩展引擎方法


  Engine.prototype.extend = function (source) {
    for (var key in source) {
      this[key] = source[key];
    }

    return this;
  };

  Engine.prototype.valueOf = function () {
    if (this.length <= 0) {
      return null;
    } else {
      var tag = this.__DomTree__[this[0]];
      return tag.type == 'text' ? tag.content : {
        tagName: tag.name,
        attrs: tag.attrs
      };
    }
  };

  Engine.prototype.toString = function () {
    var str = "[";

    for (var i = 0; i < this.length; i++) {
      var value = Engine(this.__DomTree__, [this[i]]).valueOf();
      str += (isString(value) ? value : JSON.stringify(value)) + ",";
    }

    return str.replace(/,$/, '') + "]";
  };

  Engine.prototype.extend({
    // 结点查找
    parent: parent,
    parents: parents,
    children: children,
    siblings: siblings,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    eq: eq,
    // 属性等基本操作
    innerHTML: innerHTML,
    outerHTML: outerHTML,
    attr: attr
  });
  Engine.prototype.init.prototype = Engine.prototype; // 判断当前环境，如果不是浏览器环境

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = Engine;
  } // 浏览器环境下
  else {
      window.xHtmlEngine = Engine;
    }
})();