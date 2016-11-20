function init() {
    var pokemons = getPokemons();

    initMenu(pokemons);
    initIndexPokemonsArticles(pokemons);
    initPokemonsArticles(pokemons);
}

function initPokemonsArticles(pokemons) {
    var section = document.getElementById("pokemon-articles");
    for (numPokemon in pokemons) {
        var article = initPokemonArticle(pokemons[numPokemon]);
        section.appendChild(article);
    }
}

function initMenu(pokemons) {
    initMenuAccueil();
    initMenuPokemons(pokemons);
}

function initMenuAccueil() {
    var div = document.getElementById("acceuil");
    var linkAccueil = div.firstElementChild;

    linkAccueil.addEventListener("click", function () {
        removeAllDisplay();

        var tabArticles = document.getElementById('tabArticles');
        tabArticles.style.display = 'flex';
    });
}

function initMenuPokemons(pokemons) {
    var div = document.getElementById("pokemons");
    var ul = document.createElement("ul");

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];
        var li = createPokemonLiForMenu(pokemon, i);

        ul.appendChild(li);
    }
    div.appendChild(ul);
}

function removeAllDisplay() {
    var tabArticles = document.getElementById('tabArticles');
    var pokemonArticles = document.getElementsByClassName('pokemon-article');

    tabArticles.style.display = 'none';
    for (var i = 0; i < pokemonArticles.length; i++) {
        pokemonArticles[i].style.display = 'none';
    }
}

function initPokemonArticle(pokemon) {

    var article = createIndexPokemonArticle(pokemon);
    var articleSection = createArticleSection(pokemon);

    article.id = pokemon.numero;
    article.className = 'pokemon-article';
    article.appendChild(articleSection);

    return article;
}

function createPokemonLiForMenu(pokemon) {
    var li = document.createElement("li");
    var a = document.createElement("a");

    a.innerHTML = pokemon.nom;
    a.href = '#';
    li.appendChild(a);
    li.addEventListener("click", function () {
        var pokemonArticle = document.getElementById(pokemon.numero);

        removeAllDisplay();
        pokemonArticle.style.display = 'block';
    });

    return li;
}


function initIndexPokemonsArticles(pokemons) {
    var section = document.getElementsByTagName("section")[0];

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];
        var article = createIndexPokemonArticle(pokemon);

        section.appendChild(article);
    }
}

function createIndexPokemonArticle(pokemon) {
    var article = document.createElement("article");

    var header = document.createElement("header");
    var h2 = document.createElement("h2");
    h2.innerHTML = pokemon.nom;
    header.appendChild(h2);
    article.appendChild(header);

    var h3 = document.createElement("h3");
    h3.innerHTML = "№ " + pokemon.numero;
    article.appendChild(h3);

    var divImage = buildDivImagePokemon(pokemon.image);
    var divType = buildDivTypePokemon(pokemon.typePrincipal);
    var description = buildDescriptionPokemon(pokemon.description);

    article.appendChild(divImage);
    article.appendChild(divType);
    article.appendChild(description);

    return article;
}

function buildDivImagePokemon(image) {
    var divImage = document.createElement("div");
    var imgImage = buildImage(image);

    imgImage.width = 150;
    divImage.appendChild(imgImage);

    return divImage;
}

function buildDivTypePokemon(typePrincipal) {
    var divType = document.createElement("div");
    var imgType = buildImage(typePrincipal);

    divType.appendChild(imgType);

    return divType;
}

function buildImage(srcImage) {
    var img = document.createElement("img");
    img.src = srcImage;

    return img;
}

function buildDescriptionPokemon(description) {
    var p = document.createElement("p");
    p.innerHTML = description;

    return p;
}

function createArticleSection(pokemon) {
    var section = document.createElement("section");
    var asideCaracteristiques = createCaracteristiqueAside(pokemon);
    var asideSpritesEvolution = createSpritesEvolutionAside(pokemon);

    section.appendChild(asideCaracteristiques);
    section.appendChild(asideSpritesEvolution);

    return section;
}

function createCaracteristiqueAside(pokemon) {
    var aside = document.createElement("aside");
    var ul = document.createElement("ul");
    var header = document.createElement("header");
    var h2 = document.createElement("h2");

    aside.className = "aside-list";
    aside.id = "caracteristique";
    h2.innerHTML = "Caractéristiques";
    header.appendChild(h2);
    aside.appendChild(header);

    for (caracteristique in pokemon['caracteristiques']) {
        var li = addCaracteristiqueLiToUl(pokemon, caracteristique);

        ul.appendChild(li);
    }
    aside.appendChild(ul);

    return aside;
}

function createSpritesEvolutionAside(pokemon) {
    // Ajout des éléments créés
    var aside = document.createElement("aside");
    aside.className = "aside-list";
    aside.id = "sprites";

    // création du header
    var header = document.createElement("header");
    var h2 = document.createElement("h2");
    h2.innerHTML = "Evolution des sprites tout au long des générations";
    header.appendChild(h2);

    var ul = document.createElement("ul");

    // création des sprite pour chaque génération
    for (var numGeneration in pokemon.spritesByGeneration) {
        ul.appendChild(createSpriteLi(pokemon, numGeneration));
    }

    aside.appendChild(ul);

    return aside
}

function createSpriteLi(pokemon, numGeneration) {
    var li = document.createElement("li");

    var divSpriteColLeft = buildSpriteColLeft(numGeneration);
    var divSpriteColRight = buildSpriteColRight(pokemon, numGeneration);

    li.appendChild(divSpriteColLeft);
    li.appendChild(divSpriteColRight);

    return li;
}

function buildSpriteColLeft(numGeneration) {
    var divColLeft = document.createElement("div");
    var h4 = document.createElement("h4");

    divColLeft.className = "col-left";
    h4.innerHTML = "Génération " + numGeneration + " :";
    divColLeft.appendChild(h4);

    return divColLeft;
}

function buildSpriteColRight(pokemon, numGeneration) {
    var divColRight = document.createElement("div");
    var img = document.createElement("img");
    console.log(numGeneration);
    divColRight.className = "col-right";
    img.src = pokemon.spritesByGeneration[numGeneration];
    divColRight.appendChild(img);

    return divColRight;
}

function addCaracteristiqueLiToUl(pokemon, caracteristique) {

    var li = document.createElement("li");
    var divCaracteristiqueColLeft = buildCaracteristiqueColLeft(caracteristique);
    var divCaracteristiqueColRight = buildCaracteristiqueColRight(pokemon, caracteristique);

    li.appendChild(divCaracteristiqueColLeft);
    li.appendChild(divCaracteristiqueColRight);

    return li;
}

function buildCaracteristiqueColRight(pokemon, caracteristique) {
    var divColRight = document.createElement("div");

    divColRight.className = "col-right";
    if (Array.isArray(pokemon.caracteristiques[caracteristique])) { // Ajout d'une liste si la caractéristique contient plus de deux élément
        var ul = document.createElement("li");

        for (element in pokemon.caracteristiques[caracteristique]) {
            var li_caracteristique = document.createElement("li");

            li_caracteristique.innerHTML = pokemon.caracteristiques[caracteristique][element];
            ul.appendChild(li_caracteristique);
        }
        divColRight.appendChild(ul);
    } else { // Ajout d'un seul élément.
        var li_simple_caracteristique = document.createElement("li");

        li_simple_caracteristique.innerHTML = pokemon.caracteristiques[caracteristique];
        divColRight.appendChild(li_simple_caracteristique);
    }

    return divColRight;
}

function buildCaracteristiqueColLeft(caracteristique) {
    var divColLeft = document.createElement("div");
    var h4 = document.createElement("h4");

    h4.innerHTML = caracteristique + " :";
    divColLeft.className = "col-left";
    divColLeft.appendChild(h4);

    return divColLeft;
}

function getPokemons() {

    var pokemons = [
        {
            numero: "001",
            nom: "Bulbizarre",
            image: "http://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png",
            description: "Bulbizarre (anglais : Bulbasaur ; japonais : フシギダネ Fushigidane) est le Pokémon de départ de type Plante offert par le Professeur Chen dans la région de Kanto. Il est le premier Pokémon du Pokédex National.",
            typePrincipal: "http://www.pokepedia.fr/images/6/66/Miniat_type_plante_6_x.png",
            caracteristiques: {
                Famille: 'Graine',
                Taille: '0.7m',
                Poids: '6.9kg',
                Talents: ["Engrais", "Chlorophylle"]
            },
            spritesByGeneration: {
                1: "http://www.pokepedia.fr/images/9/94/Sprite_1_j_001.png",
                2: "http://www.pokepedia.fr/images/a/a4/Sprite_2_c_001.gif",
                3: "http://www.pokepedia.fr/images/b/b2/Sprite_3_e_001.gif",
                4: "http://www.pokepedia.fr/images/7/72/Sprite_4_o_001.png",
                5: "http://www.pokepedia.fr/images/2/20/Sprite_5_n_001.png",
                6: "http://www.pokepedia.fr/images/c/c2/Sprite_6_x_001.png"
            }
        }, {
            numero: "002",
            nom: "Herbizarre",
            image: "http://www.pokepedia.fr/images/4/44/Herbizarre-RFVF.png",
            description: "Bulbizarre (anglais : Bulbasaur ; japonais : フシギダネ Fushigidane) est le Pokémon de départ de type Plante offert par le Professeur Chen dans la région de Kanto. Il est le premier Pokémon du Pokédex National.",
            typePrincipal: "http://www.pokepedia.fr/images/6/66/Miniat_type_plante_6_x.png",
            caracteristiques: {
                Famille: "Graine",
                Taille: "0.7m",
                Poids: "6.9kg",
                Talents: ["Engrais", "Chlorophylle"]
            },
            spritesByGeneration: {
                1: "http://www.pokepedia.fr/images/9/94/Sprite_1_j_001.png",
                2: "http://www.pokepedia.fr/images/a/a4/Sprite_2_c_001.gif",
                3: "http://www.pokepedia.fr/images/b/b2/Sprite_3_e_001.gif",
                4: "http://www.pokepedia.fr/images/7/72/Sprite_4_o_001.png",
                5: "http://www.pokepedia.fr/images/2/20/Sprite_5_n_001.png",
                6: "http://www.pokepedia.fr/images/c/c2/Sprite_6_x_001.png"
            }
        }, {
            numero: "003",
            nom: "Florizarre",
            image: "http://www.pokepedia.fr/images/4/42/Florizarre-RFVF.png",
            description: "Florizarre (anglais : Venusaur ; japonais : フシギバナ Fushigibana) est un Pokémon de type Plante et Poison de la première génération. On retrouve Florizarre sur les jaquettes des jeux Pokémon Vert et Pokémon Vert Feuille.",
            typePrincipal: "http://www.pokepedia.fr/images/6/66/Miniat_type_plante_6_x.png",
            caracteristiques: {
                Famille: "Graine",
                Taille: "0.7m",
                Poids: "6.9kg",
                Talents: ["Engrais", "Chlorophylle"]
            },
            spritesByGeneration: {
                1: "http://www.pokepedia.fr/images/9/94/Sprite_1_j_001.png",
                2: "http://www.pokepedia.fr/images/a/a4/Sprite_2_c_001.gif",
                3: "http://www.pokepedia.fr/images/b/b2/Sprite_3_e_001.gif",
                4: "http://www.pokepedia.fr/images/7/72/Sprite_4_o_001.png",
                5: "http://www.pokepedia.fr/images/2/20/Sprite_5_n_001.png",
                6: "http://www.pokepedia.fr/images/c/c2/Sprite_6_x_001.png"
            }
        }, {
            numero: "004",
            nom: "Salamèche",
            image: "http://cdn.bulbagarden.net/upload/7/73/004Charmander.png",
            description: "Salamèche (anglais: Charmander ; japonais: ヒトカゲ Hitokage) est le Pokémon de départ de type Feu offert par le Professeur Chen dans la région de Kanto.",
            typePrincipal: "http://www.pokepedia.fr/images/3/37/Miniat_type_feu_6_x.png",
            caracteristiques: {
                Famille: "Lézard",
                Taille: "0.6m",
                Poids: "8.5kg",
                Talents: ["Brasier", "Force Soleil"]
            },
            spritesByGeneration: {
                1: "http://www.pokepedia.fr/images/9/94/Sprite_1_j_001.png",
                2: "http://www.pokepedia.fr/images/a/a4/Sprite_2_c_001.gif",
                3: "http://www.pokepedia.fr/images/b/b2/Sprite_3_e_001.gif",
                4: "http://www.pokepedia.fr/images/7/72/Sprite_4_o_001.png",
                5: "http://www.pokepedia.fr/images/2/20/Sprite_5_n_001.png",
                6: "http://www.pokepedia.fr/images/c/c2/Sprite_6_x_001.png"
            }
        }
    ];

    return pokemons;
}