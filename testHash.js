const crypto = require('crypto');

const hash = crypto.createHash('sha256');

const password = 'password';
hash.update( password );
const codedPassword = hash.digest('hex');

console.log('Coded password: ' + codedPassword);