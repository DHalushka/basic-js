const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};

  domains.forEach(domain => {
    const domenParts = domain.split('.').reverse();
    let currentSegment = '';

    domenParts.forEach(part => {
      currentSegment += `.${part}`;
      if (!result[currentSegment]) {
        result[currentSegment] = 0;
      }
      result[currentSegment]++;
    });
  });
  return result;
}


module.exports = {
  getDNSStats
};
