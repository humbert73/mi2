function init() {
    var pokemons = getPokemons();

    initMenu(pokemons);
    initIndexPokemonsArticles(pokemons);
}

function initPokemon() {
    var pokemons = getPokemons();
    var url = window.location.search;
    var numero = parseInt(url.substring(url.lastIndexOf("=") + 1));

    initMenu(pokemons);
    initPokemonArticle(pokemons[numero - 1]);
}

function initMenu(pokemons) {
    var div = document.getElementById("pokemons");
    var ul = document.createElement("ul");

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];
        var li = createPokemonLiForMenu(pokemon);
        ul.appendChild(li);
    }
    div.appendChild(ul);
}

function initPokemonArticle(pokemon) {
    var section = document.getElementsByTagName("section")[0];
    var article = createIndexPokemonArticle(pokemon);
    var articleSection = createArticleSection(pokemon);
    article.appendChild(articleSection);

    section.appendChild(article);
}

function createPokemonLiForMenu(pokemon) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = encodeURI("pokemon.html?num=" + pokemon.numero);
    a.innerHTML = pokemon.nom;
    // a.onclick = window.open('www.yourdomain.com', '_blank');
    li.appendChild(a);

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

    var div = document.createElement("div");
    var img = document.createElement("img");
    img.src = pokemon.image;
    img.width = 150;
    div.appendChild(img);
    article.appendChild(div);

    var div = document.createElement("div");
    var img = document.createElement("img");
    img.src = pokemon.typePrincipal;
    div.appendChild(img);
    article.appendChild(div);

    var p = document.createElement("p");
    p.innerHTML = pokemon.description;
    article.appendChild(p);

    return article;
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
    aside.className = "aside-list";
    aside.id = "caracteristique";
    var ul = document.createElement("ul");
    var header = document.createElement("header");
    var h2 = document.createElement("h2");

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
    h2.innerHTML ="Evolution des sprites tout au long des générations";
    header.appendChild(h2);

    var ul = document.createElement("ul");

    // création des sprite pour chaque génération
    for (var sprite in pokemon.spritesByGeneration) {
        ul.appendChild(createSpriteLi(pokemon, sprite));
    }

    aside.appendChild(ul);

    return aside
}

function createSpriteLi(pokemon, sprite) {
    // création de la colonne de gauche => Affichage du numéro de la génération
    var divColLeft = document.createElement("div");
    divColLeft.className = "col-left";
    var h4 = document.createElement("h4");
    h4.innerHTML = "Génération "+sprite+" :";
    divColLeft.appendChild(h4);

    // création de la colonne de droite => Affichage du sprite de la génération en cours
    var divColRight = document.createElement("div");
    divColRight.className = "col-right";
    var img = document.createElement("img");
    img.src = pokemon.spritesByGeneration[sprite];
    divColRight.appendChild(img);

    // ajout des colonnes à l'élément li
    var li = document.createElement("li");
    li.appendChild(divColLeft);
    li.appendChild(divColRight);

    return li;
}

function addCaracteristiqueLiToUl(pokemon, caracteristique) {
    var h4 = document.createElement("h4");
    var li = document.createElement("li");
    var divColLeft = document.createElement("div");
    var divColRight = document.createElement("div");

    // Colonne de gauche pour un type de caractéristique
    h4.innerHTML = caracteristique+" :";
    divColLeft.className = "col-left";
    divColLeft.appendChild(h4);

    // Colonne de droite pour un type de caractéristique
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
        var li_caracteristique = document.createElement("li");
        li_caracteristique.innerHTML = pokemon.caracteristiques[caracteristique];
        divColRight.appendChild(li_caracteristique);
    }

    li.appendChild(divColLeft);
    li.appendChild(divColRight);

    return li;
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
        },{
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
        },{
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
        },{
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