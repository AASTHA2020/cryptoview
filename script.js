// Get the container where we will display the top coins
let top_coins_container = document.querySelector("#top-coins");

// Fetch data from an API
fetchApi();

// Call the function to display top coins
top_coins();

// Function to fetch data from the API
async function fetchApi() {
    // Get data from the API
    let response = await fetch("https://api.coingecko.com/api/v3/search/trending");
    // Convert the data to JSON format
    let result = await response.json();
    // Log the data to the console
    console.log(result);
    // Return the data
    return result;
}

// Function to display top coins
async function top_coins() {
    // Get the list of coins from the fetched data
    let coins_list = await fetchApi();
    // Call a function to display the coins
    displayCoins(coins_list.coins);
}

// Function to display individual coins
function displayCoins(coins) {
    // Loop through each coin in the list
    coins.forEach(element => {
        // Create a container for each coin
        let coin_container = document.createElement("div");
        // Add a class to the container
        coin_container.classList.add("top");
        // Add HTML content to the container
        coin_container.innerHTML = `<img src="${element.item.small}"><div><h3>${element.item.name}</h3><p>₹ ${(2884587.19*element.item.price_btc).toFixed(4)}</p></div>`;
        // Append the container to the top_coins_container
        top_coins_container.appendChild(coin_container);
    });
}
