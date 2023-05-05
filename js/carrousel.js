(function() {
    console.log('Début du carrousel');
    let bouton = document.querySelector(".carrousel__ouvrir");

    let carrousel = document.querySelector(".carrousel");
    let carrousel__x = document.querySelector(".carrousel__x");
    let carrousel__figure = document.querySelector(".carrousel__figure");
    let carrousel__form = document.querySelector(".carrousel__form");
    let carrousel__precedent = document.querySelector(".carrousel__precedent");
    let carrousel__suivant = document.querySelector(".carrousel__suivant");

    let galerie = document.querySelector(".galerie");
    let galerie__img = galerie.querySelectorAll("img");
    console.log(galerie__img);

    let index = 0; // Permet d'identifier l'image courante du carrousel
    let ancien_index = -1; // Permet d'identifier l'image précédente
    let position = 0; // Permet d'indexer les images de la galerie

    /**
     * Permet de créer le carrousel en parcourant la galerie d'images
     */

    ajouter_img_dans_carrousel();

    /**
     * Navigation dans le carrousel avec le bouton précédent : carrousel__precedent
     */

    carrousel__precedent.addEventListener('mousedown', function() {
        index = index - 1;
        if (index == -1) {
            index = galerie__img.length;
        }
        afficher_image(index);
    })

    /**
     * Navigation dans le carrousel avec le bouton suivant : carrousel__suivant
     */

    carrousel__suivant.addEventListener('mousedown', function() {
        index = index + 1;
        if (index == galerie__img.length) {
            index = 0;
        }
        afficher_image(index);
    })

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
        }
    }

    function creation_img_carrousel(elm) {
        // console.log(elm.getAttribute('src'));
        let img = document.createElement('img');
        // img.setAttribute('src', elm.getAttribute('src'));
        // Retire les 12 derniers caractères «-150x150.jpg» pour avoir une bonne resolution
        let longueur = elm.src.length - 12;
        // let extension = elm.src.substr(0, -4);
        img.src = elm.src.substr(0, longueur) + ".png";
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
            carrousel__form.children[ancien_index].checked = false;
        }

        // carrousel__figure.children[index].style.opacity = 1;
        redimensioner_carrousel();
        carrousel__figure.children[index].classList.add('carrousel__img--activer');
        carrousel__form.children[ancien_index].checked = true;
        ancien_index = index;
    }

    function redimensioner_carrousel() {
        // Récupérer les dimensions de l'image courante
        const imageWidth = carrousel__figure.children[index].naturalWidth;
        const imageHeight = carrousel__figure.children[index].naturalHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let carrouselWidth = windowWidth;

        if (carrouselWidth > 1000) {
            carrouselWidth = windowWidth - imageWidth / 2;
        }

        let carrouselHeight = carrouselWidth * imageHeight / imageWidth;

        carrousel.style.width = `${carrouselWidth}px`;
        carrousel.style.height = `${carrouselHeight}px`;
        carrousel.style.top = `${(windowHeight-carrouselHeight)/2}px`;
        carrousel.style.left = `${(windowWidth-carrouselWidth)/2}px`;
        
        console.log(`
        imageWidth = ${imageWidth}
        imageHeight = ${imageHeight}
        windowWidth = ${windowWidth}
        windowHeight = ${windowHeight}
        carrouselWidth = ${carrouselWidth}
        carrouselHeight = ${carrouselHeight}
        `);
    }

    /**
     * Permet de vérifier si la classe « carrousel--activer » se trouve
     * dans la liste des classes carrousel
     * clasList.contain('carrousel--activer');
     */
})()