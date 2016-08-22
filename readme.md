# Cryptbird

Cryptbird is a thin wrapper around [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs) which provides BlueBird promisified versions of all bcrypt-nodejs's async methods.

Using Bluebird's `promisifyAll()` method to promisify all methods in bcrypt-nodejs does not work. This library manually promisifies all of the async functions and passes through both the synchronous functions and the original async functions from bcrypt-nodejs so developers can incrementally migrate their codebase without having to depend on both this package and bcrypt-nodejs. New Bluebird-promisified methods are provided as `<methodName>Async`. The original methods retain their original names. This package is a drop-in replacement for bcrypt-nodejs.

## API

In addition to the [original bcrypt-nodejs API](https://github.com/shaneGirish/bcrypt-nodejs#api), this package exposes three methods:

* `genSaltAsync(rounds)`- Generates a salt processed `<rounds>` rounds. Default rounds value is 10. Promise is resolved with the generated salt.
* `hashAsync(data, salt)`- Hashes `<data>` with `<salt>`. Promise is resolved with the hashed and salted data.
* `compareAsync(value, encryptedValue)`- Compares the raw `<value>` against the `<encryptedValue>`. Promise is resolved with `true` if the value is a match or `false` if not.


## Example usage

### Require the package

```
var cryptbird = require('cryptbird');
```

### Generate a salt and encrypt a password

```
return cryptbird.genSaltAsync().then(function(generatedSalt) {
    return cryptbird.hashAsync(password, salt);
  }).then(function(hashedPassword) {
    // Store salted password in a database or your preferred persistent storage
  });
```

### Check a password against the salted hashed stored value

```
// User enters password into a form. You have assigned that to the variable password.
// You pull the user's hashed password out of persisten storage and assign to the variable hashedPassword.
return cryptbird.compareAsync(password, hashedPassword).then(function(passwordMatches) {
  if (passwordMatches) {
    // The user's password matched. Do whatever your app needs to do to log the user in.
  } else {
    // The user's password did not match. Let the user know and keep them logged out.
  }
});
```

## License

This package is provded under MIT license. Read the LICENSE file for details.
