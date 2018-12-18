const engine = require('php-parser');

module.exports = new engine({
    parser: {
      php7: true
    },
    ast: {
      withPositions: true
    }
  });