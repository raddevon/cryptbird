var bcrypt = require('bcrypt-nodejs');
var BluePromise = require('bluebird');

module.exports = {
  genSaltAsync: function(rounds) {
    return new BluePromise(function(resolve, reject) {
      bcrypt.genSalt(rounds, function(error, generatedSalt) {
        if (error) {
          reject(error);
        }
        resolve(generatedSalt);
      });
    });
  },
  hashAsync: function(data, salt) {
    return new BluePromise(function(resolve, reject) {
      bcrypt.hash(data, salt, noop, function(error, hashedValue) {
        if (error) {
          reject(error);
        }
        resolve(hashedValue);
      });
    });
  },
  compareAsync: function(value, encryptedValue) {
    return new BluePromise(function(resolve, reject) {
      bcrypt.compare(value, encryptedValue, function(error, valueMatches) {
        if (error) {
          reject(error);
        }
        resolve(valueMatches);
      });
    });
  },

  // bcrypt-nodejs synchronous functions are exposed unmodified
  genSaltSync: bcrypt.genSaltSync,
  hashSync: bcrypt.hashSync,
  compareSync: bcrypt.compareSync,
  getRounds: bcrypt.getRounds,

  // Original async functions are exposed unmodified so developers can use this package
  // across their codebase as they incrementally migrate to Bluebird promises.
  genSalt: bcrypt.genSalt,
  hash: bcrypt.hash,
  compare: bcrypt.compare
};

function noop() {
  return;
}
