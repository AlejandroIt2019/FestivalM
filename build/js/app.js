document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
}
//scroll
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlaces => {
        enlaces.addEventListener('click', function (e) {
            e.preventDefault();
            
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: 'smooth'});
        });
    })

}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1; i <= 12; i++ ){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">

        
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">

        
        `;
        //crear overlay con la img
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function (){
            const body = document.querySelector('body');
            body.appendChild(overlay)
            
            overlay.remove();
        }

        //cerrar ventana
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function () {
            const body = document.querySelector('body');
            body.appendChild(overlay)
            
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);



        //añadirlo al html
        const body = document.querySelector('body');
        body.appendChild(overlay)
        body.classList.add('fijar-body');
}

