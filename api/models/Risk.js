/**
 * Risk.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_project: {model: 'project', required:true},
    description: {type: 'string', required:true},
    impact: {type: 'string', required:false},
    mitigation: {type: 'string', required:false},
    status: {type: 'string', defaultsTo:'Pendiente'},
    assoc_stakeholder: {type: 'string'},
    responsible: {model: 'user', required:false}
  }
};

