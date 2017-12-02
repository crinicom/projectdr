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
    team_members: {
      collection: 'user',
      via: 'projectsTeam'
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
      via: 'pid'
    }
  }
};

