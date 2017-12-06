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
    mails: {collection: 'mail', via:'stk'},
    status: {type: 'integer'},
    assoc_task: {type: 'string'}
  }
};

