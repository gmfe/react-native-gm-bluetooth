const ReactNative = require('react-native');
const {Buffer} = require('buffer');
const {NativeModules, DeviceEventEmitter, Platform} = ReactNative;
const TSC = require('./js/tsc');
const ESC = require('./js/esc');
const Util = require('./js/util');

let GMBluetooth = NativeModules.GMBluetooth;
if(Platform.OS === 'ios'){
    GMBluetooth = NativeModules.BluetoothSerial;
}

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
GMBluetooth.on = (eventName, handler) => {
    DeviceEventEmitter.addListener(eventName, handler)
};

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
GMBluetooth.removeListener = (eventName, handler) => {
    DeviceEventEmitter.removeListener(eventName, handler)
};

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
GMBluetooth.write = (data) => {
    if (typeof data === 'string') {
        data = new Buffer(data)
    }
    return GMBluetooth.writeToDevice(data.toString('base64'))
};

GMBluetooth.TSC = TSC;
GMBluetooth.ESC = ESC;
GMBluetooth.Util = Util;

ESC._setBT(GMBluetooth);
TSC._setBT(GMBluetooth);

module.exports = GMBluetooth;
