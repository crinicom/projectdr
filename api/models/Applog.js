/**
 * Applog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {type: 'string' },
    date: {type: 'date'},
    project: {type: 'string'},
    module: {type: 'string'},
    item: {type: 'string'},
    detail: {type: 'string'}
  }
};

