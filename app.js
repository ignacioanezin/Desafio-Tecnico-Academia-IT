const pokedex = document.getElementById("pokedex");
const searchField = document.getElementById("searchBar");
let pokemon = [];

searchField.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const searchString = e.target.value;
  const filteredPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.includes(searchString) || pokemon.id == searchString;
  });
  displayPokemon(filteredPokemon);
});

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 200; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises).then((results) => {
    pokemon = results.map((data) => ({
      name: data.name,
      image: data.sprites.other["dream_world"]["front_default"],
      types: data.types.map((type) => type.type.name).join(", "),
      id: data.id,
      xp: data.base_experience,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities
        .map((abilities) => abilities.ability.name)
        .join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
  <li class="card">
    <h2 class="card-name">${pokeman.id}. ${pokeman.name}</h2>
    <img class="card-image" src="${pokeman.image}">
    <p class="card-type">Tipo: ${pokeman.types}</p>
    <p class="card-xp">XP: ${pokeman.xp}</p>
    <p class="card-height">Altura: ${pokeman.height}</p>
    <p class="card-weight">Peso: ${pokeman.weight}</p>
    <p class="card-abilities">Habilidades: ${pokeman.abilities}</p>
</li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
