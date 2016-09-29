function Noticia(id, titulo, descripcion, imagen) {

    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;

}

var Diario = (function () {

    // Atributos privados
    var noticias = [];
	
    var claveLocalStorage = 'noticias';

    /*
        Permite precargar las noticias por localstorage
    */
    var precargarNoticias = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            noticias = JSON.parse(datos);
			
			for (i = 0; i < noticias.length; i++) {
				
				dibujarNoticia(noticias[i]);
				
			}

        }

    }

    /*
        Guarda el array de noticias en localstorage
    */
    var guardarNoticias = function () {

        var datos = JSON.stringify(noticias);

        localStorage.setItem(claveLocalStorage, datos);

    }
	
	/*
		Agrega el texto al elemento utilizando un nodoTexto
		Retorna el elemento con el nodoTexto agregado
	 */
    var agregarTexto = function (elemento, texto) {

        var nodoTexto = document.createTextNode(texto);
        
        elemento.appendChild(nodoTexto);

        return elemento;

    }

    /*
		Dibuja en el DOM la noticia pasada como parametro
	 */

	 // EJERCICIO
	 // Hay que agregar un boton para agregar la noticia
	 // El evento onclick del boton debera hacer referencia a una funcion que busque el parent de ese boton
    var dibujarNoticia = function (noticia) {
        // Se obtiene el elemento padre que nos servira para agregar los elementos hijos
        var ul = document.getElementById("noticias");

        // Se crean todos los elementos que necesitaremos para dibujar la noticia (li, h3, img, p)
        var li = document.createElement("li");
        var h3 = document.createElement('h3');
        var img = document.createElement('img');
        var p = document.createElement('p');
       
        // Se asignan los atributos id y class al elemento li creado anteriormente
        // El id del li es el id de la noticia. Nos servira para luego, de ser necesario, borrarla
        li.setAttribute('id', noticia.id);
        li.setAttribute('class', 'list-group-item'); // Bootstrap                             

        // Se agrega el texto al h3 y p a partir del titulo y la descripcion respectivamente
        h3 = agregarTexto(h3, noticia.titulo);
        p = agregarTexto(p, noticia.descripcion);
        
        // Se asigna el source de la imagen (src) a partir del atributo imagen de la noticia
        img.setAttribute('src',  noticia.imagen);

        // Appends de los elementos h1, p, img en li
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(img);

        // Por ultimo se hace append del li en ul
        ul.appendChild(li);
    }

    /*
		Borra del DOM la noticia pasada como parametro
	 */
    var borrarNoticiaDOM = function (noticia) {

        var ul = document.getElementById("noticias");
        
        var li = document.getElementById(noticia.id);

        ul.removeChild(li);

    }

    // Si la noticia existe en el array de noticias devuelve la posicion donde se encuentra (0, 1, 2, etc.)
    // En caso contrario devuelve -1;
    var existeNoticia = function (noticia) {

        var posicion = -1; 
        
        // La condicion del for lee: 'Mientras haya elementos en el array de noticias por recorrer y la posicion sea -1
        for(i = 0; i < noticias.length && posicion === -1; i++) { 

            if (noticias[i].id === noticia.id) { 
                
                // Si los ids coinciden me guardo el contenido de la variable i en la variable posicion
                posicion = i; 

            }

        }

        return posicion;

    }

    var agregarNoticia = function (noticia) {

        // Validacion de que no exista la noticia en el array de noticias
        // Validacion de que lo que me pasen sea una noticia. // Opcional

        // Las noticias con diferente id se podran insertar en el array noticias
        var posicion = existeNoticia(noticia);

        if (posicion === -1) {

            noticias.push(noticia);

            guardarNoticias();

            dibujarNoticia(noticia);

        }  else {

            alert('La noticia con id: ' + noticia.id + ' ya existe');

        }

    }

    var eliminarNoticia = function (noticia) {

        var posicion = existeNoticia(noticia);

        if (posicion > -1) {

            // Borra 1 elemento desde la posicion
            noticias.splice(posicion, 1);

            guardarNoticias();

            borrarNoticiaDOM(noticia);

        } else {

            alert('La noticia con id: ' + noticia.id + ' no existe');

        }

    }
    
    var limpiarDiario = function () {

		noticias = [];

		localStorage.removeItem(claveLocalStorage);
		
		var noticiasDOM = document.getElementById("noticias");
		
		while (noticiasDOM.firstChild) {

			noticiasDOM.removeChild(noticiasDOM.firstChild);
		}
		
	}

	// EJERCICIO
	// Busca en el array de noticias la noticia con el id mas grande y devuelve ese id incrementado en una unidad.	
	var generarNuevoId = function () {

		// EJERCICIO
        var maxId = -1;
        
        for (i = 0; i < noticias.length; i++) { 

            if (noticias[i].id > maxId) { 
                
                maxId = noticias[i].id; 

            }

        }

        return maxId + 1;

	}

	// EJERCICIO
	// Vincular el evento onclick del elemento con id boton a una function que llamaremos crearNoticia
	var vincularFormulario = function () {

        var botonAgregar = document.getElementById("boton");
        
        botonAgregar.onclick = crearNoticia;

	}

	// EJERCICIO
	// Tomara los valores (objeto.value) de los objetos DOM con id titulo, descripcion, imagen
	// Con esos valores se creara una noticia y se llamara a agregarNoticia(noticia)
	var crearNoticia = function () {
        
        var elemTitulo = document.getElementById("titulo");
        
        var elemDescripcion = document.getElementById("descripcion");
        
        var elemImagen = document.getElementById("imagen"); 
        
        var noticia = new Noticia(generarNuevoId(), elemTitulo.value, elemDescripcion.value, elemImagen.value);
        
        agregarNoticia(noticia);

	}

    // Se genera la funcion para borrar peliculas del DOM que se usará en las funciones ordenar por ID, AZ y ZA
    var borrarNoticiasDOM = function () {

        var noticiasDOM = document.getElementById("noticias");
    
        while (noticiasDOM.firstChild) {

            noticiasDOM.removeChild(noticiasDOM.firstChild);

        }

    }
	
    // EJERCICIO
	// Vincular los elementos con id ordenamiento_id, ordenamiento_az, ordenamiento_za
	// a 3 funciones que usaremos para ordenar
	var vincularOrdenamientos = function () {

        var ordenamientoId = document.getElementById("ordenamiento_id");

        var ordenamientoAz = document.getElementById("ordenamiento_az");

        var ordenamientoZa = document.getElementById("ordenamiento_za");

        ordenamientoId.onclick = ordenarPorId; 

        ordenamientoAz.onclick = ordenarAz;

        ordenamientoZa.onclick = ordenarZa; 

	}


    var comparadorId = function (a, b) {

        if (a.id < b.id) {
            
            return -1;
        
        }
        
        if (a.id === b.id) {
            
            return 0;
        }

        if (a.id > b.id) {
            
            return 1;
        }

    }

    var ordenarPorId = function () {

        noticias.sort(comparadorId);

        borrarNoticiasDOM();

        guardarNoticias();

        precargarNoticias();          

    }

    var comparadorAz = function (a, b) {

        if (a.titulo < b.titulo) {
            
            return -1;
        
        }
        
        if (a.titulo === b.titulo) {
            
            return 0;
        }

        if (a.titulo > b.titulo) {
            
            return 1;
        }

    }

    var ordenarAz = function () {

        noticias.sort(comparadorAz);

        borrarNoticiasDOM();

        guardarNoticias();

        precargarNoticias();           

    }    

    var comparadorZa = function (a, b) {

        if (a.titulo < b.titulo) {

            return 1;
        }

        if (a.titulo === b.titulo) {

            return 0;
        }

        if (a.titulo > b.titulo) {

            return -1;
        }
    }

    var ordenarZa = function () {

        noticias.sort(comparadorZa);

        borrarNoticiasDOM();

        guardarNoticias();

        precargarNoticias();   

    }       

	// EJERCICIO
	// Esta funcion vinculara todos los eventos de los objetos del DOM a las funciones que iremos construyendo
	// Sera necesario programar varias funciones para ello:
	//	1. vincularFormulario
	//	2. vincularOrdenamientos (por id, a-z, z-a)
	
    var vincularBotonListado = function () {

        var boton = document.getElementById("mostrar_noticias");
        
        var contenedorNoticias = document.getElementById("noticias");
        
        boton.onclick = function () {

            if (this.value === 'Mostrar Noticias') {

                contenedorNoticias.setAttribute('style', 'display : auto');
                
                this.value = 'Ocultar Noticias';

            } else {

                contenedorNoticias.setAttribute('style', 'display : none');
                
                this.value = 'Mostrar Noticias';

            }

        };

    }

    var iniciar = function () {

        vincularFormulario();
        vincularOrdenamientos();
        vincularBotonListado();
        precargarNoticias();

	}

    // EJERCICIO
    // Solo dejar publico el metodo iniciar
    return {

		iniciar: iniciar
    
    };

})()

// EJERCICIO
// Vincular el evento onload del objeto document al metodo Diario.iniciar
window.onload = Diario.iniciar;