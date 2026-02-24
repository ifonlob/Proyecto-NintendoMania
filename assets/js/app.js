"use strict";

/* Creación de botón hamburguesa interactivo */

const botonHamburguesa = document.querySelector(".cabecera__buscador--hamburguesa")
const cabecera = document.querySelector('header');

const menuNavegacion = document.createElement('nav')
menuNavegacion.classList.add('hamburguesa-nav');

const navegacionLista = document.createElement('ul')
menuNavegacion.append(navegacionLista)

const enlacesNavegacion = document.querySelectorAll('.cabecera__menu--lista li a')

for(let i = 0; i < enlacesNavegacion.length; i++){
    const apartado = document.createElement('li')
    const enlace = document.createElement('a')

    enlace.textContent = enlacesNavegacion[i].textContent
    enlace.href = enlacesNavegacion[i].href

    apartado.append(enlace)
    navegacionLista.append(apartado)
}

botonHamburguesa.after(menuNavegacion)

botonHamburguesa.addEventListener("click",() => {
    menuNavegacion.classList.toggle('hamburguesa-nav__activa')
    const titulo = cabecera.nextElementSibling;
    titulo.style.transition = "transform 0.4s ease"
    if (menuNavegacion.classList.contains('hamburguesa-nav__activa')) {
        const alturaMenu = menuNavegacion.scrollHeight;
        titulo.style.transform = `translateY(${alturaMenu}px)`;
    }
    else{
        titulo.style.transform = ""
    }
})
