"use strict";

/* =======================================================
   INTERACTIVIDAD BOTÓN HAMBURGUESA
   ======================================================= */

const cabecera = document.querySelector('header')
const cuerpoPagina = document.querySelector('body')

/**
 * Inicializa el menú hamburguesa para versión móvil.
 * Crea el menú dinámicamente en el DOM y gestiona su animación mediante el cálculo de altura que ocupe en ese momento.
 * @param {HTMLElement} cabecera - El elemento <header> del DOM.
 */

const interactividadHamburguesa = (cabecera) =>{
    const botonHamburguesa = document.querySelector(".cabecera__buscador--hamburguesa")

    if(!botonHamburguesa) return

    const menuNavegacion = document.createElement('nav')
    menuNavegacion.classList.add('hamburguesa-nav')

    const navegacionLista = document.createElement('ul')
    menuNavegacion.append(navegacionLista)

    const enlacesNavegacion = document.querySelectorAll('header ul li a')

    // Clona los enlaces existentes en el header principal
    enlacesNavegacion.forEach(enlaceSec =>{
        const apartado = document.createElement('li')
        const enlace = document.createElement('a')

        enlace.textContent = enlaceSec.textContent
        enlace.href = enlaceSec.href

        apartado.append(enlace)
        navegacionLista.append(apartado)
    })
        // Añade el enlace a "Inicio" si no se está ya en la página principal
        if(!document.querySelector('.introduccion')){
            const apartadoInicio = document.createElement('li')
            const enlaceInicio = document.createElement('a')

            enlaceInicio.textContent = 'Inicio'
            enlaceInicio.href = document.querySelector('.cabecera__logo').href

            apartadoInicio.append(enlaceInicio)
            navegacionLista.prepend(apartadoInicio)
        }

    botonHamburguesa.after(menuNavegacion)

    // Evento para desplegar o recoger el menú modificando su posición en el eje Y
    botonHamburguesa.addEventListener("click",() => {
        menuNavegacion.classList.toggle('hamburguesa-nav__activa')
        const siguienteSeccion = cabecera.nextElementSibling
        const piePagina = document.querySelector('footer')
        siguienteSeccion.classList.add('transicion-menu-hamrburguesa')
        piePagina.classList.add('transicion-menu-hamrburguesa')
        if (menuNavegacion.classList.contains('hamburguesa-nav__activa')) {
            const alturaMenu = menuNavegacion.scrollHeight
            siguienteSeccion.style.transform = `translateY(${alturaMenu}px)`
            piePagina.style.transform = `translateY(${alturaMenu}px)`
        }
        else{
            siguienteSeccion.style.transform = ''
            piePagina.style.transform = ''
        }
    })
}


/* =======================================================
   BOTÓN DE CAMBIO DE TEMA
   ======================================================= */
/**
 * Crea y gestiona el botón para alternar entre el tema claro y oscuro de la página.
 * Lee las preferencias del sistema operativo o el estado previo guardado en localStorage, 
 * @param {HTMLElement} cabecera - Nodo del DOM correspondiente a la cabecera.
 * @param {HTMLElement} cuerpoPagina - Nodo del DOM correspondiente a la etiqueta body.
 */

const modoOscuro = (cabecera,cuerpoPagina) => {
    const logo = document.querySelector('.cabecera__logo')

    if(!logo) return

    const contenedor = document.createElement('div')
    contenedor.classList.add('contenedor-tema')

    const boton = document.createElement('button')
    boton.classList.add('boton-tema')
    
    contenedor.append(boton)
    logo.replaceWith(contenedor)
    
    const temaGuardado = localStorage.getItem('tema-nintendo')
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Recupera la configuración de almacenamiento local o la preferencia de color del navegador
    if(temaGuardado === 'oscuro' || (!temaGuardado && prefiereOscuro)){
        cuerpoPagina.classList.add('tema-oscuro')
        boton.textContent = '☀️'
        boton.classList.add('boton-claro')
    }
    else{
        cuerpoPagina.classList.add('tema-claro')
        boton.textContent = '🌙'
        boton.classList.add('boton-oscuro')
    }

    boton.addEventListener('click', () =>{
        if(cuerpoPagina.classList.contains('tema-oscuro')){
            cuerpoPagina.classList.remove('tema-oscuro')
            cuerpoPagina.classList.add('tema-claro')
            boton.classList.remove('boton-claro')
            boton.classList.add('boton-oscuro')
            boton.textContent = '🌙'
            localStorage.setItem('tema-nintendo', 'claro')
        }
        else{
            cuerpoPagina.classList.remove('tema-claro')
            cuerpoPagina.classList.add('tema-oscuro')
            boton.textContent = '☀️'
            boton.classList.remove('boton-oscuro')
            boton.classList.add('boton-claro')
            localStorage.setItem('tema-nintendo', 'oscuro')
        }
    })

    const buscador = document.querySelector('.cabecera__buscador')
    const mediaQueryPantalla = window.matchMedia('(max-width: 650px)')
    // Ajusta la posición del botón en la cabecera según el tamaño del viewport
    const reubicarBotonMovil = (evento) => {
        if(evento.matches){
            buscador.before(contenedor)
        }
        else{
            cabecera.prepend(contenedor)
        }
    }

    mediaQueryPantalla.addEventListener('change', reubicarBotonMovil)
    reubicarBotonMovil(mediaQueryPantalla)
}

/* =======================================================
   DESPLEGABLES JUEGOS SEGÚN SAGA 
   ======================================================= */

   /**
     * Gestiona los campos select del formulario.
     * Al cambiar el valor del select principal (sagas), genera y añade dinámicamente 
     * las opciones correspondientes en el select secundario (juegos) basándose en una estructura de datos local.
    */
    const inicializarDesplegables = () => {
        const selectorSagas = document.querySelector('#saga-juego')
        const selectorJuegos = document.querySelector('#nombre-juego')

        if(!selectorSagas || !selectorJuegos) return

        const baseDeDatosJuegos = {
            mario: [
                "Super Mario Bros.", 
                "Super Mario 64", 
                "Super Mario Galaxy", 
                "Super Mario Odyssey"
            ],
            splatoon: [
                "Splatoon", 
                "Splatoon 2", 
                "Splatoon 3"
            ],
            kirby: [
                "Kirby's Dream Land", 
                "Kirby's Adventure", 
                "Kirby Super Star", 
                "Kirby y la Tierra Olvidada"
            ]
        }

        selectorSagas.addEventListener('change',(evento) => {
            const sagaElegida = evento.target.value
            const juegosDisponibles = baseDeDatosJuegos[sagaElegida]

            // Limpia las opciones anteriores
            selectorJuegos.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>'

            // Rellena el selector secundario
            juegosDisponibles.forEach( juego =>{
                const opcion = document.createElement('option')
                opcion.value = juego
                opcion.textContent = juego
                selectorJuegos.append(opcion)
                
            })
            selectorJuegos.disabled = false
        })
    }

        /* =======================================================
            SISTEMA DE TARJETAS 
        ========================================================= */
            
            const imagenesJuegos = {
                "Super Mario Bros.": "./assets/imgs/caratula_mariobros_nes.jpg",
                "Super Mario 64": "./assets/imgs/caratula_mario64.webp",
                "Super Mario Galaxy": "./assets/imgs/SuperMarioGalaxy.jpg",
                "Super Mario Odyssey": "./assets/imgs/mario_odyssey.jpg",
                
                "Splatoon": "./assets/imgs/splatoon1_portada.png",
                "Splatoon 2": "./assets/imgs/splatoon2_portada.jpg",
                "Splatoon 3": "./assets/imgs/splatoon3_portada.jpg",
                
                "Kirby's Dream Land": "./assets/imgs/return_dreamland.jpg",
                "Kirby's Adventure": "./assets/imgs/kirby_adventura_captura.jpg",
                "Kirby Super Star": "./assets/imgs/kirby_super_star.jpg",
                "Kirby y la Tierra Olvidada": "./assets/imgs/tierra_olvidada.jpg"
            }

            const coloresSagas = {
                mario : "var(--color-principal__mario)",
                splatoon : "var(--color-principal__splatoon)",
                kirby : "var(--color-principal__kirby)"
            }

            /**
             * Recupera la colección de favoritos guardados en localStorage y crea dinámicamente 
             * las tarjetas correspondientes en el DOM. Asigna eventos de eliminación individual para cada 
             * tarjeta y gestiona el evento del botón de borrado masivo.
             * @param {Object} imagenesJuegos - Diccionario que mapea los nombres de los juegos con rutas de imágenes locales.
             * @param {Object} coloresSagas - Diccionario que asigna variables CSS de color a cada saga.
             */
            const inicializarTarjetas = (imagenesJuegos,coloresSagas) =>{
                    const galeria = document.querySelector('#favoritos')

                    if (!galeria) return

                    const favoritosGuardados = JSON.parse(localStorage.getItem('coleccionFavoritos')) || []
                    favoritosGuardados.forEach(favorito =>{
                        const { id, saga, juego, resena, puntuacion } = favorito;
                        const rutaImagen = imagenesJuegos[juego]
                        const tarjeta = document.createElement('article')
                        tarjeta.classList.add('tarjeta-juego')
                        tarjeta.style.backgroundColor = coloresSagas[saga]
                        tarjeta.dataset.categoria = saga

                        // Crea la estructura interna de la tarjeta
                        tarjeta.innerHTML = `
                        <h4 class="tarjeta__titulo">${juego}</h4>
                        <img src="${rutaImagen}" alt="Imagen de ${juego}" class="tarjeta-juego__imagen">
                        <p class="tarjeta__descripcion">${resena}</p>
                        <p class="tarjeta__descripcion">Puntuación:<br>${puntuacion}/100</p>
                        <button type="button" class="tarjeta-juego__boton-borrar">Eliminar</button>
                    `
                        // Evento de eliminación individual
                        const botonDeBorrado = tarjeta.querySelector('.tarjeta-juego__boton-borrar')
                        botonDeBorrado.addEventListener('click',() =>{
                            const confirmacion = confirm(`¿Estás seguro de que quieres eliminar la reseña de ${juego}?`)
                            if(confirmacion){
                                tarjeta.remove()
                                const favoritosGuardados = JSON.parse(localStorage.getItem('coleccionFavoritos'))
                                const favoritosFiltrados = favoritosGuardados.filter(favoritoSec => favoritoSec.id !== id)
                                if(favoritosFiltrados.length === 0) inicializarTextoFavoritosVacio()
                                localStorage.setItem('coleccionFavoritos', JSON.stringify(favoritosFiltrados))
                            }
                        })         
                        galeria.append(tarjeta)
                    })

                    // Evento de eliminación global
                    const botonBorradoMasivo = document.querySelector('.favorito-eliminar-todos')
                    botonBorradoMasivo.addEventListener('click',(evento) =>{
                        const tarjetas = document.querySelectorAll('.tarjeta-juego')
                        tarjetas.forEach(tarjeta =>{
                            tarjeta.remove()
                        })
                        localStorage.setItem('coleccionFavoritos',JSON.stringify([]))
                        inicializarTextoFavoritosVacio()
                    })
                }
    /* =======================================================
        SISTEMA DE FILTRADO 
    ======================================================= */
        /**
         * Inicializa la lógica de los botones de filtrado de la galería.
         * Al hacer clic en un filtro, alterna la visibilidad de las tarjetas añadiendo o 
         * retirando la clase de estado correspondiente, según su atributo data-categoria.
         */
        const inicializarFiltros = () =>{
            const botonesFiltro = document.querySelectorAll('.boton-filtro')
            const galeria = document.querySelector('#favoritos')

            if (!galeria || botonesFiltro.length === 0) return

            botonesFiltro.forEach(boton =>{
                boton.addEventListener('click', (evento) => {

                    // Actualiza la clase activa de los botones
                    botonesFiltro.forEach(botonSec => botonSec.classList.remove('activo'))
                    evento.target.classList.add('activo')
                    const filtroElegido = evento.target.dataset.filtro
                    const tarjetas = galeria.querySelectorAll('.tarjeta-juego')

                    // Oculta o muestra las tarjetas según el filtro seleccionad
                    tarjetas.forEach(tarjeta =>{
                        const categoriaTarjeta = tarjeta.dataset.categoria
                        if (filtroElegido === 'todos' || filtroElegido === categoriaTarjeta) {
                            tarjeta.classList.remove('oculto')
                        } 
                        else {
                            tarjeta.classList.add('oculto')
                        }
                    })
                })
            })
        }

    /* =======================================================
        ANCHORS INICIO 
    ======================================================= */
    /**
     * Añade eventos de clic a los logotipos de la cabecera principal y de las
     * subpáginas para que actúen como enlaces de redirección a la ruta de inicio.
     */
        const inicializarAnchorsInicio = () =>{

        const logo = document.querySelector('.cabecera__menu--imagen')

        const logoSaga = document.querySelector('.cabecera-kirby__menu--imagen, .cabecera-mario__menu--imagen, .cabecera-splatoon__menu--imagen')

        if(logo){
            logo.addEventListener('click',() =>{
                window.location.href = './index.html'
            })
        }
        if(logoSaga){
            logoSaga.addEventListener('click',() =>{
                window.location.href = '../index.html'
            })
        }
    }

    /* ============================================================
      INICIALIZACIÓN Y VALIDACIÓN TIEMPO REAL FORMULARIO FAVORITOS 
      ============================================================= */

    /**
     * Configura la validación y el envío del formulario de favoritos.
     * Aplica validación visual al salir de los campos de texto e implementa 
     * un chequeo estricto previo a la acción de submit. En caso de éxito, procesa
     * los datos introducidos, actualiza el localStorage, proporciona feedback visual y resetea los campos.
     */

const inicializarFormularioYValidacion = () =>{
    const formulario = document.querySelector('.gestor-juegos__formulario')
    const resena = document.querySelector('.gestor-juegos__textarea')
    const puntuacion = document.querySelector('.gestor-juegos__input')
    const botonEnvio = document.querySelector('.gestor-juegos__boton')
    const selectJuegos = document.querySelectorAll('.gestor-juegos__select')
    const selectorJuegoSecundario = document.querySelector('#nombre-juego')

    if (!formulario || !resena || !puntuacion || !botonEnvio) return
    
    const resenaError = document.createElement('p')
    const puntuacionError = document.createElement('p')

    resenaError.classList.add('mensaje-error')
    puntuacionError.classList.add('mensaje-error')

    resenaError.textContent = "Error. La reseña tiene que tener una longitud mínima de 15 caracteres."
    puntuacionError.textContent = "Error. La puntuación tiene que estar comprendida entre 0 y 100."

    /* TEXTAREA */

    // Evento blur para el área de texto (reseña)
    resena.addEventListener('blur', (evento) =>{
        if(evento.target.value.length < 15){
            resena.before(resenaError)
            resena.classList.add('input-error')
        } else {
            resenaError.remove()
            resena.classList.remove('input-error')
        }

        if(document.querySelector('.mensaje-error') ){
            botonEnvio.disabled = true
        }
        else{
            botonEnvio.disabled = false
        }
    })

    /* PUNTUACIÓN */

    // Evento blur para el input numérico (puntuación)
    puntuacion.addEventListener('blur', (evento) =>{
        const valor = evento.target.value.trim()
        const valorNumerico = Number(valor)
        
        if(valor === '' || isNaN(valorNumerico) || valorNumerico < 0 || valorNumerico > 100){
            puntuacion.before(puntuacionError)
            puntuacion.classList.add('input-error')
        } else {
            puntuacionError.remove()
            puntuacion.classList.remove('input-error')
        }

        if(document.querySelector('.mensaje-error') ){
            botonEnvio.disabled = true
        }
        else{
            botonEnvio.disabled = false
        }
    })

    /* EVENTO SUBMIT  */

    // Evento final de comprobación y envío de datos
    formulario.addEventListener('submit', (evento) =>{
        evento.preventDefault()
        
        const selectVacios = [...selectJuegos].filter(select => select.value.trim() === '')
        const boton = document.querySelector('.gestor-juegos__boton')
        const mensajeError = document.createElement('p')
        if(resena.value.trim().length === 0 || selectVacios.length > 0 || puntuacion.value.trim().length === 0){
            const errorPrevio = document.querySelector('.mensaje-error-formulario')
            if(errorPrevio){
                errorPrevio.remove()
            }

            mensajeError.textContent = "⚠️ Por favor, selecciona un juego y rellena todos los campos correctamente antes de publicar."

            mensajeError.classList.add('mensaje-error-formulario')
            boton.after(mensajeError)
            setTimeout(() => {
                mensajeError.remove();
            }, 4000);
            return
        }

        // Procesamiento de los datos si la validación es correcta
        const datos = new FormData(formulario)

        const favoritoNuevo = {
            id : Date.now(),
            saga : datos.get('saga-juego'),
            juego : datos.get('nombre-juego'),
            resena : datos.get('resena-juego'),
            puntuacion : datos.get('puntuacion-juego')
        }

        const favoritosGuardados = JSON.parse(localStorage.getItem('coleccionFavoritos')) || []
        favoritosGuardados.push(favoritoNuevo)
        localStorage.setItem('coleccionFavoritos', JSON.stringify(favoritosGuardados))

        // Feedback visual de finalización
        const mensajeExito = document.createElement('p')
        mensajeExito.innerHTML = `¡Añadido a Favoritos con éxito! Ve a la pestaña de <a href="./favoritos.html">Favoritos</a>.`;
        mensajeExito.classList.add('mensaje-exito')
        botonEnvio.after(mensajeExito)
        setTimeout(() => {
                mensajeExito.remove();
            }, 4000);

        // Restauración del estado inicial del formulario
        formulario.reset()
        selectorJuegoSecundario.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>'
        selectorJuegoSecundario.disabled = true
        botonEnvio.disabled = true 
    })
}

    /* ============================================================
      INICIALIZACIÓN FAVORITOS VACÍA 
    =============================================================== */

    /**
     * Evalúa el estado de la galería de favoritos. Si determina que no hay nodos 
     * de tipo tarjeta , inyecta en el DOM un cuadro de texto
     * para informar al usuario y sugerir una redirección al formulario.
     */
const inicializarTextoFavoritosVacio = () => {
    const galeriaFavoritos = document.querySelector('#favoritos')

    if(!galeriaFavoritos) return

    if(!document.querySelector('.tarjeta-juego')){
        
        const tarjetaVacia = document.createElement('article')
        tarjetaVacia.classList.add('mensaje-vacio')

        tarjetaVacia.innerHTML = `
            <h3 class="mensaje-vacio__titulo">¡Tu estantería está vacía!</h3>
            <p class="mensaje-vacio__descripcion">Está esperando su primera obra maestra.</p>
            <a href="./comparativas.html#gestor-juegos" class="mensaje-vacio__boton">Añadir un juego</a>
        `
        
        galeriaFavoritos.append(tarjetaVacia)
    }
}

    /* ============================================================
      VALIDACIÓN TIEMPO REAL FORMULARIO CONTACTO
    =============================================================== */

    const validacionFormularioContacto = () =>{
        const formularioContacto = document.querySelector('.contacto__formulario')
        const campoNombre = document.querySelector('.contacto__formulario--nombre')
        const campoCorreo = document.querySelector('.contacto__formulario--correo')
        const campoTelefono = document.querySelector('.contacto__formulario--telefono')
        const selectAsunto = document.querySelector('.contacto__formulario--select')
        const campoTextarea = document.querySelector('.contacto__formulario--textarea')

        if(!formularioContacto || !campoNombre || !campoCorreo || !campoTelefono || !selectAsunto) return

        const errorNombre = document.createElement('p')
        const errorCorreo = document.createElement('p')
        const errorTelefono = document.createElement('p')
        const errorTextarea = document.createElement('p')

        errorNombre.classList.add('mensaje-error');
        errorCorreo.classList.add('mensaje-error');
        errorTelefono.classList.add('mensaje-error');
        errorTextarea.classList.add('mensaje-error');

        errorNombre.textContent = "Error. El nombre no puede estar formado por menos de 3 caracteres."
        errorCorreo.textContent = "Error. La dirección de correo electrónico tiene que ser válida (Tiene que contener una @ precedida de un punto)."
        errorTelefono.textContent = "Error. El teléfono tiene que estar formado por 9 números en formato correcto."
        errorTextarea.textContent = "Error. El mensaje tiene que estar formado por mínimo 30 caracteres."

        /* VALIDACIÓN NOMBRE */

        campoNombre.addEventListener('blur',(evento)=>{
            const valor = evento.target.value.trim()

            if(valor.length === 0){
                errorNombre.remove()
                campoNombre.classList.remove('input-error')
                return
            }

            if(valor.length < 3){
                campoNombre.after(errorNombre)
                campoNombre.classList.add('input-error')
            }
            else{
                errorNombre.remove()
                campoNombre.classList.remove('input-error')
            }
        })

    /* VALIDACIÓN CORREO */

    campoCorreo.addEventListener('blur', (evento) =>{
        const valor = evento.target.value.trim()
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(valor.length === 0){
            errorCorreo.remove()
            campoCorreo.classList.remove('input-error')
            return
        }

        if(!patronCorreo.test(valor)){
            campoCorreo.classList.add('input-error')
            campoCorreo.after(errorCorreo)
        }
        else{
            errorCorreo.remove()
            campoCorreo.classList.remove('input-error')
        }
    })

    /* VALIDACIÓN TELÉFONO */

    campoTelefono.addEventListener('blur',(evento) =>{
        const valor = evento.target.value
        const patronTelefono = /^((9|6)[0-9]{8})$/;

        if(valor.length === 0){
            errorTelefono.remove()
            campoTelefono.classList.remove('input-error')
            return
        }

        if(!patronTelefono.test(valor)){
            campoTelefono.classList.add('input-error')
            campoTelefono.after(errorTelefono)
        }
        else{
            campoTelefono.classList.remove('input-error')
            errorTelefono.remove()
        }
    })

    /* VALIDACIÓN TEXTAREA */

    campoTextarea.addEventListener('blur',(evento)=> {
        const valor = evento.target.value.trim()

        if(valor.length === 0){
            errorTextarea.remove()
            campoTextarea.classList.remove('input-error')
            return
        }


        if(valor.length < 30){
            campoTextarea.classList.add('input-error')
            campoTextarea.after(errorTextarea)
        }
        else{
            campoTextarea.classList.remove('input-error')
            errorTextarea.remove()
        }
    })

    /* EVENTO SUBMIT */

    formularioContacto.addEventListener('submit',(evento) =>{
        evento.preventDefault()
        
        const botonBorrado = document.querySelector('.contacto__formulario--boton[type="reset"]')
        const radioSeleccionado = document.querySelector('input[name="saga_favorita"]:checked');
        const politicaPrivacidad = document.querySelector('input[name="acepta_privacidad"]');
        const mensajeErrorFormularioVacio = document.createElement('p')
        mensajeErrorFormularioVacio.classList.add('mensaje-error__formulario-contacto')
        mensajeErrorFormularioVacio.textContent ="⚠️ Por favor, rellene todos los campos correctamente antes de publicar."
        const mensajeExito = document.createElement('p')
        mensajeExito.classList.add('mensaje-exito')
        mensajeExito.textContent = "¡Gracias por enviar tu petición! Te contactaremos lo antes posible vía correo electrónico."

        if(selectAsunto.value === '' || !politicaPrivacidad.checked || campoNombre.value === '' || campoCorreo.value === '' || formularioContacto.querySelector('.input-error') || !radioSeleccionado || campoTextarea.value === ''){
            if(!document.querySelector('.mensaje-error__formulario-contacto')){
                botonBorrado.after(mensajeErrorFormularioVacio)
            }
            setTimeout(() => {
                mensajeErrorFormularioVacio.remove();
            }, 4000);
            return
        }
        botonBorrado.after(mensajeExito)
            setTimeout(() => {
                mensajeExito.remove();
            }, 4000);
            return
        
    }) 
}

// Bloque de ejecución principal

interactividadHamburguesa(cabecera)
modoOscuro(cabecera,cuerpoPagina)
inicializarDesplegables()
inicializarTarjetas(imagenesJuegos,coloresSagas)
inicializarFormularioYValidacion()
inicializarFiltros()
inicializarAnchorsInicio()
inicializarTextoFavoritosVacio()
validacionFormularioContacto()