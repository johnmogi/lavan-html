//This is the ITEM STORAGE file, functions and actions are on [main.js] - this file reduces the clutter...

const spinner = `<img id="spinner" src="./images/spinner.svg" alt="Loading content..." />`
const spinner2 = `<img src="images/Cube-1.7s-207px.gif" alt ="one moment please, fetching coin" />`

// 3 storage databases inside a global object for easy data draw.
coinDOM = {
    cBig: [],
    cSmall: [],
    cSelect: [],
    cResult: []
}
// Have decided to stick with classes, overall seems more elegant- looking for a better structure....
class CoinList {
    constructor(id, symbol, name, isSelected) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.selected = false;
        this.isSelected = isSelected
        this.isShowInfo = false
    }
}

class CoinInfo extends CoinList {
    constructor(image, isSelected) {
        super(isSelected)
        this.image = image.thumb;
        this.cpUsd = market_data.current_price.usd;
        this.cpEur = market_data.current_price.eur;
        this.cpIls = market_data.current_price.ils;
        this.showCoinInfo = false;
    }
}


// api's links
const config = {
    currenciesCoin: "‪https://api.coingecko.com/api/v3/coins/list",
    currencyById: "https://api.coingecko.com/api/v3/coins",
    comparePrice: "https://min-api.cryptocompare.com/data",
    realCompareCoins: "https://min-api.cryptocompare.com/data/all/coinlist",
    // realCompareCoins-  this is their supported coins list, any other will get undefined....
    // guess I'll need to rebuild their or make other call- maybe next-time? but it does heavilly affect the project (: 
    locatedAllMarkets: "https://min-api.cryptocompare.com/data/all/exchanges"
}

// prepearing the 3 api's calls support
const api = {
    getAllCoins: () => {
        return $.ajax({
            // url: `https://min-api.cryptocompare.com/data/all/exchanges`,
            // maybe in the future will build this using this link.
            url: `https://api.coingecko.com/api/v3/coins/list?‬‬`,
            method: 'get'
        });
    },
    gatOneCoin: (coinID) => {
        return $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${coinID}`,
            method: 'get',
            success: coins => {
                coinDOM.cResult.push(coins)

            }
        });
    },
    // most of the coins do not work... ask me about it and I'll gladly explain...
    getCoinInfo: (coin) => {
        return $.ajax({
            url: `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=BTC,USD,EUR`,
            method: 'get',
            success: coins => {
                coinDOM.cResult.push(coins),
                    console.log("what", coinDOM.cResult)

            }

        });
    }, getRealCoins: () => {
        return $.ajax({
            url: `https://min-api.cryptocompare.com/data/all/exchanges`,
            method: 'get'
        });
    },
};
// https://min-api.cryptocompare.com/data/pricemulti?fsyms=bit&ils&tsyms=USD

//? THE DRAW - how to build the card grid without createlement but in the most flexible way- a func.


// I decided to revert the backTick into a function- it's slightly more elegant...
function theCoin(coin) {
    const theCoin = `
    <div class="card text-white bg-dark mb-1 col-4" id="${coin.id}">
    <div class="card-header">
        <div class="switch">
            <label>
                <input type="checkbox" name="checkbox"
                    onclick='selectCoin("${coin.symbol}")' />
                <span class="lever"></span>
            </label>
            <h6 id="symbol">${coin.name}</h6>
        </div>
    </div>
    <div class="card-body bg-light text-dark">
        <h6 class="card-title">${coin.symbol}</h6>
        <p class="card-text">${coin.id}</p>
        <p>
            <a class="btn btn-primary" data-toggle="collapse"
                onclick='tossCoin("${coin.id}")' href="#M${coin.id}" role="button"
                aria-expanded="false" aria-controls="M${coin.id}">More Info</a>
        </p>
        <div class="collapse multi-collapse card-footer" id="M${coin.id}">
            <div id="SP${coin.id}">
                <img src="images/Cube-1.7s-207px.gif"
                    alt="one moment please, fetching coin" width="180" />
            </div>
            <div id="IMG${coin.id}"></div>
            <div class="colapser">
                <div class="row2 " id="mini${coin.id}">
                    <div class="card-footer">
                        <small class="text-muted">
                            <h6 class="card-title">${coin.symbol}</h6>
                            <div class="col">EUR rate:<span id="E${coin.id}"></span>€
                            </div>
                            <div class="col">USD rate:<span id="D${coin.id}"></span>$
                            </div>
                            <div class="col">ILS rate:<span id="S${coin.id}"></span>₪
                            </div>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-footer bg-dark">
    </div>
</div>
  `
    return theCoin
}


function modalStart() {
    $("#myCfmModal").modal("show");

    let content = "";
    for (const t of coinDOM.cSmall) {
        let popCoin = `
    <div class="card text-dark bg-white col-6" id="${t}">
          <div class="card-header2">
          <h5 id="symbol">${t}</h5>
          
            <div class="switch dark-bg">
              <label>
                <input type="checkbox" name="checkbox" onclick='selectCoin("${t}")' />
                <span class="lever"></span>
              </label>
              </div>
            </div> 
        </div>
        `
        content += popCoin;
    }
    $("#mBody").html(content)
    //! known visual bug- returning the checkboxes select after the modal exit
}


const popUp = `
<div class="modal fade" id="myCfmModal" tabindex="-1" role="dialog" aria-labelledby="this section lets you select coins, you can select up to 5 coins" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <h5 class="modal-title text-dark">You can only run the report on up to 5 coins...</h5>

      <div class="modal-header">
        <h6 class="modal-title text-dark" id="myCfmModalText">Kindly choose those coins you'd like to remove</h6>
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close this section and go back to ">
        <span aria-hidden="true">&times;</span>

        </button>
      </div>
      <p class="text-info mx-auto">Once chosen, proceed to live reports</p>

      <div class="modal-body row" id="mBody">
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>

      </div>
    </div>
  </div>
`