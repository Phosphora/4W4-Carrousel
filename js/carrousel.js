(function() {
    console.log('Début du carrousel');
    let bouton = document.querySelector(".carrousel__ouvrir");

    let carrousel = document.querySelector(".carrousel");
    let carrousel__x = document.querySelector(".carrousel__x");
    let carrousel__figure = document.querySelector(".carrousel__figure");
    let carrousel__form = document.querySelector(".carrousel__form");
    let carrousel__gauche = document.querySelector(".carrousel__gauche");
    let carrousel__droite = document.querySelector(".carrousel__droite");

    let galerie = document.querySelector(".galerie");
    let galerie__img = galerie.querySelectorAll("img");
    console.log(galerie__img);

    let index = 0; // Permet d'identifier l'image courante du carrousel
    let ancien_index = -1; // Permet d'identifier l'image précédente
    let position = 0; // Permet d'indexer les images de la galerie

    bouton.addEventListener('mousedown', function() {
        console.log('Ouvrir la boîte modale.');
        carrousel.classList.add('carrousel--activer');
        ajouter_img_dans_carrousel();

        /* https://developer.mozilla.org/fr/docs/Web/API/Element/classList
    
        La propriété clasList.contain('carrousel--activer') permet de vérifier si le carrousel est ouvert. */
    })

    carrousel__x.addEventListener('mousedown', function() {
        console.log('Fermer la boîte modale.');
        carrousel.classList.remove('carrousel--activer');
    })

    /**
     * ajouter_img_dans_carrousel
     * Ajouter l'ensemble des images de la galerie dans la boîte modale Carrousel
     */

    function ajouter_img_dans_carrousel() {
        for (const elm of galerie__img) {
            elm.dataset.index = position;
            elm.addEventListener('mousedown', function(e) {
                index = e.target.dataset.index;
                afficher_image(index);
                console.log(index);
            });
            creation_img_carrousel(elm);
            creation_radio_carrousel();
            gestion_fleche_gauche();
            gestion_fleche_droite();
        }
    }

    function creation_img_carrousel(elm) {
        // console.log(elm.getAttribute('src'));
        let img = document.createElement('img');
        // img.setAttribute('src', elm.getAttribute('src'));
        img.src = elm.src;
        img.classList.add('carrousel__img');
        // console.log(img.getAttribute('src'));
        carrousel__figure.appendChild(img);
    }

    /**
     * Création d'un radio bouton
     */

    function creation_radio_carrousel() {
        let rad = document.createElement('input');
        rad.setAttribute('type', 'radio');
        rad.setAttribute('name', 'carrousel__rad');
        rad.classList.add('carrousel__rad');
        rad.dataset.index = position;
        position = position + 1 // Incrémentation de 1
        // position += 1
        // position++
        carrousel__form.appendChild(rad);

        rad.addEventListener('mousedown', function() {
            console.log(this.dataset.index);
            index = this.dataset.index;
            afficher_image(index);
        });
    }

    function afficher_image(index) {
        if (ancien_index != -1) {
            // carrousel__figure.children[ancien_index].style.opacity = 0;
            carrousel__figure.children[ancien_index].classList.remove('carrousel__img--activer');
            // carrousel__form.children[ancien_index].checked
        }

        // carrousel__figure.children[index].style.opacity = 1;
        carrousel__figure.children[index].classList.add('carrousel__img--activer');
        ancien_index = index;
    }

    function gestion_fleche_gauche() {
        carrousel__gauche.dataset.index = position;
        position = position - 1 // Incrémentation de 1

        carrousel__gauche.addEventListener('mousedown', function() {
            console.log(this.dataset.index);
            index = this.dataset.index;
            afficher_image(index);
        });
    }

    function gestion_fleche_droite() {
        carrousel__droite.dataset.index = position;
        position = position + 1 // Incrémentation de 1

        carrousel__droite.addEventListener('mousedown', function() {
            console.log(this.dataset.index);
            index = this.dataset.index;
            afficher_image(index);
        });
    }

    /**
     * Permet de vérifier si la classe « carrousel--activer » se trouve
     * dans la liste des classes carrousel
     * clasList.contain('carrousel--activer');
     */
})()