(function() {
    console.log('Début du carrousel');
    let bouton = document.querySelector(".carrousel__ouvrir");

    let carrousel = document.querySelector(".carrousel");
    let carrousel__x = document.querySelector(".carrousel__x");
    let carrousel__figure = document.querySelector(".carrousel__figure");

    let galerie = document.querySelector(".galerie");
    let galerie__img = galerie.querySelectorAll("img");
    console.log(galerie__img);

    bouton.addEventListener('mousedown', function(){
        console.log('Ouvrir la boîte modale.');
        carrousel.classList.add('carrousel--activer');
        ajouter_img_dans_carrousel();
    })

    carrousel__x.addEventListener('mousedown', function(){
        console.log('Fermer la boîte modale.');
        carrousel.classList.remove('carrousel--activer');
    })

    /**
     * ajouter_img_dans_carrousel
     * Ajouter l'ensemble des images de la galerie dans la boîte modale Carrousel
     */

    function ajouter_img_dans_carrousel() {
        for (const elm of galerie__img) {
            // console.log(elm.getAttribute('src'));
            let img = document.createElement('img');
            img.setAttribute('src', elm.getAttribute('src'));
            console.log(img.getAttribute('src'));
            carrousel__figure.appendChild(img);
        }
    }
})()