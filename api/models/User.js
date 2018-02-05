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
    admin: {
      type:'boolean',
      defaultsTo: false
    },
    encryptedPassword: {
      type: 'string'
    },

    online: {
      type: 'boolean',
      defaultsTo: false
    },
    
    projects: {
      collection: 'project',
      via: 'owner' 
    },
    participates: {
      collection: 'project',
      via: 'team'
    },
    projectsGuest: {
      collection: 'project',
      via: 'guests'
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      delete obj.password;
      delete obj.confirmation;
      delete obj._csrf;
      return obj;

    }


  },

  beforeValidate: function(values, next) {
    console.log(values);
    if (typeof values.admin !== 'undefined') {
      if( values.admin === "unchecked") {
        values.admin = false;
      } else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

  beforeCreate: function (values, next) {
    if(!values.password || values.password != values.confirmation) {
      return next({err: ["password mismatch"]});
    }
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

