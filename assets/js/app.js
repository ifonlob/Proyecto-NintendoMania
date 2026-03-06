"use strict";

/* =======================================================
   INTERACTIVIDAD BOTÓN HAMBURGUESA
   ======================================================= */

const cabecera = document.querySelector('header')
const cuerpoPagina = document.querySelector('body')
const interactividadHamburguesa = (cabecera) =>{
    const botonHamburguesa = document.querySelector(".cabecera__buscador--hamburguesa")

    if(!botonHamburguesa) return

    const menuNavegacion = document.createElement('nav')
    menuNavegacion.classList.add('hamburguesa-nav')

    const navegacionLista = document.createElement('ul')
    menuNavegacion.append(navegacionLista)

    const enlacesNavegacion = document.querySelectorAll('header ul li a')

    enlacesNavegacion.forEach(enlaceSec =>{
        const apartado = document.createElement('li')
        const enlace = document.createElement('a')

        enlace.textContent = enlaceSec.textContent
        enlace.href = enlaceSec.href

        apartado.append(enlace)
        navegacionLista.append(apartado)
    })
        if(!document.querySelector('.introduccion')){
            const apartadoInicio = document.createElement('li')
            const enlaceInicio = document.createElement('a')

            enlaceInicio.textContent = 'Inicio'
            enlaceInicio.href = document.querySelector('.cabecera__logo').href

            apartadoInicio.append(enlaceInicio)
            navegacionLista.prepend(apartadoInicio)
        }

    botonHamburguesa.after(menuNavegacion)

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
            
            selectorJuegos.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>'
            
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
            const inicializarTarjetas = (imagenesJuegos,coloresSagas) =>{
                    const galeria = document.querySelector('.favoritos')

                    if (!galeria) return

                    const favoritosGuardados = JSON.parse(localStorage.getItem('coleccionFavoritos')) || []
                    favoritosGuardados.forEach(favorito =>{
                        const rutaImagen = imagenesJuegos[favorito.juego]
                        const tarjeta = document.createElement('article')
                        tarjeta.classList.add('tarjeta-juego')
                        tarjeta.style.backgroundColor = coloresSagas[favorito.saga]
                        tarjeta.dataset.categoria = favorito.saga

                        tarjeta.innerHTML = `
                        <h4 class="tarjeta__titulo">${favorito.juego}</h4>
                        <img src="${rutaImagen}" alt="Imagen de ${favorito.juego}" class="tarjeta-juego__imagen">
                        <p class="tarjeta__descripcion">${favorito.resena}</p>
                        <p class="tarjeta__descripcion">Puntuación:<br>${favorito.puntuacion}/100</p>
                        <button type="button" class="tarjeta-juego__boton-borrar">Eliminar</button>
                    `
                    
                        const botonDeBorrado = tarjeta.querySelector('.tarjeta-juego__boton-borrar')
                        botonDeBorrado.addEventListener('click',() =>{
                            const confirmacion = confirm(`¿Estás seguro de que quieres eliminar la reseña de ${favorito.juego}?`)
                            if(confirmacion){
                                tarjeta.remove()
                                const favoritosGuardados = JSON.parse(localStorage.getItem('coleccionFavoritos'))
                                const favoritosFiltrados = favoritosGuardados.filter(favoritoSec =>favoritoSec.id !== favorito.id)
                                localStorage.setItem('coleccionFavoritos', JSON.stringify(favoritosFiltrados))
                            }
                        })
                        galeria.append(tarjeta)
                    })
                }
    /* =======================================================
        SISTEMA DE FILTRADO 
    ======================================================= */

        const inicializarFiltros = () =>{
            const botonesFiltro = document.querySelectorAll('.boton-filtro')
            const galeria = document.querySelector('.favoritos')

            if (!galeria || botonesFiltro.length === 0) return

            botonesFiltro.forEach(boton =>{
                boton.addEventListener('click', (evento) => {
                    botonesFiltro.forEach(botonSec => botonSec.classList.remove('activo'))
                    evento.target.classList.add('activo')
                    const filtroElegido = evento.target.dataset.filtro
                    const tarjetas = galeria.querySelectorAll('.tarjeta-juego')
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
    =============================================================== */

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
    formulario.addEventListener('submit', (evento) =>{
        evento.preventDefault()
        
        const selectVacios = [...selectJuegos].filter(select => select.value.trim() === '')
        
        if(resena.value.trim().length === 0 || selectVacios.length > 0){
            alert("⚠️ Por favor, selecciona un juego y rellena todos los campos correctamente antes de publicar.")
            return
        }
        
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
        
        alert("¡Añadido a Favoritos con éxito! Ve a la pestaña 'Favoritos' para verlo.")
        
        formulario.reset()
        selectorJuegoSecundario.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>'
        selectorJuegoSecundario.disabled = true
        botonEnvio.disabled = true 
    })
}



interactividadHamburguesa(cabecera)
modoOscuro(cabecera,cuerpoPagina)
inicializarDesplegables()
inicializarTarjetas(imagenesJuegos,coloresSagas)
inicializarFormularioYValidacion()
inicializarFiltros()
inicializarAnchorsInicio()
