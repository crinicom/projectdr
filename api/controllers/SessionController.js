/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res) {

        var oldDateObj = new Date();
        var newDateObj = new Date(oldDateObj.getTime() + 60000);

        req.session.cookie.expires = newDateObj;
        
        req.session.authenticated = true;
        console.log(req.session);
        res.view('session/new');    
    } 
};

