const pokeApp = {};
//API info
pokeApp.baseUrl = `https://pokeapi.co/api/v2/type/`
pokeApp.pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`
//init method
pokeApp.init = () => {
    //by making this one it prevents undefined.(error in the console)
    pokeApp.eventListener();
    pokeApp.pokemonEventListener();
};

//method that gets the data from the API
pokeApp.getType = (q) => {

    fetch(`${pokeApp.baseUrl}${q}`)
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            pokeApp.getStats(response);
        })
}
//method to get pokemon from search bar
pokeApp.getUserPokemon = (q) => {
    fetch(`${pokeApp.pokemonUrl}${q}`)
    .then((res) => {
       if(res.ok === true){
        return res.json()
       } else{
        throw new Error(res.statusText);
       }
        
    })
    .then((response) => {
        pokeApp.getPokemon(response);     
    })

    .catch(error =>{
        alert('Oops! please try again');
    })
    
} 

// clear containers
pokeApp.clearContainers = function() {
    [...pokeApp.statContainer].forEach(container => {
        container.innerHTML = ''
    })
}
//target for all stat containers
pokeApp.statContainer = document.getElementsByClassName('statContainer')

//target diffrent stat containers
pokeApp.doubleDamageFromContainer = document.getElementById('doubleDamageFrom')

pokeApp.doubleDamageToContainer = document.getElementById('doubleDamageTo')

pokeApp.halfDamageFromContainer = document.getElementById('halfDamageFrom')

pokeApp.halfDamageToContainer = document.getElementById('halfDamageTo')

pokeApp.noDamageFromContainer = document.getElementById('noDamageFrom')

pokeApp.noDamageToContainer = document.getElementById('noDamageTo')


pokeApp.getStats = (response) => {
    pokeApp.clearContainers();
    //get to the different stat arrays
    pokeApp.doubleDamageFrom = response.damage_relations.double_damage_from

    pokeApp.doubleDamageTo = response.damage_relations.double_damage_to

    pokeApp.halfDamageFrom = response.damage_relations.half_damage_from

    pokeApp.halfDamageTo = response.damage_relations.half_damage_to

    pokeApp.noDamageFrom = response.damage_relations.no_damage_from

    pokeApp.noDamageTo = response.damage_relations.no_damage_to

    pokeApp.doubleDamageFrom.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.doubleDamageFromContainer.appendChild(pokeApp.listElement)
        
        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })

    pokeApp.doubleDamageTo.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.doubleDamageToContainer.appendChild(pokeApp.listElement)

        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })

    pokeApp.halfDamageFrom.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.halfDamageFromContainer.appendChild(pokeApp.listElement)

        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })

    pokeApp.halfDamageTo.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.halfDamageToContainer.appendChild(pokeApp.listElement)

        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })

    pokeApp.noDamageFrom.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.noDamageFromContainer.appendChild(pokeApp.listElement)

        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })

    pokeApp.noDamageTo.forEach(stat => {
        //create list element and append to ul
        pokeApp.listElement = document.createElement('li')
        pokeApp.noDamageToContainer.appendChild(pokeApp.listElement)

        //add pokemon type to list
        pokeApp.listElement.innerHTML = stat.name
    })
}

pokeApp.getPokemon = (response) => {
    console.log(response.sprites.front_default);

    pokeApp.pokemonImage = response.sprites.front_default;
    pokeApp.pokemonName = response.name;

    pokeApp.imgContainer = document.querySelector('.imageContainer');
    pokeApp.nameContainer = document.getElementById('pkmnName')

    pokeApp.image = document.createElement('img');
    pokeApp.image.src = pokeApp.pokemonImage;

    pokeApp.imgContainer.innerHTML = ''
    pokeApp.imgContainer.appendChild(pokeApp.image);
    pokeApp.nameContainer.textContent = pokeApp.pokemonName;

}

pokeApp.eventListener = () => {
    //target the thing we are listening to
    const radioButtons = document.getElementsByClassName("radioBtn");
[...radioButtons].forEach(button => {
        //add listener 
        button.addEventListener("click", (event) => {
            
            //prevent default form makes the blue btns dispear
            //    event.preventDefault() 
            //get the value from the btn
            const chosenType = event.target.value;
            //pass the chosen type into the api call
            pokeApp.getType(chosenType);
        })

    }) 

}
//pokemon search bar event listener
pokeApp.pokemonEventListener = () => {
    const form = document.querySelector('form');
    const inputElement = document.querySelector('input')
    form.addEventListener('submit', function(e){
        //prevent default form 
        e.preventDefault();
        
        //gets the user input 
        const userInput = inputElement.value;
       
        //input value passes to the getUserPokemon Api 
        pokeApp.getUserPokemon(userInput);
        inputElement.value = '';
    })
    
}

pokeApp.init();