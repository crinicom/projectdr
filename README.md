# project_dr

a [Sails](http://sailsjs.org) application
# fuentes
Modelos: http://dennisrongo.com/introduction-to-sails-js-models-and-orm/
PopulateAll: https://imfly.gitbooks.io/sailsjs-docs-gitbook/en/reference/waterline/queries/populateAll.html

# IDEAS
- cada proyecto debe tener un owner y una lista de invitados (mas adelante puedo dar privilegios). Cuando vea mi lista de proyectos veo los MIOS y donde estoy como INVITADO
- agregar font-awesome por los iconos
- cambiar botones con texto por iconos en lineas
- probar EDT como numbered list (<ol> + li) con sus botones a ver qué tal queda. Debe haber un tab antes de cada indented li. PARA PROBAR: puedo hacer una EDT_v2 direccionada de un boton 

# MVP
- Dashboard de mis proyectos, como dueño e invitado
- Project Charter con autoguardado (todo con autoguardado en realidad). Objetivos linea por linea.
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
