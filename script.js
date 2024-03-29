const pokeApp = {};
//API info
pokeApp.baseUrl = `https://pokeapi.co/api/v2/type/`;
pokeApp.pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;
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
      return res.json();
    })
    .then((response) => {
      pokeApp.getStats(response);
    });
};

//method to get pokemon from search bar
pokeApp.getUserPokemon = (q) => {
  fetch(`${pokeApp.pokemonUrl}${q}`)
    .then((res) => {
      if (res.ok === true) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((response) => {
      pokeApp.getPokemon(response);
    })

    .catch((error) => {
      alert(`Sorry! We couldn't find the Pokemon you were looking for`);
    });
};

//function that gets the battle data from the API with users search input

//create array to store type objects from response to loop through later if there is a pokemon with more than 1 type

const array = [];

pokeApp.getTypeFromUserSearch = (q) => {
  fetch(`${q}`)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      pokeApp.getStats(response);
      array.push(response);
    });
};

// clear containers
pokeApp.clearContainers = function () {
  [...pokeApp.statContainer].forEach((container) => {
    container.innerHTML = "";
  });
};
//target for all stat containers
pokeApp.statContainer = document.getElementsByClassName("statContainer");

//target diffrent stat containers
pokeApp.doubleDamageFromContainer = document.getElementById("doubleDamageFrom");

pokeApp.doubleDamageToContainer = document.getElementById("doubleDamageTo");

pokeApp.halfDamageFromContainer = document.getElementById("halfDamageFrom");

pokeApp.halfDamageToContainer = document.getElementById("halfDamageTo");

pokeApp.noDamageFromContainer = document.getElementById("noDamageFrom");

pokeApp.noDamageToContainer = document.getElementById("noDamageTo");

//function that gets the stength/weakness types and displays it on the page
pokeApp.getStats = (response) => {
  //get to the different stat arrays
  pokeApp.doubleDamageFrom = response.damage_relations.double_damage_from;

  pokeApp.doubleDamageTo = response.damage_relations.double_damage_to;

  pokeApp.halfDamageFrom = response.damage_relations.half_damage_from;

  pokeApp.halfDamageTo = response.damage_relations.half_damage_to;

  pokeApp.noDamageFrom = response.damage_relations.no_damage_from;

  pokeApp.noDamageTo = response.damage_relations.no_damage_to;

  pokeApp.doubleDamageFrom.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.doubleDamageFromContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  pokeApp.doubleDamageTo.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.doubleDamageToContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  pokeApp.halfDamageFrom.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.halfDamageFromContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  pokeApp.halfDamageTo.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.halfDamageToContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  pokeApp.noDamageFrom.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.noDamageFromContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  pokeApp.noDamageTo.forEach((stat) => {
    //create list element and append to ul
    pokeApp.listElement = document.createElement("li");
    pokeApp.noDamageToContainer.appendChild(pokeApp.listElement);

    //add pokemon type to list
    pokeApp.listElement.innerHTML = stat.name;
  });

  array.length = 0;
};

//picture and pokemon name display
pokeApp.getPokemon = (response) => {
  //grab pkmn picture
  pokeApp.pokemonImage = response.sprites.front_default;

  //grab pkmn name
  pokeApp.pokemonName = response.name;

  //target ul for type list and clear if any existing info
  const pokemonTypeUl = document.getElementById("typeList");
  pokemonTypeUl.innerHTML = "";

  //grab pkmn type, if more than one, loop through array and list both
  pokeApp.pokemonType = response.types.forEach((object) => {
    //create and li and insert name of pokemon, then append to ul
    pokeApp.pokemonTypeLi = document.createElement("li");
    pokeApp.pokemonTypeLi.textContent = object.type.name;
    pokemonTypeUl.appendChild(pokeApp.pokemonTypeLi);

    //take type response url and put into seperate function that also gets battle data.
    //issue with pkmn with multiple types
    // console.log(object.type.url)
    pokeApp.getTypeFromUserSearch(object.type.url);
  });

  // array.length = 0

  pokeApp.imgContainer = document.querySelector(".imageContainer");
  pokeApp.nameContainer = document.getElementById("pkmnName");

  pokeApp.image = document.createElement("img");
  pokeApp.image.src = pokeApp.pokemonImage;

  pokeApp.imgContainer.innerHTML = "";
  pokeApp.imgContainer.appendChild(pokeApp.image);
  pokeApp.nameContainer.textContent = pokeApp.pokemonName;
};

//radio button event listener
pokeApp.eventListener = () => {
  //target the thing we are listening to
  const radioButtons = document.getElementsByClassName("radioBtn");
  [...radioButtons].forEach((button) => {
    //add listener
    button.addEventListener("click", (event) => {
      pokeApp.clearContainers();

      //prevent default form makes the blue btns dispear
      //    event.preventDefault()
      //get the value from the btn
      const chosenType = event.target.value;
      //pass the chosen type into the api call
      pokeApp.getType(chosenType);
    });
  });
};

//pokemon search bar event listener
pokeApp.pokemonEventListener = () => {
  const form = document.querySelector("form");
  const inputElement = document.querySelector("input");
  form.addEventListener("submit", function (e) {
    pokeApp.clearContainers();
    //prevent default form
    e.preventDefault();

    //gets the user input
    const userInput = inputElement.value;
    const userInputLowerCase = userInput.toLowerCase();

    //input value passes to the getUserPokemon Api
    pokeApp.getUserPokemon(userInputLowerCase);
    inputElement.value = "";
  });
};

pokeApp.init();
