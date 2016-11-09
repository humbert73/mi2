function Pokemon(numero, nom, typePrincipal, description, image, famille, taille, poid, talents) {
    this.numero = numero;
    this.image = image;
    this.nom = nom;
    this.typePrincipal = typePrincipal;
    this.description = description;
    this.famille = famille;
    this.taille = taille;
    this.poid = poid;
    this.talents = talents;
}

function getPokemons() {
    var bulbasaur = new Pokemon(
        001,
        "Bulbizarre",
        "nature",
        "Bulbizarre (anglais : Bulbasaur ; japonais : フシギダネ Fushigidane) est le Pokémon de départ de type Plante offert par le Professeur Chen dans la région de Kanto. Il est le premier Pokémon du Pokédex National.",
        "http://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png",
        "Graine",
        "0.7m",
        "6.9kg",
        ["Engrais", "Chlorophylle"]
    );
    var charmander  = new Pokemon(
        001,
        "Salamèche",
        "feu",
        "Salamèche (anglais: Charmander ; japonais: ヒトカゲ Hitokage) est le Pokémon de départ de type Feu offert par le Professeur Chen dans la région de Kanto.",
        "http://cdn.bulbagarden.net/upload/7/73/004Charmander.png",
        "Lézard",
        "0,6m",
        "8,5kg",
        ["Brasier", "Force Soleil"]
    );
    return [bulbasaur, charmander];
}


function init() {
    var article = document.getElementsByTagName("article")[0];
    var pokemons = getPokemons();

    for (var i=0; i< pokemons.length; i++) {
        var pokemon = pokemons[i];
        var ul = document.createElement("ul");
        var liImage = document.createElement("li");
        var img = document.createElement("img");
        img.src = pokemon.image;
        img.width = 50;

        ul = createListElement(ul, pokemon.numero);
        ul.appendChild(liImage.appendChild(img));
        ul = createListElement(ul, pokemon.nom);
        ul = createListElement(ul, pokemon.typePrincipal);
        ul = createListElement(ul, pokemon.description);

        article.appendChild(ul);
    }
}

function createListElement(ul, value) {
    var li = document.createElement("li");
    li.innerHTML = value
    ul.appendChild(li);

    return ul;
}