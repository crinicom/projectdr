module.exports.SetState = function(obj = {}) {
    Project.findOne(obj.id, function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        
        project.status[obj.key] = obj.state;

        project.save(function(err){
            if (err) {
                return err;
            } else {
                console.log( '\n savestate key ', obj.key,'\n');
                console.log( '\n savestate state ',obj.state,'\n');
                console.log( '\n savestate status', project.status,'\n');
            }
        });
          return "ok SetState: "+obj;
        //res.json({status});

    }); 
};