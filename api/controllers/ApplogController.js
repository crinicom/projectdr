/**
 * ApplogController
 *
 * @description :: Server-side logic for managing Applogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next) {
        Applog.find(function foundLog(err, applogs) {
            if (err) return next(err);
        
            //res.json(users[1].name);
            res.view({applogs:applogs});
    
        });  
    },
};

