/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_obj: {model: 'objective', required:true},
    text: {type: 'string', required:true},
    lvl1tasks: {collection: 'lvl1task', via:'belongs_to_task'},
    status: {type: 'string', defaultsTo:'Pendiente'},
    //responsible: {model: 'user', required:false},
    responsible: {type: 'string', required:false, defaults_to:'pendiente'}
  }
};

