/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true
    },
    pswd: {
      type: 'string'
    },
    
    projects: {
      collection: 'project',
      via: 'owner' 
    },
    projectsTeam: {
      collection: 'project',
      via: 'team_members'
    },
    projectsGuest: {
      collection: 'project',
      via: 'guests'
    },
/*
    toJSON: function () {
      var obj = this.toObject();
      delete obj.pswd;
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;

    }
*/

  }
};

