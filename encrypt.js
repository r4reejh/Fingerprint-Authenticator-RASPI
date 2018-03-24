const CryptoJS = require("crypto-js");
 
// Encrypt 
const ciphertext = CryptoJS.AES.encrypt('15BIT0291', 'ALPHABETAGAMMAeobnVIKSLNC;-H24IG9-359T0-8T9I4646S5DF6');
console.log(ciphertext.toString());
// Decrypt 
const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'ALPHABETAGAMMA');
const plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);