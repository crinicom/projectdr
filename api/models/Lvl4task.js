/**
 * Lvl4task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_lvl3: {model: 'lvl3task', required:true},
    text: {type: 'string', required:true},
    status: {type: 'integer'}
  }
};

