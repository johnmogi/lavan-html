const express = require("express");

const server = express();

// get האזן לכתובת הראשית עבור גלישת
server.get("/", (request, response) => {
    response.send("Welcome to our SmartPhone Website"); // החזר מחרוזת ללקוח
});

// get עבור /weather האזן לכתובת
server.get('/phones', function (req, res, next) {

    // router.get("/phones", (request, response) => {

    const phones = [{
        id: 1,
        code: "sg500",
        manufacturer: "Nokia1",
        model: "5dd",
        price: "250$"
    }, {
        id: 2,
        code: "fgg33",
        manufacturer: "Samsung",
        model: "S10",
        price: "1000$"
    }, {
        id: 3,
        code: "crap",
        manufacturer: "Apple",
        model: "Iphone100",
        price: "10000000$"
    }];
    res.json(phones); // ללקוח json החזרת
});

server.get("/phone/:id", (req, res) => {

    const id = +req.params.id;
    const phone = phones.find(c => c.id === id);
    req.json(phone);
});



server.listen(2000, () => console.log("Listening on http://localhost:2000"));
