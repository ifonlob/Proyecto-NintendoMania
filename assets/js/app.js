"use strict";

/* Creación de botón hamburguesa interactivo */

const botonHamburguesa = document.querySelector(".cabecera__buscador--hamburguesa")

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
botonHamburguesa.addEventListener("click",() => {menuNavegacion.classList.toggle('hamburguesa-nav__activa')})


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