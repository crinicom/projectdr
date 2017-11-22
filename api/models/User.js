/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true
    },
    state: {
      type: 'string'
    },

    //conecto con proyectos
    projects_own: {
      collection: 'project',
      via: 'owner' 
    },
    projects_team: {
      collection: 'project',
      via: 'team_members'
    },
    projects_guest: {
      collection: 'project',
      via: 'guests'
    }


  }
};

