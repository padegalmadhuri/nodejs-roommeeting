const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var app = express();
app.use(bodyParser.json());

var port=process.env.PORT||3000;
app.get('/', (req, res)=>{
    res.send("<h1>Meeting Room</h1>")
});
var rooms = [];
var bookings = [];

//adding the Room
app.post('/addRoom', function (req, res) {
    rooms.push(req.body);
    res.send("Added Room");
});

//Displaying the Rooms
app.get('/displayRooms', function (req, res) {
    res.send(JSON.stringify(rooms));
});

//Booking the Rooms
app.post('/bookRoom', function (req, res) {
    let book = req.body;
    let flag = true;
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].time === book.time || bookings[i].roomID === book.roomID) {
            flag = false;
            break;
        }
    }
    if (flag) {
        bookings.push(book);
        res.send("Booking done");
    }
    else {
        res.end("Currently it is not available change the slot ");
    }
});

//Displaying the Bookings Data
app.get("/bookingsData", (req, res) => {
    res.send(JSON.stringify(bookings));
});

app.listen(port,()=>{
  console.log(`App is listening at PORT ${port}`)
});
