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
   VALIDACIÓN FORMULARIO CONTACTO
   ======================================================= */
    const validacionFormularioContacto = () => {
        const formularioContacto = document.querySelector('.contacto__formulario')

        if(!formularioContacto) return

        formularioContacto.addEventListener('submit',(evento) =>{
            evento.preventDefault()

        })
    }

interactividadHamburguesa(cabecera)
modoOscuro(cabecera,cuerpoPagina)