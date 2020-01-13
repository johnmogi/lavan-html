const express = require("express");

// בניית אובייקט המשמש כאובייקט השירות
const server = express();


const phones = [
    {
        id: 1,
        code: "sg500",
        manufacturer: "Nokia1",
        model: "5dd",
        price: "250$"
    },
    {
        id: 2,
        code: "fgg33",
        manufacturer: "Samsung",
        model: "S10",
        price: "1000$"
    },
    {
        id: 3,
        code: "crap",
        manufacturer: "Apple",
        model: "Iphone100",
        price: "10000000$"
    },
    {
        id: 4,
        code: "shit",
        manufacturer: "Apple",
        model: "IphoneS",
        price: "50$"
    }
];

server.get("/phones", (request, response) => {
    response.json(phones);
});

// server.get("/phones/:id", (request, response) => {
//     const id = +request.params.id;
//     const phone = phones.find(p => p.id === id);
//     response.json(phone);
// });

server.get("/phones/:manufacturer", (request, response) => {
    const manufacturer = request.params.manufacturer;
    const phone = phones.find(p => p.manufacturer === manufacturer);
    // phones.forEach(item => { phones[item.key] = item.value; });
    // console.log(phones.manufacturer)
    response.json(phone);
});

server.listen(2005, () => console.log("Listening on http://localhost:2005"));
