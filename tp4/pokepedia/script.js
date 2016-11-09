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
    var aside = createCaracteristiqueAside(pokemon);
    section.appendChild(aside);

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

    console.log(pokemon['caracteristiques']);
    for (caracteristique in pokemon['caracteristiques']) {
        var li = addCaracteristiqueLiToUl(pokemon, caracteristique);
        ul.appendChild(li);
    }

    // ul.appendChild(li);
    aside.appendChild(ul);


    return aside;
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

// function Pokemon(numero, nom, typePrincipal, description, image, famille, taille, poid, talents) {
//     this.numero = numero;
//     this.image = image;
//     this.nom = nom;
//     this.typePrincipal = typePrincipal;
//     this.description = description;
//     this.taille = taille;
//     this.caracteristiques = {
//         Famille: famille,
//         Taille: taille,
//         Poids: poid,
//         Talents: talents
//     }
//
//     this.getCaracteristiques = function () {
//         return [this.caracteristiques];
//     }
// }

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
            }
        }
    ];

    return pokemons;
}