import CryptoJS from "crypto-js";

// - encrypt data
const encrypt = (text, key) => {
  const secretKey = CryptoJS.enc.Latin1.parse(key);
  const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
    mode: CryptoJS.mode.ECB
  });

  return encrypted.toString();
};

// - decrypt data
const decrypt = (encryptData, key) => {
  const secretKey = CryptoJS.enc.Latin1.parse(key);
  const decrypted = CryptoJS.AES.decrypt(encryptData, secretKey, {
    mode: CryptoJS.mode.ECB
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const aesCryptoJs = {
  encrypt,
  decrypt
};

export default aesCryptoJs;
