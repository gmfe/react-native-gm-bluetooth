const _ = require('underscore');

const Common = {
    INIT: "1B 40",//初始化
    ALIGN_LEFT: "1B 61 00",//左对齐
    ALIGN_RIGHT: "1B 61 02",//居右对齐
    ALIGN_CENTER: "1B 61 01",//居中对齐
    OUT_PAPER: "0C",//页出纸
    UNDER_LINE: "1C 2D 01",//下划线
    NEW_LINE: "0A",//换行
    HEIGHT_LINE: "1B 33 16",//行间距
    HEIGHT_LINE_57MM: "1B 33 2d",//行间距
    SMALL_FONT: "1B 4D 01",//小号字体
    NORMAL_FONT: "1B 4D 00",//正常
    BOLD_FONT: "1B 45 01"//粗体
};

const Config = {
    wordNumber: 48
};

const reg = /[\u4e00-\u9fa5]/;

function isChinese(word) {
    return reg.test(word);
}

function getWordLength(word) {
    return isChinese(word) ? 2 : 1;
}

function getWordsLength(words) {
    return _.reduce(words, (m, v) => m + getWordLength(v), 0);
}

function getSpace(len) {
    return _.times(len, () => ' ').join('');
}

function setConfig(config) {
    Object.assign(Config, config);
}

function leftRight(left, right, wordNumber) {
    return left + getSpace(wordNumber - getWordsLength(left) + getWordsLength(right)) + right;
}

function keyValue(name, value, wordNumber) {
    const nameLen = getWordsLength(name);
    let vArr = [], temp = '';
    _.each(value, (v, i) => {
        const tvLen = getWordsLength(temp + v);
        const diff = tvLen - (wordNumber - nameLen);
        if (diff <= 0) {
            temp += v;
            if (i === value.length - 1) {
                vArr.push(temp);
            }
        } else {
            if (isChinese(v) && diff === 1) {
                temp += ' ';
            }
            vArr.push(temp);
            temp = v;
        }
    });
    return _.map(vArr, (v, i) => {
        if (i === 0) {
            return name + v;
        } else {
            return getSpace(name.length) + v;
        }
    }).join('');
}

module.exports = {
    Common,
    setConfig,
    leftRight,
    keyValue
};