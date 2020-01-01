//? One time calling main functions after body loads:
$(() => {
    init();
    start();
    $("#popupModal").html(popUp);

});//RF

// init cleans the main Gui and prepares it for new content
function init() {
    $("#main").html("");
    $("#main").html(spinner);
}

//0.Make the 1st API call, push the coins into global storage
function start() {
    if (coinDOM.cBig.length === 0) {
        api
            .getAllCoins()
            .then(coins => {
                //Have limited the coin pull to 500 but you can release the slice to get all 6400
                // coins.slice(0, 500).map(coin => {
                coins.map(coin => {
                    const newCoin = new CoinList(coin.id, coin.symbol, coin.name);
                    coinDOM.cBig.push(newCoin);
                });
            })
            .then(() => {
                draw(coinDOM.cBig);
            })
            .catch(e => console.log(e));
    } else {
        //no need to send api call if data already loaded
        draw(coinDOM.cBig);
    }
}
// 1.FLOW: start >> cbig (array) >> DRAW >> thecoin (-src.js) >> tossCoin (-src.js) >> returnedData
//* this is the main GUI for generating coin cards:
function draw(coinGUI) {
    let content = "";
    for (const coin of coinGUI) {
        content += theCoin(coin);
    }
    $("#main").html(content);
}

// the tossCoin fills the csmall arr with [MORE INFO] after a once in 2 minutes api call
function tossCoin(coinId) {
    console.log(coinId)

    api.gatOneCoin(coinId).then(coins => {
        console.log("lets see", coins)
        // Utilising unshift for easier[0] then[arr.length - 1] retrieval
        coinDOM.cSmall.unshift(coins);
        let imageSource = coinDOM.cSmall[0].image.large;
        let altImage = coinDOM.cSmall[0].id;
        let dollar = coinDOM.cSmall[0].market_data.current_price.usd.toPrecision(2);
        let euro = coinDOM.cSmall[0].market_data.current_price.eur.toPrecision(2);
        let ils = coinDOM.cSmall[0].market_data.current_price.ils.toPrecision(2);
        returnedData(imageSource, altImage, dollar, euro, ils, coinId);

        setTimeout(() => {
            for (const coinId of coinDOM.cSmall) {
                if (coinDOM.cSmall.coinId == this.coinID) {
                    delete coinDOM.cSmall[0];
                }
            }
        }, 120000);
    });

}
//* after we made the 2nd api call on toss we now return the data into more info on each card
function returnedData(imageSource, altImage, dollar, euro, ils, coinId) {
    $("#SP" + coinId).hide();
    var coinImage = $('<img class="card-img-top mx-auto rounded-circle" >');
    coinImage.attr("src", imageSource);
    coinImage.attr("alt", altImage);
    $("#IMG" + coinId).html(coinImage);
    $("#D" + coinId).html(dollar);
    $("#E" + coinId).html(euro);
    $("#S" + coinId).html(ils);
}

// ready the selected coins to the popup, later for the live reports
// 2. FLOW: tossCoin >> selectCoin >> modal/ live button>> buildFiveItems >> 3rd api call
function selectCoin(coinID) {

    var index = coinDOM.cSmall.indexOf(coinID);
    if (index === -1) {
        coinDOM.cSmall.push(coinID);
        console.log(coinDOM.cSmall)
    } else {
        coinDOM.cSmall.splice(index, 1);
        console.log(coinDOM.cSmall)
    }
    if (coinDOM.cSmall.length > 5) {
        modalStart();
    }
}
// splitting the selected coin array into 5 coins
function buildFiveItems(coinArr) {
    // something went terribly wrong ( - :) switching to manual operation untill resolve
    // I'm gettin undefined on various api calls- but on others it works perfectly....  
    //? I'm aware of the unnecesary api calls- but this is the right direction.

    for (let i = 0; i < coinArr.length; i++) {

        api.getCoinInfo(coinArr[i])

    }
}
