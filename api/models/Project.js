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
    description: {
      type:"text",
      required: true
    },
    scope: {
      type:"text",
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    team_members: {
      collection: 'user',
      via: 'projects_team'
    },
    guests: {
      collection: 'user',
      via: 'projects_guest'
    }
  }
};

