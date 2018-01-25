/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    text: {type: 'string', required:true},
    belongs_to_project: { model: 'project', required:true},
    belongs_to: {type: 'string', required:true},
      section: {type: 'string', required:true},
      item: {type: 'integer', required:true},
      user: {model: 'user', required:false},
      user_name: {type: 'string', required:false},
      date: {type: 'date', required:false},
      status: {type: 'integer'}
  }
};

