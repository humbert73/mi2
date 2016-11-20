function init() {
    var pokemons = getPokemons();

    initSearch();
    initMenu(pokemons);
    initIndexPokemonsArticles(pokemons);
    initPokemonsArticles(pokemons);
    removeAllDisplay();
    displayTabArticles();
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
        displayTabArticles();
    });
}

function displayTabArticles() {
    var tabArticles = document.getElementById('tabArticles');
    tabArticles.style.display = 'flex';
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
    var pokemonArticles = getPokemonArticles();

    tabArticles.style.display = 'none';
    for (var i = 0; i < pokemonArticles.length; i++) {
        pokemonArticles[i].style.display = 'none';
    }
}

function initPokemonArticle(pokemon) {
    var article = createPokemonArticle(pokemon);
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
        removeAllDisplay();
        displayPokemonArticleByNumero(pokemon.numero);
    });

    return li;
}

function displayPokemonArticleByNumero(numeroPokemon) {
    var pokemonArticle = document.getElementById(numeroPokemon);
    pokemonArticle.style.display = 'block';
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
    var linkArticle = document.createElement("a");
    var article = createPokemonArticle(pokemon);

    linkArticle.href = '#';
    linkArticle.appendChild(article);

    return linkArticle;
}

function createPokemonArticle(pokemon) {
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

    article.addEventListener("click", function () {
        removeAllDisplay();
        displayPokemonArticleByNumero(pokemon.numero);
    });

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

    aside.className = "aside-list caracteristique";
    aside.id = "caracteristique";
    aside.setAttribute("num-pokemon", pokemon.numero);
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

function getPokemonArticles() {
    return document.getElementsByClassName('pokemon-article');
}


// Fonctions liées à la recherche
function initSearch() {
    var buttonSearch = document.getElementById('button-search');
    buttonSearch.addEventListener("click", function(){search()});
}

function search() {
    initSearchEnums();
    var input = document.getElementById('input-search');
    var searchText = input.value;
    var regExp = new RegExp(searchText.trim(), 'i');
    var articles = [];

    var type = checkKindOfSearch(searchText);
    if (type) {
        var searchObject = findCaracteristiqueFromSearchText(searchText, type);
        regExp = new RegExp(searchObject.text, 'i');
        articles = findArticlesWithCaracteristique(searchObject, regExp)
    } else {
        articles = findArticlesWithText(searchText, regExp);
    }

    removeAllDisplay();
    if (articles || articles.length > 0) {
        displayArticles(articles);
    } else {
        displayTabArticles();
    }
}

function findArticlesWithCaracteristique(searchObject, regExp) {
    var articles=[];
    var asideCaracteristiques = document.getElementsByClassName("caracteristique");
    for(var i=0; i < asideCaracteristiques.length; i++) {
        var aside = asideCaracteristiques[i];
        var listeCaracteristique = aside.children[1];
        var li = listeCaracteristique.children[caracteristiques[searchObject.caracteristique].displayNum];

        if (hasTextInLiCaracteristique(li, regExp)) {
            console.log(aside.getAttribute('num-pokemon'));
            var article = document.getElementById(aside.getAttribute('num-pokemon'));
            articles.push(article);
        }
    }

    return articles;
}

function hasTextInLiCaracteristique(li, regExp) {
        var text = li.children[1].textContent;
        return isContainText(text, regExp)
}

function isContainText(textFind, regExp) {
    if (textFind.search(regExp) != -1) {
        return true;
    } else {
        return false;
    }
}


function initSearchEnums() {
    typeSearch = {
        EQUAL : {value: '='},
        GREATER_THAN : {value: '>'},
        LESS_THAN : {value: '<'},
        GREATER_EQUAL : {value: '>='},
        LESS_EQUAL : {value: '<='}
    };
    caracteristiques = {
        Famille : {value: 'Famille', displayNum:'0'},
        Taille : {value: 'Taille', displayNum:'1'},
        Poids : {value: 'Poids', displayNum:'2'},
        Talent : {value: 'Talent', displayNum:'3'}
    };
}

function findCaracteristiqueFromSearchText(searchText, searchType) {
    var splitTexts = searchText.split(searchType.value);
    var searchCaracteristique = splitTexts[0].trim();
    searchText = splitTexts[1].trim();

    var caracteristique = isCorrectCaracteristique(searchCaracteristique)
    if (caracteristique) {
        var searchObject = {
            caracteristique: caracteristique,
            type: searchType,
            text : searchText
        }
    } else {
        return false
    }

    return searchObject;
}

function isCorrectCaracteristique(searchCaracteristique) {
    for (var caracteristique in caracteristiques) {
        if (caracteristique == searchCaracteristique) {
            return caracteristique;
        }
    }

    return false;
}

function checkKindOfSearch(searchText) {
    var type;

    if (searchText.search(typeSearch.LESS_THAN.value) != -1) {
        if (searchText.search(typeSearch.LESS_EQUAL.value) != -1) {
            type = typeSearch.LESS_EQUAL;
        } else {
            type = typeSearch.LESS_EQUAL;
        }
    } else if (searchText.search(typeSearch.GREATER_THAN.value) != -1) {
        if (searchText.search(typeSearch.GREATER_EQUAL.value) != -1) {
            type = typeSearch.GREATER_EQUAL;
        } else {
            type = typeSearch.GREATER_THAN;
        }
    } else if (searchText.search(typeSearch.EQUAL.value) != -1) {
        type = typeSearch.EQUAL;
    } else {
        type = null;
    }

    return type;
}

function findArticlesWithText(text, regExp) {
    var pokemonArticles = getPokemonArticles();
    var articles = [];

    for (var i=0; i < pokemonArticles.length; i++) {
        var article = pokemonArticles[i];

        if (hasTextInArticle(article, text, regExp)) {
            articles.push(article);
        }
    }

    return articles;
}

function hasTextInArticle(article, text, regExp) {
    var textFind = '';
    for (var i = 0; i < article.childNodes.length; i++) {
        var child = article.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
            if (hasTextInArticle(child, text, regExp)) {
                return true;
            }
        } else if (child.nodeType === Node.TEXT_NODE) {
            textFind = child.nodeValue;
        }
        if (textFind.search(regExp) != -1) {
            return true;
        }
    }
    return false;
}

function displayArticles(articles) {
    for (var i=0; i< articles.length; i++) {
        displayPokemonArticleByNumero(articles[i].id);
    }
}


// Fonction pour générer les données relatifs aux pokémons (appeler une seule fois)
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
            description: "Herbizarre (anglais : Ivysaur ; japonais : フシギソウ Fushigisou) est un Pokémon de type Plante et Poison de la première génération.",
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