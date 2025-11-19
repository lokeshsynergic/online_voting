require('dotenv').config(); // load env
const crypto = require("crypto");  

const ENC_KEY = 123;  //

function smallEncrypt(text, key = ENC_KEY) {
    const buffer = Buffer.from(text.toString(), 'utf8');
    const encrypted = buffer.map(byte => byte ^ key);
    return encrypted.toString('base64');
}

function smallDecrypt(encText, key = ENC_KEY) {
    const buffer = Buffer.from(encText, 'base64');
    const decrypted = buffer.map(byte => byte ^ key);
    return decrypted.toString('utf8');
}

const AES_KEY = process.env.ANS_KEY;  // 32 bytes
const AES_IV = process.env.ANS_IV;    // 16 bytes


function encrypt(text) {
    const cipher = crypto.createCipheriv("aes-256-cbc", AES_KEY, AES_IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

function decrypt(encText) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", AES_KEY, AES_IV);
    let decrypted = decipher.update(encText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { smallEncrypt, smallDecrypt, encrypt, decrypt };