const _ = require('lodash');
const Util = require('./util');

let writeTextToDevice;

function _setBT(bt) {
    writeTextToDevice = bt.writeTextToDevice;
}

let Config = {
    width: 60,
    height: 40,
    gap: 2,
    direction: 0,
    referenceX: 30,
    referenceY: 30
};

const TSC = {
    _setBT,
    config(con){
        Object.assign(Config, con);
    },
    size(width, height){
        writeTextToDevice(`SIZE ${width} mm, ${height} mm\r\n`);
    },
    gap(g){
        writeTextToDevice(`GAP ${g} mm\r\n`);
    },
    direction(dir = 0){
        writeTextToDevice(`DIRECTION ${dir}\r\n`);
    },
    reference(x = 0, y = 0){
        writeTextToDevice(`REFERENCE ${x},${y}\r\n`);
    },
    cls(){
        writeTextToDevice(`CLS \r\n`);
    },
    
    init(){
        TSC.size(Config.width, Config.height);
        TSC.gap(Config.gap);
        TSC.direction(Config.direction);
        TSC.reference(Config.referenceX, Config.referenceY);
        TSC.cls();
    },
    
    text(x, y, text, x_times = 1, y_times = 1){
        writeTextToDevice(`TEXT ${x},${y},"TSS24.BF2", 0,${x_times},${y_times},"${text}"`)
    },
    print(times = 1){
        writeTextToDevice(`PRINT ${times}\r\n`);
    },
    sound(times = 2, time = 100){
        writeTextToDevice(`SOUND ${times},${time}\r\n`);
    },
    drawBox(x_start,y_start,x_end,y_end,line_thickness){
        writeTextToDevice(`BOX ${x_start},${y_start},${x_end},${y_end},${line_thickness}\r\n`);
    },
    drawBar(x,y,width,height){
        writeTextToDevice(`BAR ${x},${y},${width},${height}\r\n`);
    },
    drawQrcode(x,y,ecc_level,cell_width,mode,rotation,qrcode_content){
        writeTextToDevice(`QRCODE ${x},${y},${ecc_level},${cell_width},${mode},${rotation},"${qrcode_content},"\r\n`)
    }
}

module.exports = TSC;