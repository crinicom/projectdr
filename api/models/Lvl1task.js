/**
 * Lvl1task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_task: {model: 'task', required:true},
    text: {type: 'string', required:true},
    lvl2tasks: {collection: 'lvl2task', via:'belongs_to_lvl1'},
    status: {type: 'integer'}
  }
};

