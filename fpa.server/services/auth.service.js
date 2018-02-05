const crypto = require('crypto');

var config ={};

module.exports = {

    setConfig : (cfg) =>{
        config = cfg;
    },

    hashValue: (chiper) => {
        return new Promise((resolve, reject) => {
            try {        
                crypto.pbkdf2(chiper, config.salt, 10000, 512, 'sha512', function (err, dk) {
                    if (err) {
                        throw err;
                    }
                    resolve({
                        pwd:  dk.toString('hex'), 
                        });
                });
            }
            catch (exp) {
                reject(exp);
            }
        });
    }
}

