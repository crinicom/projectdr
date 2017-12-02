/**
 * Lvl3task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_lvl2: {modelo: 'lvl2task', required:true},
    text: {type: 'string', required:true},
    lvl1tastks: {collection: 'lvl4task', via:'belongs_to_lvl3'},
    status: {type: 'integer'}
  }
};

