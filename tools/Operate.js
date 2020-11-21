import { getTemplate, setTemplate } from './_template';
import isString from '@yelloxing/core.js/isString';
import xhtmlToJson from '@hai2007/algorithm/xhtmlToJson.js';

// 获取或设置innerHTML
export function innerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!');

    // 设置
    if (isString(HTMLtemplate)) {

        setTemplate(this, xhtmlToJson("<null-engine-frame>" + HTMLtemplate + "</null-engine-frame>"));
        return this;
    }

    // 获取
    else {
        let template = "", childNodes = this.children();
        for (let i = 0; i < childNodes.length; i++) {
            template += getTemplate(childNodes.eq(i));
        }
        return template;
    }
};

// 获取或设置outerHTML
export function outerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!');

    // 设置
    if (isString(HTMLtemplate)) {
        setTemplate(this, xhtmlToJson(HTMLtemplate));
        return this;
    }

    // 获取
    else {
        return getTemplate(this);
    }
};

// 属性的获取和设置
export function attr(name, value) {
    if (this.length <= 0) throw new Error('Null pointer!');

    if (arguments.length > 1) {
        this.__DomTree__[this[0]].attrs[name] = value;
        return this;
    } else {
        return this.__DomTree__[this[0]].attrs[name];
    }
};