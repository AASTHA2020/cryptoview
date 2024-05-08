let coin_list = document.querySelector(".coin_list");
let input = document.querySelector("input");
let search_btn = document.querySelector(".search_btn");

// Adding event listener to the search button
search_btn.addEventListener("click", async () => {
    let coins = await fetchApi(input.value);
    console.log(coins);
    displayListOFCoins(coins.coins);
});

async function fetchApi(coin_name) {
    let response = await fetch(`https://api.coingecko.com/api/v3/search?query=${coin_name}`);
    let result = await response.json();
    return result;
}
 
//display the list of coins
function displayListOFCoins(coinList) {
    coin_list.innerHTML = ""; // Clearing previous content
    coinList.forEach(element => {
        let eachCoin = document.createElement("div");
        eachCoin.classList.add("list-item");
        
        eachCoin.innerHTML = `
            <div class="name_container">
                <img src="${element.thumb}">
                <span class="name">${element.name} ${element.symbol}</span>
            </div>
            <button onclick='moreInfo("${element.id}")'>more info</button>`;
        coin_list.appendChild(eachCoin);
    });
}

//FUNCTION FOR MORE INFO
async function moreInfo(coinname) {
    let coin_info = await fetch(`https://api.coingecko.com/api/v3/coins/${coinname}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    let result = await coin_info.json();
    console.log(result);
    // price information for different currencies
    const inr = result.market_data.current_price.inr;
    const usd = result.market_data.current_price.usd;
    const eur = result.market_data.current_price.eur;
    const gbp = result.market_data.current_price.gbp;

    // detailed information about the coin
    document.querySelector("main").style.display = "none"; // Hiding the main content
    document.querySelector("#more_info").style.display = "flex"; // more info section
    document.querySelector("#more_info").innerHTML = `
        <h1>${result.name}</h1>
        <div><img src="${result.image.large}"></div>
        <h2>Price</h2>
        <div class="prices">
            <span style="color:white;">INR: ${inr}</span>
            <span style="color:white;">USD: ${usd}</span>
            <span style="color:white;">EUR: ${eur}</span>
            
            <span style="color:white;">GBP: ${gbp}</span>
        </div>
        <div style="color:white; margin-top: 20px;">
            <h2>Description:</h2>
            <p style="text-align: justify;">${result.description.en}<p>
        </div>`;
}

