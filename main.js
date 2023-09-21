const container = document.querySelector('#pokemon-container');
const spinner = document.getElementById('spinner');

const previus = document.getElementById('previous');
const next = document.getElementById('next');

let offset = 1;
let limit = 8;
console.log(previus);
console.log(next);


previus.addEventListener('click', () => {
    if(offset!=1){
        offset -= 9;
        removeChildNodes(container);
        createPokemon(offset, limit);
    }
});
next.addEventListener('click', () => {
    offset += 9;
    removeChildNodes(container)
    createPokemon(offset, limit);
});



const url = 'https://pokeapi.co/api/v2/pokemon/';

const fetchDataPokemon = async (id) => {
    try {
        const response = await fetch(url+id);
        const data = await response.json();
        console.log(data);
        createCardPokemon(data);
        spinner.style.display = 'none';
        
    } catch (error) {
        console.log(error);
    }
}

function createCardPokemon(pokemon){

    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const CardContainer = document.createElement('div');
    CardContainer.classList.add('card-container');
    
    flipCard.appendChild(CardContainer);



    const cardPokemon = document.createElement('div');
    cardPokemon.classList.add('pokemon-block');
    const id = document.createElement('p');
    id.innerHTML = `#${pokemon.id.toString().padStart(3, '0')}`;
    const nombre = document.createElement('h2');
    nombre.classList.add('name');
    nombre.innerText = pokemon.name;
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    imageContainer.appendChild(image);

    cardPokemon.appendChild(id);
    cardPokemon.appendChild(imageContainer);
    cardPokemon.appendChild(nombre);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    cardBack.appendChild(progressBars(pokemon.stats));

    CardContainer.appendChild(cardPokemon);
    CardContainer.appendChild(cardBack);

    container.appendChild(flipCard);
}


function progressBars(stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');

    for(let i = 0; i < stats.length; i++){
        const stat = stats[i];

        const statPercent = (stat.base_stat /2) +"%";

        const statContainer = document.createElement('div');
        statContainer.classList.add('stat-container');

        
        const statName = document.createElement('div');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add('progress');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progress.setAttribute("Aria-valuenow", stat.base_stat);
        progress.setAttribute("Aria-valuemin", "0");
        progress.setAttribute("Aria-valuemax", "200");
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
        
    }
    return statsContainer;
}


function createPokemon(offset, limit){
    spinner.style.display = 'block';
    for(let i = offset; i <= offset+limit; i++){
        fetchDataPokemon(i);
    }
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

createPokemon(offset, limit);