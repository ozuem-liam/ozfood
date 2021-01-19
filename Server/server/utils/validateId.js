/**
 * Converts request Id to integer
 * @export
 * @param {string} id
 * @returns {string} converted Id
 */

 module.exports = {
      validate(id) {
     const convertedId = parseInt(id, 10);
     return convertedId;
 }
};