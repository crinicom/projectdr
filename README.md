# project_dr

a [Sails](http://sailsjs.org) application
# fuentes
Modelos: http://dennisrongo.com/introduction-to-sails-js-models-and-orm/
PopulateAll: https://imfly.gitbooks.io/sailsjs-docs-gitbook/en/reference/waterline/queries/populateAll.html

# TODO
- Maquina de estados: para guiar al usuario en la secuencia de trabajo.
    - "no" significa que no se ha hecho nada, ni se puede trabajar en una fase
    - "finished" significa que ya se cumplieron las condiciones mínimas para dar por finalizada esa página y al mismo tiempo habilita en modo "wip" la próxima página
    - "wip" o work in progress es un estado intermedio, ya sea que se puede acceder a la página o que aún no se han completado los items minimos para pasar a la siguiente fase.
- Pcharter: empieza en estado WIP y pasa a FINISHED cuando tiene por lo menos UN objetivo
- EDT comienza como NO, pasa a WIP cuando en Pcharter pasa a FINISHED y pasa a FINISHED cuando existe por lo menos una tarea para cada objetivo
- stakeholders comienza como NO, pasa a WIP cuando  EDT pasa a FINISHED, pasa a FINISHED cuando existe por lo menos un stakeholder identificado
- RISK comienza en NO, pasa a WIP cuando STK pasa a FINISHED y a FINISHED cuando existe por lo menos un riesgo con plan de mitigación
- GANNT comienza en NO, pasa a WIP cuando RSK pasa a finished y a Finished cuando hay un 100% de avance 

ME AYUDA AME: uyycrhk-ñ.-..6ttttttthhhhhhhhhhhhuhnmhmujko9

# IDEAS
- probar EDT como numbered list (<ol> + li) con sus botones a ver qué tal queda. Debe haber un tab antes de cada indented li. PARA PROBAR: puedo hacer una EDT_v2 direccionada de un boton 

# MVP
- Project Charter con autoguardado (todo con autoguardado en realidad). 
- Index_Objetivos trae objetivos + "OTROS". "Agregar detalle". Levanta ventana para crear detalle.
    - Vuelvo a index_objetivos con el agregado. Cada uno propone agregar hijos.
    - La pagina de creación del hijo trae datos de los padres (o del padre)
- Index_tareas trae las tareas como lista y permite crear para cada uno un STK+Comm
- Index_stk trae los stk con plan de comm y permite crear Riesgo+ impacto+ mitigación
- TODO
    - POR LO MENOS un ordenador
    - Concepto mínimo (1er tercio, 2o tercio, 3er tercio)    

# BUGS
- Destroy de proyectos. Agregar confirmación. No funciona CSRF porque no es un form.
- Tamaños de campos deben ser acordes.
- User tiene un campo "state" que se quiere mostrar en el edit.ejs

# RESUELTO
- cada proyecto debe tener un owner y una lista de invitados (mas adelante puedo dar privilegios). Cuando vea mi lista de proyectos veo los MIOS y donde estoy como INVITADO
- agregar font-awesome por los iconos
- cambiar botones con texto por iconos en lineas
- Dashboard de mis proyectos, como dueño e invitado
- Objetivos linea por linea.
