# NintendoManía

Este proyecto desarrolla un sitio web completo en donde un proyecto de profesionales independientes unidos por la pasión y el rigor histórico. El objetivo es crear una revista digital especializada que documente el lore, la cronología de desarrollo y las curiosidades de las sagas principales de Nintendo: Super Mario Bros, Splatoon y Kirby.

La temática friki se aborda con una metodología de desarrollo profesional, garantizando que el producto final no solo sea atractivo para los fans, sino que cumpla con los estándares más altos de accesibilidad y estructura web.

La Fase 1 se centra exclusivamente en construir un esqueleto HTML5 puro, semántico y accesible, sin utilizar ningún estilo CSS. <!--A implementar las siguientes fases-->

## Justificación de la temática

La elección de la temática de NintendoManía ha venido precedida por diversos factores. Principalmente hemos considerado que era la mejor forma de emplear nuestros conocimientos y hacer un proyecto sostenible a largo plazo cumpliendo con los criterios mientras pasábamos un buen rato estructurando y diseñando.

De la misma forma, hemos sopesado también que era muy buena elección puesto que esta estructura y temática nos permitía aplicar de forma exitosa y profesional las etiquetas semánticas exigidas.

A continuación vamos a abordar más rigurosamente la justificación de esta temática:

### Decisiones Clave y Rigor Técnico

El proyecto NintendoManía como hemos dicho anteriormente es una revista digital especializada dedicada al lore, la historia de desarrollo y el análisis de las mecánicas de las sagas de Nintendo: Super Mario Bros, Splatoon y Kirby.

La elección de esta temática, si bien está impulsada por el fanatismo, se aborda con un rigor técnico y metodológico propio de un encargo profesional. El objetivo es aplicar los estándares de desarrollo web más altos para documentar contenido complejo de manera accesible y estructurada.

A lo largo del proyecto hemos empleado una estructura totalmente semántica demostrando un dominio de HTML5 puro con el uso de etiquetas como `<section>`,`<article>`,`<figure>` o `<aside>`. Además también hemos empleado etiquetas modernas como `<details>` o `<summary>` en situaciones determinadas con el objetivo de aportar un mayor dinamismo a la página.

Asimismo también hemos hecho uso de atributos `alt` en todas las imágenes así como hemos incorporado un formulario robusto que incluye más de 6 tipos de inputs organizados de forma lógica con etiquetas como `<fieldset>` o `<legend>`

## Estructura de NintendoManía

El proyecto consta de las 6 páginas obligatorias más una opcional, cada una con una estructura única y justificada para cumplir el requisito de diferenciación:

| Archivo | Temática Principal | Estructura Diferencial Clave |
| :--- | :--- | :--- |
| **`index.html`** | Portada, Introducción y Acceso Rápido. | Estructura de **Índice Modular:** Usa `<aside>` y `<details>` para navegación y llamada a la acción. |
| **`sagas/mario.html`** | Cronología y Análisis de Sagas. | Estructura **Jerárquica de Hitos (2D vs 3D):** Artículos clasificados por salto de dimensión. |
| **`sagas/splatoon.html`** | Cronología y Lore Profundo. | Estructura **Lineal y Modular:** Cronología vertical complementada con secciones de **Armas** e **Idols**. |
| **`sagas/kirby.html`** | Cronología y Curiosidades. | Estructura de **Fichas de Lore:** Uso intensivo de `<figure>` y `<figcaption>` para habilidades, jefes y curiosidades. |
| **`comparativas.html`**| Representación de Datos. | Estructura **Tabular Rigurosa:** Múltiples `<table>` semánticas con `scope` para cumplir el requisito de datos. |
| **`contacto.html`** | Formulario y FAQ. | Estructura de **Formulario Avanzado:** Uso de `<fieldset>` para organización y `<details>/<summary>` para el FAQ interactivo. |

### index.html