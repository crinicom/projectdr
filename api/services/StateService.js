//var Promise = require('bluebird');

module.exports.SetState = function(ref_id = 0, states=[], callback, flow=1) {
    // console.log("obj en setstate antes del set: ", obj);
    if(flow==1) {
        console.log(states);
        var pro = Project.findOne({id:ref_id}, function foundProject(err, project) {
            if (err) return next(err);
            if (!project) return next();
            console.log(project);
            
            console.log(states);

            for(var i=0;i < states.length; i++) {
                console.log("onestate ", states[i].key, " ", states[i].state);
                project.status[states[i].key]=states[i].state;
            }
                    
            // Project.update({id: ref_id},{status: project.status}).exec(function afterwards(err, updated){
            //    if (err) return;
            project.save(function(err, savedProject){
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    console.log("antes de salir del SAVE");
                    callback();
                }
            });
                        
            
            });
        }
        // nuevo flujo de set state, donde miro los listados cada vez para definir los estados
        else {
            Project
            .findOne({id:ref_id})
            .populateAll()      
            .then(function (project){
                var objectives = Objective.find({
                    "belongs_to_project": project.id
                })
                .populate('tasks')
                .then(function (objectives){
                    return objectives;
                });
                var stakeholders = Stakeholder.find({
                    "belongs_to_project": project.id
                })
                .then(function (stakeholders){
                    return stakeholders;
                });
                var comments = Comment.find({ "belongs_to_project": project.id, belongs_to:'gantt'})
                .then (function(comm) { return comm;});
                //var comments = comm.reverse();  
                
                var risks = Risk.find({
                  "belongs_to_project": project.id
              });
               //var team = User.find(project.team).then(function(team) {return team;});
              
                    return [project, objectives, stakeholders, risks,comments];
            })
            .spread(function (project, objectives, stakeholders, risks,comments){
                
                project = project.toObject(); // <- HERE IS THE CHANGE!
                project.objectives = objectives; // It will work now
                project.stakeholders = stakeholders;
                project.risks = risks;
                var comments = comments.reverse();
                //res.json(project);

                
                var states = [ 
                    {key: "sharedfolder", state: "no"},
                    {key: "pcharter", state: "no"},
                    {key: "edt", state: "no"},
                    {key: "stakeholders", state: "no"},
                    {key: "risks", state: "no"},
                    {key: "gantt", state: "no"}
                     ];
                
                //Determino status de url
                console.log("URL ",project.url);
                
                 if(project.url.length >0) {
                     states[0].state = 1;
                    } else states[0].state = 0;

                //DETERMINO ESTADO DE PCHARTER
                var pcharter_ok = 1;
                if(project.objectives.length == 0) {
                    pcharter_ok = pcharter_ok*0;
                }
                //states[0].state = pcharter_ok;
                states[1].state = pcharter_ok;  
                console.log("seteo bool", states[1].state);

                //DETERMINO ESTADO DE LA EDT
                var edt_ok = 1;
                for (var i = 0; i < project.objectives.length; i++) {
                    if (project.objectives[i].tasks.length == 0) {
                        edt_ok = edt_ok*0;
                    }
                }
                states[2].state = edt_ok;

                //DETERMINO ESTADO DE STAKEHOLDERS
                var stk_ok = 1;
                if(project.stakeholders.length == 0) {
                    stk_ok = stk_ok*0;
                }
                states[3].state = stk_ok;
                //EVALUO QUE CADA STK TENGA POR LO MENOS UN RIESGO
                var risk_ok =1;
                
                function hayRiesgoAsociado(curr,idx, array) {
                    stat = stat*project.risks.some(x => x.assoc_stakeholder == curr.id+0);
                    return stat;
                }
                var stat = true;
                var resultado = project.stakeholders.map(hayRiesgoAsociado);
                 risk_ok = resultado.every(x => x != 0); 
                
                 states[4].state = risk_ok;
                // GANTT
                // calculo solo si vale la pena! o sea si RISK = ok
                var gantt_ok = 0;
                 
                if(risk_ok) {
                    var tasks =[];
                    _.each(project.objectives, function(objective) {
                        _.each(objective.tasks, function(task) {
                            tasks.push(task);
                        });
                    });
                    var comms = [];
                    _.each(stakeholders, function(stk) {
                        if(stk.comm_plan) {comms.push(stk.comm_plan) }
                    });
                    console.log(comms);
        
                    var mitigations = [];
                    _.each(risks, function(risk) {
                        if(risk.mitigation) {mitigations.push(risk.mitigation) }
                    });
                    console.log(mitigations);
                    var task_advance = 
                    (
                        tasks.filter(function Advance(task) { return (task.status == "En proceso" )}).length * 50  +
                        tasks.filter(function Advance(task) { return (task.status == "Finalizada" )}).length * 100)
                        / tasks.length*100;
                    console.log("task advance: " + task_advance);

                        var stk_advance = 
                            (
                                stakeholders.filter(function Advance(stk) { return (stk.status == "En proceso" )}).length * 50  +
                                stakeholders.filter(function Advance(stk) { return (stk.status == "Finalizada" )}).length * 100)
                                / comms.length*100;
                        console.log("comms advance: " + stk_advance);
            //  
                        var risk_advance = 
                            (
                                risks.filter(function Advance(risk) { return (risk.status == "En proceso" )}).length * 50  +
                                risks.filter(function Advance(risk) { return (risk.status == "Finalizada" )}).length * 100)
                                / mitigations.length*100;
                        console.log("mitigations advance: " + risk_advance);

                        var advance = ((
                            tasks.filter(function Advance(task) { return (task.status == "En proceso" )}).length * 50  +
                            tasks.filter(function Advance(task) { return (task.status == "Finalizada" )}).length * 100 +
                            stakeholders.filter(function Advance(stk) { return (stk.status == "En proceso" )}).length * 50  +
                            stakeholders.filter(function Advance(stk) { return (stk.status == "Finalizada" )}).length * 100 +
                            risks.filter(function Advance(risk) { return (risk.status == "En proceso" )}).length * 50  +
                            risks.filter(function Advance(risk) { return (risk.status == "Finalizada" )}).length * 100

                        ) / (tasks.length*100 + comms.length*100 + mitigations.length*100))*100;
                        console.log("General advance: " + parseInt(advance,10) + typeof parseInt(advance,10));
                    //FIN calculo de avance

                    advance = parseInt(advance,10);
                    if (advance >= 90) {
                        console.log("es mayor a 90: ", advance);
                        gantt_ok = 1;
                    } 
                    console.log("NO es mayor a 90: ", advance);
                }
                states[5].state = gantt_ok;

               



                //DETERMINO ESTADOS A PARTIR DE VALORES ANTERIORES
                /*
                Como en cualquier momento se le puede ocurrir a alguien borrar algo que estaba antes tengo 
                que pensar bien la logica de esto. Además si voy de adelante hacia atrás pcha->gantt el estado
                "finished" de una etapa me habilita el "wip" de la siguiente, pero si la siguiente ya está en
                "finished" no debiera hacerla retroceder.
                ENTONCES la única lógica posible es el análisis retrógrado desde GANTT->pcha
                datos de la causa: 
                    cualquier estado anterior en estado "NO" hace los posteriores "NO"
                    cualquier estado "OK" hace el siguiente "WIP", siempre que no estuviera OK
                    los extremos son conocidos: 
                        pcharter está
                            wip por defecto al inicio, y objectives=0
                            ok si objectives!=0
                        gantt està 
                            1) ok si el % llega a un 90% Y risk ok 
                            2) wip si risk está ok Y gantt no 1) 
                    el estado de las etapas intermedias depende de
                        condicione propias de la etapa 
                        condicion de la etapa anterior
                            ANTER | ETAPA | RESULTADO
                            ok      ok          ok
                            ok      no          wip
                            no      xx          NO
                            wip     xx         NO
                        ENTONCES: MI estado sólo es válido si la etapa anterior es 1 (yo*anterior)
                        ALGORITMO:
                            calculo mi estado
                            calculo anterior
                                mi estado = mi estado * anterior

                */

                
                // primera pasada, todo lo que está OK a FINISHED, sino a NO
                
                for(var i=0;i < states.length; i++) {
                    
                    
                    if(states[i].state) {
                        states[i].state = "finished";
                    } else {
                        states[i].state = "no";
                    }
                    //console.log("ESTADO: ", states[i].key, " ", states[i].state);
                    
                    //guardo el estado en el objeto proyecto
                   
                }
                console.log("primera pasada:", states);
                
                // segunda pasada, calculo el estado más complejo que es WIP, y preparo para guardar en el objeto
                if(states[1].state=="no") {states[1].state = "wip";}
                

                for(var i=2;i < states.length; i++) {
                    //console.log("ESTADO: ", states[i].key, " ", states[i].state);
                    
                    if(states[i-1].state == "finished") {
                       if(states[i].state == "finished") {
                        //no hacer nada!
                       }
                       if(states[i].state == "no") {
                        states[i].state = "wip";
                       }
                    } 
                   else {
                    states[i].state = "no";
                   }
                    
                }
                for(var i=0;i < states.length; i++) {
                    project.status[states[i].key]=states[i].state;
                }
                console.log("segunda pasada:", states);
                console.log("status:", project.status);

                        
                // Project.update({id: ref_id},{status: project.status}).exec(function afterwards(err, updated){
                //    if (err) return;
                
                var pro = Project.findOne({id:ref_id}, function foundProject(err, proj) {
                    if (err) return next(err);
                    if (!proj) return next();
                    proj.status = project.status;
                    proj.save(function(err, savedProject){
                        if (err) {
                            console.log(err);
                            return err;
                        } else {
                            console.log("antes de salir del SAVE", proj.status);
                            callback();
                        }
                    });
                });



            }).catch(function (err){
                console.log("hubo un error:", err);
                if (err) return (err);
            });    
        }
        // project.save(function(err, savedProject){
        //     if (err) {
        //         console.log(err);
        //         return err;
        //     } else {
        //         console.log("antes de salir del SAVE: ", project.status);
        //         return savedProject;
        //     }
        // });

    
   
    
    
    
    
    
    
    
    
    
    
   /*  var pro = Project.findOne({id:obj.id}, function foundProject(err, project) {
        if (err) return next(err);
        if (!project) return next();
        
        project.status[obj.key] = obj.state;
        console.log("status en setstate, antes: ", obj);
        console.log("status en setstate, antes: ", project.status);
        var saved = project.save(function(err, savedProject){
            if (err) {
                console.log(err);
                return err;
            } else {
                console.log("antes de salir del SAVE");
                return savedProject;
            }
        });
        return saved;
        //res.json({status});

    }); 
    return "ok"; */
    
};