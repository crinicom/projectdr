/**
 * Stakeholder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_project: {model: 'project', required:true},
    name: {type: 'string', required:true},
    comm_plan: {type: 'string', required:true},
    //mails: {collection: 'mail', via:'stk'},
    mails: {type: "array"},
    status: {type: 'string', defaultsTo:'Pendiente'},
    assoc_task: {model: 'task', via: 'id'},
    responsible: {type: 'string'}
  }
};

