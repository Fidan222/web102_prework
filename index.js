/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

//

    // loop over each item in the data
    function addGamesToPage(games) {
        // Loop over each item in the data
        games.forEach((game) => {
            // Create a new div element, which will become the game card
            const gameCard = document.createElement('div');
            
            // Add the class game-card to the list
            gameCard.classList.add('game-card');
            
            // Set the inner HTML using a template literal to display some info about each game
            gameCard.innerHTML = `
                <img src="${game.img}" alt="${game.name}" class="game-img" />
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
                <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
                <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
            `;
    
            // Append the game card to the games-container
            gamesContainer.appendChild(gameCard);
        });
    }
    
    // Call the function we just defined using the correct variable
    // Later, we'll call this function using a different list of games
    addGamesToPage(GAMES_JSON);
        
    
        
       
    

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // append the game to the games-container
    
// call the function we just defined using the correct variable



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (total, game) => {
    return total + game.backers;
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with comma
contributionsCard.innerHTML=totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (total, game) => {
    return total + game.pledged;
},0);

// set inner HTML using template literal

raisedCard.innerHTML= totalRaised.toLocaleString();
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML= GAMES_JSON.length.toLocaleString();



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listofnotfundedgames = GAMES_JSON.filter((game)=>{
        return game.pledged <= game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listofnotfundedgames);

    console.log(`${listofnotfundedgames.length}`);
}
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listoffundedgames = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listoffundedgames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);

fundedBtn.addEventListener("click", filterFundedOnly);

allBtn.addEventListener("click", showAllGames);
 


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const listofnotfundedgames = GAMES_JSON.filter(game => game.pledged < game.goal);

// use the function we previously created to add the unfunded games to the DOM
addGamesToPage(listofnotfundedgames);

// create a string that explains the number of unfunded games using the ternary operator
 const strDis = `A total of ${totalRaised} has been raised for ${gamesCard.innerHTML} games. Currently, ${listofnotfundedgames.length} game${listofnotfundedgames.length !== 1 ? 's' : ''} remains unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.textContent = strDis;

// Append the new element to the description container
descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [item1, item2, ...other] = sortedGames;

firstGameContainer.innerHTML = `🥇 Top Funded Game:  ${sortedGames[0].name}`;
secondGameContainer.innerHTML = `🥈 Runner-Up:  ${sortedGames[1].name}`;