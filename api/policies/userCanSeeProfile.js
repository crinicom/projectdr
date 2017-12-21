module.exports = function(req, res, ok) {
    var sessionUserMatchesId = req.session.User.id == req.param('id');
    var isAdmin = req.session.User.admin;
    console.log("entre a policy Usercanseeprofile");
    if(!(sessionUserMatchesId || isAdmin)) {
        console.log("variables: ",sessionUserMatchesId, isAdmin);
        var noRightsError = [{name: 'noRightsError', meesage: 'Must be admin, sorry!'}];
        req.session.flash = {
            err: noRightsError
        }
        res.redirect('/session/new');
        return;
    }
    console.log("pasó el match");
    ok();
};