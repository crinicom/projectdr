/**
 * Objective.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    belongs_to_project: { model: 'project', required: true},
    description: { type: 'string', required:true},
    formula: { type: 'string', required:true},
    goal: { type: 'string', required:true},
    tasks: {collection: 'task', via: 'objid'}
  }
};

