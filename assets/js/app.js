"use strict";

/* === BOTÓN HAMBURGUESA === */ 

const botonHamburguesa = document.querySelector("cabecera__buscador--hamburguesa")

/* Creación barra de navegación móvil */

const menuNavegacion = document.createElement('nav')
const navegacionLista = document.createElement('ul')
const apartadosNavegacion = document.querySelectorAll('cabecera__menu--lista li')
const enlacesNavegacion = document.querySelectorAll('cabecera__menu--lista li a')
for(let i = 0; i < apartadosNavegacion.length; i++){
    const apartado = document.createElement('li')
    const enlace = document.createElement('a')
    navegacionLista.append(apartado)
    apartado.append(enlace)
    enlace.textContent = enlacesNavegacion[i].textContent
}

botonHamburguesa.after(menuNavegacion)
botonHamburguesa.addEventListener("click",(menuNavegacionHamburguesa) => {menuNavegacion.className('hamburguesa-nav')})


/* 
    <ul class="cabecera__menu--lista">
          <li>
            <a class="cabecera__menu--enlace" href="./sagas/splatoon.html"
              >Splatoon</a
            >
          </li>
          <li>
            <a class="cabecera__menu--enlace" href="./sagas/mario.html"
              >Mario</a
            >
          </li>
          <li>
            <a class="cabecera__menu--enlace" href="./sagas/kirby.html"
              >Kirby</a
            >
          </li>
          <li>
            <a class="cabecera__menu--enlace" href="./comparativas.html"
              >Comparativas</a
            >
          </li>
          <li>
            <a class="cabecera__menu--enlace" href="./contacto.html"
              >Contacto</a
            >
          </li>
          <li>
            <a class="cabecera__menu--enlace" href="./about.html">About</a>
          </li>
        </ul>
*/