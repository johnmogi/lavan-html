$(() => {
    // This section covers most of the navigation parts, it holds some language and search functionality
    //      [HOMEPAGE-page]
    $("#coinio").click(() => {
        $("#hero").load("/pages/home.html");
    });
    $("#home").click(() => {
        $("#dataInfo").removeClass("alert-info", "alert-success", "alert-danger").addClass("alert-info")
        $("#dataInfoText")
            .html(`<strong>Wellcome to CryptoCoin.io!</strong> 
        Use the toggle button to select up to 5 coins for
        reports.`)
        init();
        start();
        $("#hero").load("/pages/home.html");
    });
    //      [LIVE-REPORTS-page]
    $("#live").click(() => {
        if (coinDOM.cSmall.length < 1 || coinDOM.cSmall.length > 5) {
            $("#dataInfo").removeClass("alert-info", "alert-success", "alert-danger").addClass("alert-danger")
            $("#dataInfoText").html("<strong>Holy guacamole!</strong> You must select 5 coins for comparison")
        } else {

            //the above validation makes sure there is at least one coin selected, we allready took care the 5 limit
            // cSmall == > USD,JPY,EUR,ILS o2t https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR,ILS,300
            //! trying to resolve "wrong" data
            // buildFiveItems("USD", "JPY", "EUR", "ILS", "300")
            buildFiveItems(coinDOM.cSmall)
            // fix sending unindentified calls
            $("#dataInfo").removeClass("alert-danger", "alert-info").addClass("alert-info")
            $("#dataInfoText").html("<strong>WELLCOME TO THE LIVE REPORTS</strong>")
            $("#main").load("/pages/liveReports.html");
        }
    });

    //      [ABOUT-page]
    $("#about").click(() => {
        init();
        $("#main").load("/pages/about.html");
    });

    //      [SEARCH]
    $('#search-btn').on('click', function () {
        let val = $('#search-input').val()
        if (!val || val.length < 2) {
            $("#dataInfo").removeClass("alert-info", "alert-success").addClass("alert-danger")
            $("#dataInfoText").html("<strong>Looks empty in here, </strong>please try to search again, with a different text perhaps")
            return
        }
        const result = searchAction(coinDOM.cBig);
        $('#search-input').val('');
        result.length === 0 ? draw(coinDOM.cBig) : draw(result);
    });
    function searchAction(coinArr) {
        const searchTerm = $('#search-input').val();
        const result = coinArr.filter((coin) => coin.symbol.includes(searchTerm));
        return result;
    }
    // this part is to prevent the searchform enter submission
    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});//RF


