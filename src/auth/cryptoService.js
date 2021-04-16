var CryptoJS = require("crypto-js");
let SECRET_KEY = require('./secretkey').secretKey;
const SecureStorage = require('secure-web-storage');

var secureStore = new SecureStorage(localStorage, {
    hash: function hash(data) {
        data = CryptoJS.SHA256(data, SECRET_KEY);
        return DataTransferItemList.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString();
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    }
});

module.exports.secureStore = secureStore;