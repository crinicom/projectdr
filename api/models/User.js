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
    last_name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
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

    retrievepasswordhash: {type: 'string'},

    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      delete obj.passw;
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
    if(!values.passw || values.passw != values.confirmation) {
      return next({err: ["password mismatch"]});
    }
    require('bcrypt').hash(values.passw, 10, function passwordEncrypted(err, encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  },

  beforeUpdate: function (values, next) {
    console.log("ingreso a validacion beforeUpdate");
    console.log("values.updatepass: ", values.updatepass);
    if(values.updatepass) {
        console.log("ingreso a updatepass");
      if(!values.passw || values.passw != values.confirmation) {
        return next({err: ["password mismatch"]});
      }
      require('bcrypt').hash(values.passw, 10, function passwordEncrypted(err, encryptedPassword){
        if (err) return next(err);
        values.encryptedPassword = encryptedPassword;
        console.log(values.encryptedPassword);
        next();
      });
  }
  else {
    console.log("fuera de updatepass");
    next(); 
    }
  },
};

