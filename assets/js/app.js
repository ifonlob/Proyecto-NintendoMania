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

    for(let i = 0; i < enlacesNavegacion.length; i++){
        const apartado = document.createElement('li')
        const enlace = document.createElement('a')

        enlace.textContent = enlacesNavegacion[i].textContent
        enlace.href = enlacesNavegacion[i].href

        apartado.append(enlace)
        navegacionLista.append(apartado)
    }
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
        siguienteSeccion.style.transition = "transform 0.4s ease"
        piePagina.style.transition = "transform 0.4s ease"
        if (menuNavegacion.classList.contains('hamburguesa-nav__activa')) {
            const alturaMenu = menuNavegacion.scrollHeight
            siguienteSeccion.style.transform = `translateY(${alturaMenu}px)`
            piePagina.style.transform = `translateY(${alturaMenu}px)`
        }
        else{
            siguienteSeccion.style.transform = ""
        }
    })
}


/* =======================================================
   BOTÓN DE CAMBIO DE TEMA
   ======================================================= */
const modoOscuro = (cabecera,cuerpoPagina) => {
    const logo = document.querySelector('.cabecera__logo')

    if(!logo) return

    const contenedor = document.createElement('div');
    contenedor.classList.add('contenedor-tema');

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
            localStorage.setItem('tema-nintendo', 'claro');
        }
        else{
            cuerpoPagina.classList.remove('tema-claro')
            cuerpoPagina.classList.add('tema-oscuro')
            boton.textContent = '☀️'
            boton.classList.remove('boton-oscuro')
            boton.classList.add('boton-claro')
            localStorage.setItem('tema-nintendo', 'oscuro');
        }
    })

    const buscador = document.querySelector('.cabecera__buscador');
    const mediaQueryPantalla = window.matchMedia('(max-width: 650px)');
    
    const reubicarBotonMovil = (evento) => {
        if(evento.matches){
            buscador.before(contenedor);
        }
        else{
            cabecera.prepend(contenedor)
        }
    }

    mediaQueryPantalla.addEventListener('change', reubicarBotonMovil);
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
            const juegosDisponibles = baseDeDatosJuegos[sagaElegida];
            
            selectorJuegos.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>';
            
            juegosDisponibles.forEach( juego =>{
                const opcion = document.createElement('option')
                opcion.value = juego
                opcion.textContent = juego
                selectorJuegos.append(opcion)
                
            })
            selectorJuegos.disabled = false;
        })
    }

/* =======================================================
   GESTOR DE JUEGOS 
   ======================================================= */

    const inicializarGestorDeJuegos = () => {
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
    };

        const formulario = document.querySelector('.gestor-juegos__formulario');
        const galeria = document.querySelector('.gestor-juegos__galeria');
        const selectorJuegos = document.querySelector('#nombre-juego');

        if (!formulario || !galeria) return;

        formulario.addEventListener('submit', (evento) =>{
            evento.preventDefault()

            const datos = new FormData(formulario);
            const saga = datos.get('saga-juego');
            const juego = datos.get('nombre-juego');
            const resena = datos.get('resena-juego');
            const puntuacion = datos.get('puntuacion-juego');

            const rutaImagen = imagenesJuegos[juego];
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-juego');

            tarjeta.dataset.categoria = saga;

            tarjeta.innerHTML = `
                <h4>${juego}</h4>
                <img src="${rutaImagen}" alt="Imagen de ${juego}" class="tarjeta-juego__imagen">
                <p class="tarjeta__descripcion">${resena}</p>
                <p class="tarjeta__descripcion">Puntuación:<br>${puntuacion}</p>
                <button type="button" class="tarjeta-juego__boton-borrar">Eliminar</button>
            `

            const botonDeBorrado = tarjeta.querySelector('.tarjeta-juego__boton-borrar')
            botonDeBorrado.addEventListener('click',() =>{
                const confirmacion = confirm(`¿Estás seguro de que quieres eliminar la reseña de ${juego}?`);
                if(confirmacion){
                    tarjeta.remove()
                }
            })

            galeria.append(tarjeta)
            formulario.reset()
            selectorJuegos.innerHTML = '<option value="" disabled selected>-- Selecciona un juego --</option>';
            selectorJuegos.disabled = true;
        })
    }

/* =======================================================
   SISTEMA DE FILTRADO 
   ======================================================= */

    const inicializarFiltros = () =>{
        const botonesFiltro = document.querySelectorAll('.boton-filtro')
        const galeria = document.querySelector('.gestor-juegos__galeria')

        if (!galeria || botonesFiltro.length === 0) return;

        botonesFiltro.forEach(boton =>{
            boton.addEventListener('click', (evento) => {
                botonesFiltro.forEach(botonSec => botonSec.classList.remove('activo'))
                evento.target.classList.add('activo')
                const filtroElegido = evento.target.dataset.filtro
                const tarjetas = galeria.querySelectorAll('.tarjeta-juego')
                tarjetas.forEach(tarjeta =>{
                    const categoriaTarjeta = tarjeta.dataset.categoria;
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


interactividadHamburguesa(cabecera)
modoOscuro(cabecera,cuerpoPagina)
inicializarDesplegables()
inicializarGestorDeJuegos()
inicializarFiltros()