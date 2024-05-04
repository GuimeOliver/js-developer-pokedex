const pokemonList = document.getElementById('pokemonList')
const buttonPag = document.getElementById('loadMoreButton')
const buttonPagTwo = document.getElementById('loadMoreButtonTwo')
let limit = 12
let offset = 0



function loadDetailPokemons (pokemons){
    pokeApi.getInfoPokemons(pokemons).then((painelDetail) => {
        
        const newPainel = `
        <section id='body' class="info">
        <div class="ilustra ${painelDetail.type}">    
                <img src=${painelDetail.photo}>
            </div>

            <li class ="topo">
                <span class="name">${painelDetail.name}</span>
                <span class="number">#0${painelDetail.number}</span>
            </li>

            <div class="detail">
                <ol class="types">
                    ${painelDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>     
            </div>      

            <div class="status">

                <ol class="atks">
                    <ol class="modelStatus">  <li class="model"> HP </li> <li class="pokeStatus">${painelDetail.hp}</li>  </ol>  
                    <ol class="modelStatus">  <li class="model"> ATK </li> <li class="pokeStatus">${painelDetail.atk}</li>  </ol>  
                    <ol class="modelStatus">  <li class="model"> DEF </li> <li class="pokeStatus">${painelDetail.def}</li>  </ol>  
                    <ol class="modelStatus">  <li class="model"> SATK </li> <li class="pokeStatus">${painelDetail.satk}</li>  </ol> 
                    <ol class="modelStatus">  <li class="model"> SDEF </li> <li class="pokeStatus">${painelDetail.sdef}</li>  </ol> 
                    <ol class="modelStatus">  <li class="model"> SPD </li> <li class="pokeStatus">${painelDetail.spd}</li>  </ol> 
                </ol>


                <ol class="descri">
                    <ol class="peta"> <li class="caracte"> Tamanho: </li>    <li class="dif">${painelDetail.height}m</li>  </ol>
                    <ol class="peta"> <li class="caracte"> Peso: </li>       <li class="dif">${painelDetail.weight} kg</li>  </ol>
                    <ol class="peta"> <li class="caracte"> Habilidade:</li>  <li class="dif">${painelDetail.abilitie}</li>  </ol>
                </ol>

            </div>
            
            <div class="pagina">
                <button id="loadMoreButtonClose" type="button" onClick="fazOSimples()">
                    Fechar
                </button>
            </div>
            </section>
        `
        pokemonList.innerHTML = newPainel 
        
    })
}
function loadPokemonItens(limit, offset){
    pokeApi.getPokemons(offset , limit).then((pokeList = []) => {
        const newHtml = pokeList.map((poke) => `
            <li class="pokemon ${poke.type}" onClick="clicarPoke(${poke.number})">
                <div class="topo">
                    <span class = "name">${poke.name}</span>
                    <span class = "number">#${poke.number}</span>
                </div>

                <div class="detail">
                    <ol class="types">
                        ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${poke.photo}"
                    alt="${poke.name}">
                </div>
            </li>
        `).join('')

    pokemonList.innerHTML = newHtml
    
})
}



loadPokemonItens(limit, offset)



buttonPag.addEventListener('click' , () => {
    if (offset < 132) {
        offset += limit
        loadPokemonItens(limit , offset)
        buttonPagTwo.disabled = false; 
    
    }else if(offset == 132){
        offset += limit
        limit = 7
        loadPokemonItens(limit , offset)
        buttonPag.disabled = true;
    }
})

buttonPagTwo.addEventListener('click' , () => {  
    if (offset < 12) {
        buttonPagTwo.disabled = true
    } else{
        limit = 12
        offset -= limit
        loadPokemonItens(limit , offset)
        buttonPag.disabled = false;   
    } 
})

const clicarPoke = async (id) => {
    pokemonList.classList.toggle('pokemonsMenu')
    loadDetailPokemons(id)
    buttonPag.disabled = true
    buttonPagTwo.disabled = true
}

const fazOSimples = async () => {
    pokemonList.classList.toggle('pokemonsMenu')
    loadPokemonItens( limit , offset )
    buttonPag.disabled = false
    buttonPagTwo.disabled = false
} 



    
    