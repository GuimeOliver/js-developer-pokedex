const pokeApi = {}


function convertPokeApi(poke){
    const pokemon = new Pokemon()
    pokemon.number = poke.id
    pokemon.name = poke.name

    const types = poke.types.map((slot) => slot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = poke.sprites.other.dream_world.front_default
    pokemon.height = poke.height/10
    pokemon.weight = poke.weight/10

    const abilities = poke.abilities.map((ability) => ability.ability.name)
    const [abilitie] = abilities
    
    pokemon.abilities = abilities
    pokemon.abilitie = abilitie 
    
    const status = poke.stats.map((base) => base.base_stat)
    const [hp , atk , def , satk , sdef , spd] = status 
    
    pokemon.hp = hp
    pokemon.atk = atk
    pokemon.def = def
    pokemon.satk = satk
    pokemon.sdef = sdef
    pokemon.spd = spd

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApi)
}
pokeApi.getPokemons = (offset = 0 , limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBoby) => jsonBoby.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)

}
pokeApi.getInfoPokemons = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    return fetch(url)
    .then((tudao) => tudao.json())
    .then(convertPokeApi)
}