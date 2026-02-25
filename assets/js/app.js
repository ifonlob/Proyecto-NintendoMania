"use strict";

/* =======================================================
   BOTÓN HAMBURGUESA
   ======================================================= */

const cabecera = document.querySelector('header')
function interactividadHamburguesa(cabecera){
    const botonHamburguesa = document.querySelector(".cabecera__buscador--hamburguesa")

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
   MODO OSCURO
   ======================================================= */
function modoOscuro(cabecera){
    const logo = document.querySelector('.cabecera__logo')
    const boton = document.createElement('button')
    logo.replaceWith(boton)

    const temaGuardado = localStorage.getItem('tema-nintendo')
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches

    if(temaGuardado === 'oscuro' || (!temaGuardado && prefiereOscuro)){
        boton.classList.add('tema-oscuro')
        botonTema.textContent = '☀️';
    }
    else{
        boton.classList.add('tema-claro')
        botonTema.textContent = '🌙';
    }

    boton.addEventListener('click', () =>{
        if(document.body.classList.contains('tema-oscuro')){
            body.classList.remove('tema-oscuro')
        }
    })
}



interactividadHamburguesa(cabecera)