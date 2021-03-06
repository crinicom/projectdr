/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type:"string",
      required: true
    },
    sponsors: {
      type:"array",
      required: false
    },
    description: {
      type:"text",
      required: true
    },
    scope: {
      type:"text",
      required: false
    },
    owner: {
      model: 'user',
      required: true
    },
    team: {
      collection: 'user',
      via: 'participates'
    },
    guests: {
      collection: 'user',
      via: 'projectsGuest'
    },
    objectives: {
      collection: 'objective',
      via: 'belongs_to_project'
    },
    milestones: {
      collection: 'milestone',
      via: 'belongs_to_project'
    },
    stakeholders: {
      collection: 'stakeholder',
      via: 'belongs_to_project'
    },
    risks: {
      collection: 'risk',
      via: 'belongs_to_project'
    },
    edt_in_progress: {
      type: 'string',
      enum: ['no', 'wip', 'finished'],
      default: 'no'
    },
    advance: {type: 'integer', defaultsTo: 0},
    status: {
      type: 'json'
      //default: [{ "pcharter":"no", "edt":"no", "stakeholders": "no", "risks": "no", "gantt": "no", "work": 0}]
      },
      url: {type: 'string'}
    
  }
};

