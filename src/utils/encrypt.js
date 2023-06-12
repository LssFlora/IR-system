import CryptoJS from 'crypto-js';

export default function encrypt(plaintext) {
    if (!plaintext) {
        return '';
    }
    const key = CryptoJS.enc.Utf8.parse('0123456789abcdef');
    const iv = CryptoJS.enc.Utf8.parse('abcdef0123456789');
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC
    });
    return encrypted.toString();
}