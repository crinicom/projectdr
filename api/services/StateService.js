module.exports.SetState = function(obj = {}) {
    // console.log("obj en setstate antes del set: ", obj);
    Project.findOne(obj.id, function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        
        project.status[0][obj.key] = obj.state;
        // console.log("status en setstate, despues del set: ", project.status);
        project.save(function(err){
            if (err) {
                return err;
            } else {
                // console.log( '\n savestate key ', obj.key,'\n');
                // console.log( '\n savestate state ',obj.state,'\n');
                // console.log( '\n savestate status', project.status,'\n');
            }
        });
          return "ok SetState: "+obj;
        //res.json({status});

    }); 
};