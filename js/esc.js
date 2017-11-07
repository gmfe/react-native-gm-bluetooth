const _ = require('lodash');
const Util = require('./util');

const Common = {
    INIT: "1B 40",//初始化
    
    ALIGN_LEFT: "1B 61 00",//左对齐
    ALIGN_RIGHT: "1B 61 02",//居右对齐
    ALIGN_CENTER: "1B 61 01",//居中对齐
    
    UNDER_LINE: "1C 2D 01",//下划线
    
    PRINT_AND_NEW_LINE: "0A",//打印并换行
    
    FONT_SMALL: "1B 4D 01",//小号字体 9x17
    FONT_NORMAL: "1B 4D 00",//正常 12x24
    FONT_BOLD: "1B 45 01",//粗体
    
    FONT_HEIGHT_TIMES: '1B 21 10',
    FONT_WIDTH_TIMES: '1B 21 20',
    FONT_HEIGHT_WIDTH_TIMES: '1B 21 30',
    
    SOUND: "1B 42 02 02" // 蜂鸣 2次/100ms
};

const Config = {
    wordNumber: 48 // 可打印的字数，对应80mm纸张
};

let writeTextToDevice, writeHexToDevice;

function _setBT(bt) {
    writeTextToDevice = bt.writeTextToDevice;
    writeHexToDevice = bt.writeHexToDevice;
}

function setConfig(config) {
    Object.assign(Config, config);
}

function leftRight(left, right, wordNumber = Config.wordNumber) {
    return left + Util.getSpace(wordNumber - Util.getWordsLength(left) - Util.getWordsLength(right)) + right;
}

function keyValue(name, value, wordNumber = Config.wordNumber) {
    const nameLen = Util.getWordsLength(name);
    let vArr = [], temp = '';
    _.each(value, (v, i) => {
        const tvLen = Util.getWordsLength(temp + v);
        const diff = tvLen - (wordNumber - nameLen);
        if (diff <= 0) {
            temp += v;
            if (i === value.length - 1) {
                vArr.push(temp);
            }
        } else {
            if (Util.isChinese(v) && diff === 1) {
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
            return Util.getSpace(name.length) + v;
        }
    }).join('');
}

const ESC = {
    Common,
    Util: {
        leftRight,
        keyValue,
    },
    _setBT,
    setConfig,
    
    init(){
        writeHexToDevice(Common.INIT);
    },
    printAndNewLine(){
        writeHexToDevice(Common.PRINT_AND_NEW_LINE);
    },
    alignLeft(){
        writeHexToDevice(Common.ALIGN_LEFT);
    },
    alignCenter(){
        writeHexToDevice(Common.ALIGN_CENTER);
    },
    alignRight(){
        writeHexToDevice(Common.ALIGN_RIGHT);
    },
    
    underline(){
        writeHexToDevice(Common.UNDER_LINE);
    },
    
    fontSmall(){
        writeHexToDevice(Common.FONT_SMALL);
    },
    fontNormal(){
        writeHexToDevice(Common.FONT_NORMAL);
    },
    fontBold(){
        writeHexToDevice(Common.FONT_BOLD);
    },
    
    fontHeightTimes(){
        writeHexToDevice(Common.FONT_HEIGHT_TIMES);
    },
    fontHeightTimes(){
        writeHexToDevice(Common.FONT_WIDTH_TIMES);
    },
    fontHeightTimes(){
        writeHexToDevice(Common.FONT_HEIGHT_WIDTH_TIMES);
    },
    
    text(str){
        writeTextToDevice(str)
    },
    
    sound(){
        writeHexToDevice(Common.SOUND);
    }
};

module.exports = ESC;