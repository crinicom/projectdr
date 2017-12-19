/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	'new': function(req, res) {
/* solo para Ep13
        var oldDateObj = new Date();
        var newDateObj = new Date(oldDateObj.getTime() + 60000);

        req.session.cookie.expires = newDateObj;
        
        req.session.authenticated = true;
        console.log(req.session); */
        res.view('session/new');    
    },
    create: function (req, res, next) {
        if (!req.param('email') || !req.param('password')) {
            var userPassRequiredError = [{name: 'userPassRequiredError', message: 'must provide both user and pass'}];

            req.session.flash = {
                err: userPassRequiredError
            }
            res.redirect('/session/new');
            return;
        }

        User.findOneByEmail(req.param('email'), function foundUser(err, user) {
            if (err) return next(err);

            // si no encuentra el usuario
            if (!user) {
                var noAccountError = [{name: 'noAccountError', message: 'no user found: ' + req.param('email')}];
                req.session.flash = {
                    err: noAccountError
                }
                res.redirect('/session/new');
                return;
            }

            // si lo encuentra, compara pass

            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
                if (err) return next(err);
                // si la pass no coincide
                if (!valid) {
                    var userPassMismatchError = [{name: 'userPassMismatchError', message: 'passwords mismatch'}];

                    req.session.flash = {
                        err: userPassMismatchError
                    }
                    res.redirect('/session/new');
                    return;
                }

                //si todo lo anterior está OK significa que existe usuario y coincide la pass
                req.session.authenticated =true;
                req.session.User = user;

                res.redirect('/user/show/'+user.id);
            });
        });

    },
    destroy: function(req,res,next) {
        req.session.destroy();
        res.redirect('/session/new');
    }
};

